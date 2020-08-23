module Page.Home exposing (view)

import Component.Card as Card
import Html exposing (Html, div, h2, main_, text)
import Html.Attributes exposing (class)


view : () -> Html msg
view _ =
    main_ [ class "container" ]
        [ h2 [] [ text "Tech musings" ]
        , div [ class "row" ]
            [ div [ class "col s12 m6 l6" ]
                [ Card.view
                    { title = "3 Best Practices in programming"
                    , text = "... and how there are no best practices"
                    , actions =
                        [ Card.readAction "/blog/no-best-practices"
                        ]
                    }
                ]
            , div [ class "col s12 m6 l6" ]
                [ Card.view
                    { title = "Programming as a Second Language"
                    , text = "... and why I'm glad I've learnt / taught a second language"
                    , actions =
                        [ Card.readAction "/blog/programming-as-a-second-language"
                        ]
                    }
                ]
            ]
        , div [ class "row" ]
            [ div [ class "col s12 m6 l6" ]
                [ Card.view
                    { title = "Are you providing value?"
                    , text = "... and how the road to hell is paved with good intentions"
                    , actions =
                        [ Card.readAction "/blog/are-you-providing-value"
                        ]
                    }
                ]
            , div [ class "col s12 m6 l6" ]
                [ Card.view
                    { title = "The Either / Result pattern"
                    , text = "... for network calls"
                    , actions =
                        [ Card.readAction "/blog/either-pattern-for-network-calls"
                        ]
                    }
                ]
            ]
        ]
