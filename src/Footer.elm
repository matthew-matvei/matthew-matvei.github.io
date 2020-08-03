module Footer exposing (view)

import Date exposing (Date, year)
import Html exposing (Html, div, footer, li, text, ul)
import Html.Attributes exposing (class, href)
import String exposing (fromInt)
import Widget exposing (externalLink)


view : Maybe Date -> Html msg
view today =
    footer [ class "page-footer blue darken-4" ]
        [ div [ class "container row" ]
            [ div [ class "col s6" ]
                [ footerLink "https://github.com/matthew-matvei" "My GitHub"
                ]
            , div [ class "col s6 right-align" ]
                [ text "Powered by:"
                , ul []
                    [ li []
                        [ footerLink "https://pages.github.com/" "GitHub Pages"
                        ]
                    , li []
                        [ footerLink "https://materializecss.com/" "Materialize CSS"
                        ]
                    , li []
                        [ footerLink "https://prismjs.com/" "PrismJS"
                        ]
                    ]
                ]
            ]
        , div [ class "footer-copyright" ]
            [ div [ class "container" ]
                [ "© " ++ showYear today ++ "matthew-matvei " |> text ]
            ]
        ]


footerLink : String -> String -> Html msg
footerLink link content =
    externalLink [ class "blue-text text-lighten-3", href link ] [ text content ]


showYear : Maybe Date -> String
showYear date =
    Maybe.map year date |> Maybe.map fromInt |> Maybe.map (\y -> y ++ " ") |> Maybe.withDefault ""
