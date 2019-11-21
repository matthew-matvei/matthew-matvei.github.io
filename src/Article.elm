module Article exposing (Slug(..), getContent, parser)

import Blog.Content exposing (Content)
import Blog.ThreeBestPractices
import Url.Parser as Parser exposing (Parser)


type Slug
    = ThreeBestPractices


parser : Parser (Slug -> a) a
parser =
    Parser.oneOf
        [ Parser.map ThreeBestPractices (Parser.s "no-best-practices")
        ]


getContent : Slug -> List Content
getContent slug =
    case slug of
        ThreeBestPractices ->
            Blog.ThreeBestPractices.getContent ()
