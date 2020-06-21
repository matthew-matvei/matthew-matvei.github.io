module Blog.AreYouProvidingValue exposing (getContent)

import Blog.Content exposing (Content(..))
import Blog.ProgrammingAsASecondLanguage exposing (getContent)

getContent : () -> List Content
getContent _ =
    [ Title "Are you providing value?"
    , SubTitle "... and how the road to hell is paved with good intentions"
    , WhenCreated "June 21 2020" ]