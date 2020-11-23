module Component.Table exposing (Model, view)

import Html exposing (Html, table, tbody, td, text, th, thead, tr)
import List


type alias Model =
    { header : List String
    , rows : List (List String)
    }


view : Model -> Html msg
view model =
    table []
        [ thead []
            [ tr [] (List.map (\h -> th [] [ text h ]) model.header)
            ]
        , tbody [] (List.map viewRow model.rows)
        ]


viewRow : List String -> Html msg
viewRow row =
    tr [] (List.map (\cell -> td [] [ text cell ]) row)
