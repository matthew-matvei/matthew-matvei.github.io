module Main exposing (main)

import Browser
import Browser.Navigation as Navigation
import Footer
import Header
import Html exposing (text)
import Page
import Route
import Url


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
    }


type Message
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url


init : () -> Url.Url -> Navigation.Key -> ( Model, Cmd Message )
init _ url key =
    ( Model key (Route.fromUrl url), Cmd.none )


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    let
        _ =
            Debug.log "HEYA" "Spying on the Main.update function"
    in
    case message of
        UrlChanged url ->
            ( { model | route = url |> Route.fromUrl }
            , Cmd.none
            )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Navigation.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Navigation.load href )


subscriptions : Model -> Sub Message
subscriptions _ =
    Sub.none


view : Model -> Browser.Document Message
view model =
    { title = "Bloody rewrites!"
    , body =
        [ text "Testing"
        , Header.view ()
        , model.route |> Page.fromRoute |> Page.Model |> Page.view
        , Footer.view ()
        ]
    }
