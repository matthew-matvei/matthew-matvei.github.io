module Component.Card exposing (readArticleAction, view)

import Html exposing (Html, a, div, img, p, span, text)
import Html.Attributes exposing (class, href, src, style)
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
    , backgroundImage : Maybe String
    }


view : Model -> Html msg
view model =
    div
        [ class "card small purple hoverable"
        ]
        (List.append (viewCardContent model) [ viewActions model.actions ])


viewCardContent : Model -> List (Html msg)
viewCardContent model =
    case model.backgroundImage of
        Just imageUrl ->
            [ div [ class "card-image" ] [ img [ src imageUrl ] [] ]
            , div
                [ class "card-content white-text" ]
                [ span [ class "card-title" ] [ text model.title ]
                , p [] [ text model.text ]
                ]
            ]

        Nothing ->
            [ div [ class "card-content white-text" ]
                [ div [ class "card-title" ] [ text model.title ]
                , p [] [ text model.text ]
                ]
            ]


viewActions : List Action -> Html msg
viewActions actions =
    div [ class "card-action purple darken-3" ] (List.map viewAction actions)


viewAction : Action -> Html msg
viewAction action =
    if action.linkIsExternal then
        externalLink [ href action.link ] [ text action.text ]

    else
        a [ href action.link ] [ text action.text ]


readArticleAction : String -> Action
readArticleAction link =
    { link = link, linkIsExternal = False, text = "Read" }


backgroundImage : Maybe String -> List (Html msg)
backgroundImage maybeUrl =
    case maybeUrl of
        Just url ->
            [ img [ src url, style "position" "absolute", style "left" "0", style "top" "0", style "opacity" "0.5", style "width" "100%" ] [] ]

        Nothing ->
            []
