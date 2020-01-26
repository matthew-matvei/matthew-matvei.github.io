module Blog.ProgrammingAsASecondLanguage exposing (getContent)

import Blog.Content exposing (Content(..), ParagraphSegment(..))


getContent : () -> List Content
getContent _ =
    [ Title "Programming as a Second Language"
    , SubTitle "... and why I'm glad I've learnt / taught a second language"
    , WhenCreated "January 26 2020"
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """I have come to the world of programming relatively late, at least compared
                to some other people I work with. For anyone who has ever suffered with """
                , Link "https://www.youtube.com/watch?v=eqhUHyVpAwE" "Imposter Syndrome"
                , Text """, you can understand how that might be quite daunting. It can feel like 
            you've been wasting all this time and potential on travel, tangential job paths and other 
            pursuits."""
                ]
            , Paragraph
                [ Text """Prior to my current career, I worked mainly in the teaching of music and
            English as a Second Language. These weren't just gigs for money: I've been genuinely
            interested in both. My favourite thing about teaching ESL was learning so much more of
            my own language. When I look at how these jobs fit in with my current trajectory, I
            scratch my head regarding music, but I've some ideas about how teaching / learning a
            second language has helped me as a programmer, and why I'd encourage anyone considering
            it to give it a go."""
                ]
            , Paragraph
                [ Text """This article, then, describes how a pursuit that may seem irrelevant at
                first to working as a software developer actually benefits me. If you have any
                similar experience of working in a seemingly unrelated area, try to reflect on ways
                in which it may actually come in handy for you."""
                ]
            ]
        }
    ]
