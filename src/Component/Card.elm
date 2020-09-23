module Component.Card exposing (readArticleAction, view)

import Html exposing (Html, a, div, p, span, text)
import Html.Attributes exposing (class, href)
import Widget exposing (externalLink)


type alias Action =
    { link : String
    , linkIsExternal : Bool
    , text : String
    }


type alias Model =
    { title : String
    , text : String
    , actions : List Action
    }


view : Model -> Html msg
view model =
    div [ class "card purple hoverable" ]
        [ div [ class "card-content white-text" ]
            [ span [ class "card-title" ]
                [ text model.title
                ]
            , p [] [ text model.text ]
            ]
        , div [ class "card-action purple darken-3" ]
            (List.map
                viewAction
                model.actions
            )
        ]


viewAction : Action -> Html msg
viewAction action =
    if action.linkIsExternal
    then externalLink [ href action.link ] [ text action.text ]
    else a [ href action.link ] [ text action.text ]


readArticleAction : String -> Action
readArticleAction link =
    { link = link, linkIsExternal = False, text = "Read" }
