module Component.Card exposing (view)

import Html exposing (Html, a, div, p, span, text)
import Html.Attributes exposing (class, href)


type alias Action =
    { link : String, text : String }


type alias Model =
    { title : String, text : String, actions : List Action }


view : Model -> Html msg
view model =
    div [ class "card purple hoverable" ]
        [ div [ class "card-content white-text" ]
            [ span [ class "card-title" ]
                [ text model.title
                ]
            , p [] [ text model.text ]
            ]
        , div [ class "card-action purple darken-2" ]
            (List.map
                viewAction
                model.actions
            )
        ]


viewAction : Action -> Html msg
viewAction action =
    a [ href action.link ] [ text action.text ]
