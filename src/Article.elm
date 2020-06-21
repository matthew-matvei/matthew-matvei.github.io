module Article exposing (Slug(..), getContent, parser)

import Blog.AreYouProvidingValue
import Blog.Content exposing (Content)
import Blog.ProgrammingAsASecondLanguage
import Blog.ThreeBestPractices
import Url.Parser as Parser exposing (Parser)


type Slug
    = ThreeBestPractices
    | ProgrammingAsASecondLanguage
    | AreYouProvidingValue


parser : Parser (Slug -> a) a
parser =
    Parser.oneOf
        [ Parser.map ThreeBestPractices (Parser.s "no-best-practices")
        , Parser.map ProgrammingAsASecondLanguage (Parser.s "programming-as-a-second-language")
        , Parser.map AreYouProvidingValue (Parser.s "are-you-providing-value")
        ]


getContent : Slug -> List Content
getContent slug =
    case slug of
        ThreeBestPractices ->
            Blog.ThreeBestPractices.getContent ()

        ProgrammingAsASecondLanguage ->
            Blog.ProgrammingAsASecondLanguage.getContent ()

        AreYouProvidingValue ->
            Blog.AreYouProvidingValue.getContent ()
