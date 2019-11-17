module Page exposing (Model, view)

import Html exposing (Html)
import Page.Home
import Page.NotFound
import Route exposing (Route(..))


type alias Model =
    { route : Route.Route }


view : Model -> Html msg
view model =
    case model.route of
        NotFound ->
            Page.NotFound.view ()

        Home ->
            Page.Home.view ()
