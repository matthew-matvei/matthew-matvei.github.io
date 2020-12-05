module Component.Table exposing (Model, view)

import Component.Table.Caption exposing (Caption, CaptionSegment(..), viewCaption)
import Html exposing (Html, caption, code, table, tbody, td, text, th, thead, tr)
import Html.Attributes exposing (class)
import List


type alias Model =
    { header : List String
    , rows : List (List String)
    , caption : Maybe Caption
    }


view : Model -> Html msg
view model =
    table []
        ((Maybe.withDefault [] model.caption |> viewCaption)
            :: [ thead []
                    [ tr [] (List.map (\h -> th [] [ text h ]) model.header)
                    ]
               , tbody [] (List.map viewRow model.rows)
               ]
        )


viewRow : List String -> Html msg
viewRow row =
    tr [] (List.map (\cell -> td [] [ text cell ]) row)
