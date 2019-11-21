module Page.Home exposing (view)

import Component.Card as Card
import Html exposing (Html, a, div, h2, li, main_, p, span, text, ul)
import Html.Attributes exposing (class, href)


view : () -> Html msg
view _ =
    main_ [ class "container" ]
        [ h2 [] [ text "Latest musings" ]
        , div [ class "row" ]
            [ div [ class "col s12 m6 l6" ]
                [ Card.view
                    { title = "3 Best Practices in programming"
                    , text = "... and how there are no best practices"
                    , actions =
                        [ { link = "/blog/no-best-practices"
                          , text = "Read"
                          }
                        ]
                    }
                ]
            , div [ class "col s12 m6 l6" ]
                [ Card.view
                    { title = "How to kill yourself"
                    , text = "... with micro services: Distributed Death"
                    , actions =
                        [ { link = "/blog/how-to-kill-yourself"
                          , text = "Read"
                          }
                        ]
                    }
                ]
            ]
        ]
