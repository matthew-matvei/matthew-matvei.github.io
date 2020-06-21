module Page.Home exposing (view)

import Component.Card as Card
import Html exposing (Html, div, h2, main_, text)
import Html.Attributes exposing (class)


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
                    { title = "Programming as a Second Language"
                    , text = "... and why I'm glad I've learnt / taught a second language"
                    , actions =
                        [ { link = "/blog/programming-as-a-second-language"
                          , text = "Read"
                          }
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
                        [ { link = "/blog/are-you-providing-value"
                          , text = "Read"
                          }
                        ]
                    }
                ]
            ]
        ]
