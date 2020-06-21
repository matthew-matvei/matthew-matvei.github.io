module Blog.AreYouProvidingValue exposing (getContent)

import Blog.Content exposing (Content(..))
import Blog.ProgrammingAsASecondLanguage exposing (getContent)


getContent : () -> List Content
getContent _ =
    [ Title "Are you providing value?"
    , SubTitle "... and how the road to hell is paved with good intentions"
    , WhenCreated "June 21 2020"
    , Section
        { title =
            Just
                { title = "Good ideas"
                , subTitle = "...that don't work"
                }
        , content =
            []
        }
    , Section
        { title =
            Just
                { title = "Principles over practice"
                , subTitle = ""
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Helper libraries"
                , subTitle = ""
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Tests"
                , subTitle = "More = better?"
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "YAGNI"
                , subTitle = "You ain't gonna need it (probably)"
                }
        , content = []
        }
    ]
