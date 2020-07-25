module Widget exposing (externalLink)

import Html exposing (Attribute, Html, a)
import Html.Attributes exposing (rel, target)


externalLink : List (Attribute msg) -> List (Html msg) -> Html msg
externalLink attributes content =
    a (List.append attributes [ target "_blank", rel "noopener" ]) content
