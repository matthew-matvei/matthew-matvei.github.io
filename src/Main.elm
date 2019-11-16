module Main exposing (..)

import Browser
import Browser.Navigation as Navigation
import Footer
import Header
import Html exposing (..)
import Page
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
    , url : Url.Url
    }


type Message
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url


init : () -> Url.Url -> Navigation.Key -> ( Model, Cmd Message )
init flags url key =
    ( Model key url, Cmd.none )


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Navigation.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Navigation.load href )


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.none


view : Model -> Browser.Document Message
view model =
    { title = "Bloody rewrites!"
    , body =
        [ text "Testing"
        , Header.view ()
        , Page.view ()
        , Footer.view ()
        ]
    }
