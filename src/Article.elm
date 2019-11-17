module Article exposing (Slug(..), getContent, parser)

import Url.Parser as Parser exposing (Parser)


type Slug
    = ThreeBestPractices


parser : Parser (Slug -> a) a
parser =
    Parser.oneOf
        [ Parser.map ThreeBestPractices (Parser.s "no-best-practices")
        ]


getContent : Slug -> String
getContent slug =
    case slug of
        ThreeBestPractices ->
            "Three best practices"
