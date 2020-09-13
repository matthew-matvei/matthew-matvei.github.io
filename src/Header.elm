module Header exposing (view)

import Html exposing (Attribute, Html, a, div, header, img, nav, small, span, text)
import Html.Attributes exposing (class, href, src)


view : () -> Html msg
view _ =
    header []
        [ div [ class "navbar-fixed" ]
            [ nav [ class "blue darken-2" ]
                [ div [ class "nav-wrapper" ]
                    [ div [ class "container" ]
                        [ viewLogoFor LargeScreen
                        , viewLogoFor SmallScreen
                        ]
                    ]
                ]
            ]
        ]


type ViewSize
    = SmallScreen
    | LargeScreen


viewLogoFor : ViewSize -> Html msg
viewLogoFor size =
    a [ href "/", class "brand-logo" ]
        [ div
            [ class "d-flex align-items-centre", sizeAsClass size ]
            [ div
                [ class "pr-1" ]
                [ text (logoText size) ]
            , img
                [ class "pl-1 profile-icon round", src "/assets/img/matthew-matvei-250x250.jpg" ]
                []
            ]
        ]


sizeAsClass : ViewSize -> Attribute msg
sizeAsClass size =
    case size of
        SmallScreen ->
            class "hide-on-med-and-up"

        LargeScreen ->
            class "hide-on-small-only"


logoText : ViewSize -> String
logoText size =
    case size of
        SmallScreen ->
            "mat‑mat"

        LargeScreen ->
            "matthew‑matvei"
