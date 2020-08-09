module Blog.Content exposing
    ( AttributionInfo(..)
    , CodeBlockInfo
    , CollectionItem
    , Content(..)
    , ImageInfo
    , ParagraphSegment(..)
    , SectionInfo
    , SectionTitle
    )

import Date exposing (Date)


type alias SectionTitle =
    { title : String
    , subTitle : String
    }


type alias SectionInfo =
    { title : Maybe SectionTitle
    , content : List Content
    }


type AttributionInfo
    = TextAttribute String
    | ComplexAttribute
        { text : String
        , link : String
        }


type alias ImageInfo =
    { source : String
    , alt : String
    , attribution : AttributionInfo
    }


type alias CodeBlockInfo =
    { code : String
    , language : String
    }


type alias CollectionItem =
    { title : String
    , text : String
    }


type ParagraphSegment
    = Text String
    | Emphasis String
    | Strong String
    | InlineCode String
    | ExternalLink String String


type Content
    = Title String
    | SubTitle String
    | WhenCreated Date
    | Paragraph (List ParagraphSegment)
    | Section SectionInfo
    | BlockQuote String
    | Image ImageInfo
    | Divider
    | CodeBlock CodeBlockInfo
    | Collection (List CollectionItem)
