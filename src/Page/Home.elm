module Page.Home exposing (view)

import Component.Card as Card
import Html exposing (Html, div, h2, main_, text)
import Html.Attributes exposing (class)


view : () -> Html msg
view _ =
    main_ [ class "container" ]
        (viewApps () ++ viewBlogArticles ())


viewApps : () -> List (Html msg)
viewApps _ =
    [ h2 [] [ text "Apps" ]
    , div [ class "row" ]
        [ div [ class "col s12 m6 l6" ]
            [ Card.view
                { title = "Terminal Tetris"
                , text = "... a simple game of Tetris in the terminal"
                , actions =
                    [ { link = "https://github.com/matthew-matvei/TerminalTetris"
                      , linkIsExternal = True
                      , text = "Play"
                      }
                    ]
                , backgroundImage = Just "/assets/img/tetris-230x230.png"
                }
            ]
        ]
    ]


viewBlogArticles : () -> List (Html msg)
viewBlogArticles _ =
    [ h2 [] [ text "Tech musings" ]
    , div [ class "row" ]
        [ div [ class "col s12 m6 l6" ]
            [ Card.view
                { title = "3 Best Practices in programming"
                , text = "... and how there are no best practices"
                , actions =
                    [ Card.readArticleAction "/blog/no-best-practices"
                    ]
                , backgroundImage = Nothing
                }
            ]
        , div [ class "col s12 m6 l6" ]
            [ Card.view
                { title = "Programming as a Second Language"
                , text = "... and why I'm glad I've learnt / taught a second language"
                , actions =
                    [ Card.readArticleAction "/blog/programming-as-a-second-language"
                    ]
                , backgroundImage = Nothing
                }
            ]
        ]
    , div [ class "row" ]
        [ div [ class "col s12 m6 l6" ]
            [ Card.view
                { title = "Are you providing value?"
                , text = "... and how the road to hell is paved with good intentions"
                , actions =
                    [ Card.readArticleAction "/blog/are-you-providing-value"
                    ]
                , backgroundImage = Nothing
                }
            ]
        , div [ class "col s12 m6 l6" ]
            [ Card.view
                { title = "The Either / Result pattern"
                , text = "... for network calls"
                , actions =
                    [ Card.readArticleAction "/blog/either-pattern-for-network-calls"
                    ]
                , backgroundImage = Nothing
                }
            ]
        ]
    ]
