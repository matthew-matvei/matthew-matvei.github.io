module Blog.Content exposing
    ( CodeBlockInfo
    , CollectionItem
    , Content(..)
    , ImageInfo
    , ParagraphSegment(..)
    , SectionInfo
    , SectionTitle
    )


type alias SectionTitle =
    { title : String
    , subTitle : String
    }


type alias SectionInfo =
    { title : Maybe SectionTitle
    , content : List Content
    }


type alias ImageInfo =
    { source : String
    , alt : String
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
    | Link String String


type Content
    = Title String
    | SubTitle String
    | WhenCreated String
    | Paragraph (List ParagraphSegment)
    | Section SectionInfo
    | BlockQuote String
    | Image ImageInfo
    | Divider
    | CodeBlock CodeBlockInfo
    | Collection (List CollectionItem)
