module Article exposing (Slug(..), getContent, parser)

import Blog.AreYouProvidingValue
import Blog.Content exposing (Content)
import Blog.EitherPatternNetworkCalls
import Blog.LinqPerformanceLessons
import Blog.ProgrammingAsASecondLanguage
import Blog.ThreeBestPractices
import Url.Parser as Parser exposing (Parser)


type Slug
    = ThreeBestPractices
    | ProgrammingAsASecondLanguage
    | AreYouProvidingValue
    | EitherPatternNetworkCalls
    | LinqPerformanceLessons


parser : Parser (Slug -> a) a
parser =
    Parser.oneOf
        [ "no-best-practices" |> Parser.s |> Parser.map ThreeBestPractices
        , "programming-as-a-second-language" |> Parser.s |> Parser.map ProgrammingAsASecondLanguage
        , "are-you-providing-value" |> Parser.s |> Parser.map AreYouProvidingValue
        , "either-pattern-for-network-calls" |> Parser.s |> Parser.map EitherPatternNetworkCalls
        , "linq-performance-lessons" |> Parser.s |> Parser.map LinqPerformanceLessons
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

        EitherPatternNetworkCalls ->
            Blog.EitherPatternNetworkCalls.getContent ()

        LinqPerformanceLessons ->
            Blog.LinqPerformanceLessons.getContent ()
