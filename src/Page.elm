module Page exposing (Model, Page(..), fromRoute, view)

import Article exposing (Slug)
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


fromRoute : Maybe Route -> Page
fromRoute maybeRoute =
    case maybeRoute of
        Nothing ->
            NotFound

        Just Route.Home ->
            Home

        Just (Route.Article slug) ->
            Article slug
