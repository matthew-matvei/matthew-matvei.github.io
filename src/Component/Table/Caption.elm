module Component.Table.Caption exposing (Caption, CaptionSegment(..), viewCaption)

import Html exposing (Html, caption, code, em, text)
import Html.Attributes exposing (class)


type CaptionSegment
    = Text String
    | InlineCode String
    | Emphasis String


type alias Caption =
    List CaptionSegment


viewCaption : Caption -> Html msg
viewCaption c =
    caption [] (List.map viewCaptionSegment c)


viewCaptionSegment : CaptionSegment -> Html msg
viewCaptionSegment segment =
    case segment of
        Text t ->
            text t

        InlineCode t ->
            code [ class "language-markup" ] [ text t ]

        Emphasis t ->
            em [] [ text t ]
