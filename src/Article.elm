module Article exposing (Slug(..), getContent, parser)

import Blog.Content exposing (Content)
import Blog.ProgrammingAsASecondLanguage
import Blog.ThreeBestPractices
import Url.Parser as Parser exposing (Parser)


type Slug
    = ThreeBestPractices
    | ProgrammingAsASecondLanguage


parser : Parser (Slug -> a) a
parser =
    Parser.oneOf
        [ Parser.s "no-best-practices" |> Parser.map ThreeBestPractices
        , Parser.s "programming-as-a-second-language" |> Parser.map ProgrammingAsASecondLanguage
        ]


getContent : Slug -> List Content
getContent slug =
    case slug of
        ThreeBestPractices ->
            Blog.ThreeBestPractices.getContent ()

        ProgrammingAsASecondLanguage ->
            Blog.ProgrammingAsASecondLanguage.getContent ()
