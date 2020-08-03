module Route exposing (Route(..), fromUrl)

import Article exposing (Slug)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser)


type Route
    = Home
    | Article Slug


fromUrl : Url -> Maybe Route
fromUrl url =
    Parser.parse parser url


parser : Parser (Route -> a) a
parser =
    Parser.oneOf
        [ Parser.top |> Parser.map Home
        , Parser.s "index.html" |> Parser.map Home
        , Parser.s "blog" </> Article.parser |> Parser.map Article
        ]
