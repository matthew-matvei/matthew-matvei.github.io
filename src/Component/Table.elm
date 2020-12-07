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
    table [ class "striped" ]
        ((Maybe.withDefault [] model.caption |> viewCaption)
            :: [ thead []
                    [ tr [] (List.map viewHeaderCell model.header) ]
               , tbody [] (List.map viewRow model.rows)
               ]
        )


viewHeaderCell : String -> Html msg
viewHeaderCell h =
    th [] [ text h ]


viewRow : List String -> Html msg
viewRow row =
    tr [] (List.map (\cell -> td [] [ text cell ]) row)
