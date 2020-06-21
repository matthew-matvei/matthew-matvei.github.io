module Blog.AreYouProvidingValue exposing (getContent)

import Blog.Content exposing (Content(..), ParagraphSegment(..))
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
            [ Paragraph
                [ Text """The Either monad is a lovely way to handle success / fail code paths in a 
                concise, logical and (dependening on your language) compile-time knowledge that you 
                are handling possible errors that a method you call can result in. You can follow
                this pattern in many different ways """
                , Link
                    "https://blog.logrocket.com/elegant-error-handling-with-the-javascript-either-monad-76c7ae4924a1/"
                    "in JavaScript"
                , Text " and "
                , Link
                    "https://medium.com/@dimpapadim3/either-is-a-common-type-in-functional-languages-94b86eea325c"
                    "in C#"
                , Text "."
                ]
            , Paragraph
                [ Text """By comparison, catching exceptions is a lawless, risky business. Consider the
            following method signatures:""" ]
            , CodeBlock
                { language = "cs"
                , code = """
// I'll return you an int (but I might blow up if I don't like 'number')
int ParseNumber(string number);

// I'll 'Either' return you success or fail, and you need to handle those possibilities
Either<int> ParseNumber(string number);
            """
                }
            , Paragraph
                [ Text """As you can see, the issue with exceptions can be that they hide the fact
                that they have possible """
                , Emphasis "alternative return values"
                , Text ". It's possible that the method will result in an "
                , InlineCode "int"
                , Text """, but it's also possible that it may result in one of many exceptions
                raised due to the nature of the """
                , InlineCode "number"
                , Text " parameter. Often, it's left up to a caller simply to "
                , Emphasis "know"
                , Text """ that this may happen, or look at documentation for the method, which can
                be lacking, stale or misleading. It may not even be clear to the developer who
                documented the method in the first place, since the exceptions that it potentially
                throws may just be thrown by its dependencies."""
                ]
            , BlockQuote "Right then, I hear ya, let's replace it all with methods that return 'Either's"
            , Paragraph
                [ Text """Whoa there Nelly. Do the other developers on your team know what the hell
                an 'Either' object is? Or how to nicely bind Either instances with successive
                functions to chain multiple actions into one ultimate result?""" ]
            , Paragraph
                [ Text "Unfortunately, if they don't "
                , Emphasis "get it"
                , Text """, they won't use it properly, and all the benefits of it will be in vain.
                You can try to make the argument that they should just suck it up and learn it, and
                learning new things is lovely and all, but we all work to real constraints. Perhaps
                they have enough on their plate keeping up with new practices of system monitoring
                and persisting data. If they are used to catching exceptions, and let's face it, """
                , Emphasis "they probably are"
                , Text """, then they're more likely to do this correctly. It fits more naturally in
                with the talents of the team and therefore lets them actually contribute more value
                to the business."""
                ]
            , Paragraph
                [ Text """This isn't to piss on the potential value of other patterns. If the team
                is up for the learning, and there's something to gain for everyone (not just for you,
                the person who suggested everyone adopt a new pattern), then that's positive. But
                consider whether this other feature, no matter how fantastic it may seem in isolation,
                is """
                , Strong "actually"
                , Text """ the right tool for the job. Or rather, it's a screw that other developers
                have the right screwdrivers for..."""
                ]
            ]
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
