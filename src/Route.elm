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
        [ Parser.map Home Parser.top
        , Parser.map Home (Parser.s "index.html")
        , Parser.map Article (Parser.s "blog" </> Article.parser)
        ]
