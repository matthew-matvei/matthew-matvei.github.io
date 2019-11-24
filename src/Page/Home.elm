module Page.Home exposing (view)

import Html exposing (Html, a, div, h2, li, main_, p, span, text, ul)
import Html.Attributes exposing (class, href)


view : () -> Html msg
view _ =
    main_ [ class "container" ]
        [ h2 [] [ text "Latest musings" ]
        , ul []
            [ li []
                [ div [ class "card blue hoverable" ]
                    [ div [ class "card-content white-text" ]
                        [ span [ class "card-title" ] [ text "3 Best Practices in programming" ]
                        , p [] [ text "... and how there are no best practices" ]
                        ]
                    , div [ class "card-action" ]
                        [ a [ href "/blog/no-best-practices" ] [ text "Read" ]
                        ]
                    ]
                ]
            ]
        ]
