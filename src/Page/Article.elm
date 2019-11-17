module Page.Article exposing (Model, view)

import Html exposing (Html, text)


type alias Model =
    { content : String }


view : Model -> Html msg
view model =
    text model.content
