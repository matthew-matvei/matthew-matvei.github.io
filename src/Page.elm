module Page exposing (Model, Page(..), fromRoute, title, view)

import Article exposing (Slug(..))
import Html exposing (Html)
import Page.Article
import Page.Home
import Page.NotFound
import Route exposing (Route(..))


type alias Model =
    { page : Page }


type Page
    = NotFound
    | Home
    | Article Slug


view : Model -> Html msg
view model =
    case model.page of
        NotFound ->
            Page.NotFound.view ()

        Home ->
            Page.Home.view ()

        Article slug ->
            slug |> Article.getContent |> Page.Article.view


title : Model -> String
title model =
    case model.page of
        NotFound ->
            "404 | Page Not Found"

        Home ->
            "mat-mat | Home"

        Article slug ->
            case slug of
                ThreeBestPractices ->
                    "mat-mat | Three best practices"

                ProgrammingAsASecondLanguage ->
                    "mat-mat | Programming as a Second Language"

                AreYouProvidingValue ->
                    "mat-mat | Are you providing value?"


fromRoute : Maybe Route -> Page
fromRoute maybeRoute =
    case maybeRoute of
        Nothing ->
            NotFound

        Just Route.Home ->
            Home

        Just (Route.Article slug) ->
            Article slug
