module Header exposing (view)

import Html exposing (Html, a, div, header, nav, span, text)
import Html.Attributes exposing (class, href)


view : () -> Html msg
view _ =
    header []
        [ div [ class "navbar-fixed" ]
            [ nav [ class "blue darken-2" ]
                [ div [ class "nav-wrapper" ]
                    [ div [ class "container" ]
                        [ a [ href "#", class "brand-logo" ]
                            [ span [ class "hide-on-small-only" ] [ text "matthew-matvei" ]
                            , span [ class "hide-on-med-and-up" ] [ text "mat-mat" ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
