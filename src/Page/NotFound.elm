module Page.NotFound exposing (view)

import Html exposing (Html, div, h2, h3, main_, text)
import Html.Attributes exposing (class)


view : () -> Html msg
view _ =
    main_ [ class "container d-flex flex-col align-items-centre justify-content-centre" ]
        [ h2 [ class "grey-text text-darken-1" ] [ text "Couldn't find it ☹" ]
        , h3 [ class "grey-text text-darken-1" ] [ text "404" ]
        ]
