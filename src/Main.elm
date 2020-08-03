port module Main exposing (main)

import Browser
import Browser.Navigation as Navigation
import Date exposing (Date)
import Footer
import Header
import Page
import Route
import Task
import Url


main : Program () Model Message
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


type alias Model =
    { key : Navigation.Key
    , route : Maybe Route.Route
    , today : Maybe Date
    }


type Message
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | DateRetrieved Date


init : () -> Url.Url -> Navigation.Key -> ( Model, Cmd Message )
init _ url key =
    ( Model key (Route.fromUrl url) Nothing
    , Cmd.batch [ Task.perform DateRetrieved Date.today, updatePrism () ]
    )


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        UrlChanged url ->
            ( { model | route = Route.fromUrl url }, updatePrism () )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, url |> Url.toString |> Navigation.pushUrl model.key )

                Browser.External href ->
                    ( model, Navigation.load href )

        DateRetrieved date ->
            ( { model | today = Just date }, Cmd.none )


subscriptions : Model -> Sub Message
subscriptions _ =
    Sub.none


view : Model -> Browser.Document Message
view model =
    let
        page =
            model.route |> Page.fromRoute |> Page.Model
    in
    { title = Page.title page
    , body =
        [ Header.view ()
        , Page.view page
        , Footer.view model.today
        ]
    }


port updatePrism : () -> Cmd msg
