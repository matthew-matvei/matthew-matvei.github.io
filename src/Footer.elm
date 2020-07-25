module Footer exposing (view)

import Html exposing (Html, div, footer, li, text, ul)
import Html.Attributes exposing (class, href)
import Widget exposing (externalLink)


view : () -> Html msg
view _ =
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
                [ text "© 2019 matthew-matvei"
                ]
            ]
        ]


footerLink : String -> String -> Html msg
footerLink link content =
    externalLink [ class "blue-text text-lighten-3", href link ] [ text content ]
