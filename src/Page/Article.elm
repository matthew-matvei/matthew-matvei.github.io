module Page.Article exposing (Model, view)

import Blog.Content
    exposing
        ( AttributionInfo(..)
        , CodeBlockInfo
        , CollectionItem
        , Content(..)
        , ImageInfo
        , ParagraphSegment(..)
        , SectionInfo
        , SectionTitle
        )
import Date exposing (Date, format)
import Html exposing (..)
import Html.Attributes exposing (alt, class, href, src)
import Widget exposing (externalLink)


type alias Model =
    List Content


view : Model -> Html msg
view model =
    main_ [ class "container" ]
        (List.map
            viewContent
            model
        )


viewContent : Content -> Html msg
viewContent content =
    case content of
        Title title ->
            h1 [] [ text title ]

        SubTitle subTitle ->
            h2 [] [ text subTitle ]

        WhenCreated when ->
            span [ class "grey-text text-darken-3" ] [ viewDate when |> text ]

        Paragraph paragraph ->
            p [ class "flow-text" ] (List.map viewParagraphSegment paragraph)

        BlockQuote quote ->
            blockquote [ class "flow-text" ] [ text quote ]

        Divider ->
            div [ class "divider" ] []

        Image imageInfo ->
            viewImage imageInfo

        Section sectionInfo ->
            viewSection sectionInfo

        Collection collection ->
            ul [ class "collection" ] (List.map viewCollectionItem collection)

        CodeBlock codeBlock ->
            viewCodeBlock codeBlock

        OrderedList orderedList ->
            viewOrderedList orderedList


viewParagraphSegment : ParagraphSegment -> Html msg
viewParagraphSegment segment =
    case segment of
        Text t ->
            text t

        InlineCode t ->
            code [ class "language-markup" ] [ text t ]

        Emphasis t ->
            em [] [ text t ]

        Strong t ->
            strong [] [ text t ]

        ExternalLink link label ->
            externalLink [ href link ] [ text label ]


viewSection : SectionInfo -> Html msg
viewSection sectionInfo =
    section [ class "section" ]
        (viewSectionTitle sectionInfo.title
            ++ List.map viewContent sectionInfo.content
        )


viewSectionTitle : Maybe SectionTitle -> List (Html msg)
viewSectionTitle maybeSectionTitle =
    case maybeSectionTitle of
        Nothing ->
            [ text "" ]

        Just sectionTitle ->
            [ h3 [] [ text sectionTitle.title ]
            , h4 [] [ text sectionTitle.subTitle ]
            ]


viewAttribution : AttributionInfo -> Html msg
viewAttribution attributionInfo =
    case attributionInfo of
        TextAttribute attribution ->
            span [ class "center-align" ] [ text attribution ]

        ComplexAttribute attribution ->
            externalLink [ class "center-align", href attribution.link ] [ text attribution.text ]


viewImage : ImageInfo -> Html msg
viewImage imageInfo =
    div [ class "d-flex align-items-centre flex-col" ]
        [ div []
            [ img [ class "responsive-img", src imageInfo.source, alt imageInfo.alt ] []
            ]
        , viewAttribution imageInfo.attribution
        ]


viewCollectionItem : CollectionItem -> Html msg
viewCollectionItem collectionItem =
    li [ class "collection-item" ]
        [ h5 [] [ text collectionItem.title ]
        , p [] [ text collectionItem.text ]
        ]


viewCodeBlock : CodeBlockInfo -> Html msg
viewCodeBlock codeBlock =
    pre [ class ("language-" ++ codeBlock.language) ]
        [ code [] [ text codeBlock.code ] ]


viewDate : Date -> String
viewDate date =
    format "MMMM d y" date


viewOrderedList : List (List ParagraphSegment) -> Html msg
viewOrderedList orderedList =
    ol [] <| List.map viewListItem orderedList


viewListItem : List ParagraphSegment -> Html msg
viewListItem paragraphSegments =
    li [ class "flow-text" ] <| List.map viewParagraphSegment paragraphSegments
