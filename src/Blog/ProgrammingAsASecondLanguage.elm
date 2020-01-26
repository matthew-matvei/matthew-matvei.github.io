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
            [ Image
                { source = "../assets/img/bad-teacher-funny-teachers.jpg"
                , alt = "I know you're not talking while I'm teaching (meme)"
                }
            , Paragraph
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
    , Section
        { title =
            Just
                { title = "There will never be one correct way"
                , subTitle = ""
                }
        , content =
            [ Paragraph
                [ Text "You'll often here someone try to argue that their idea, pattern etc. is the "
                , Emphasis "best"
                , Text " or the "
                , Emphasis "correct"
                , Text " way to do something. The larger that concept is, e.g. "
                , Link
                    "https://www.jinfonet.com/resources/bi-defined/3-tier-architecture-complete-overview/"
                    "Three Tier Architecture"
                , Text """ the dearer they'd likely hold it to their hearts, even though the larger
                the concept is the more likely a """
                , Link
                    "https://jimmybogard.com/vertical-slice-architecture/"
                    "viable alternative exists"
                , Text """. If you've learnt some aspects of a foreign language, however, you can 
                see that there is a multitude of different, equally valid ways of attacking the 
                same problem."""
                ]
            , Paragraph
                [ Text "English places a lot of importance "
                , Link
                    "https://www.toeflgoanywhere.org/importance-word-order-english"
                    "on the order of words within a sentence"
                , Text ". "
                , Emphasis "'The boy ate the burger'"
                , Text " and "
                , Emphasis "'the burger ate the boy'"
                , Text """ are two very different news stories. This is because the language places
                meaning into the order by codifying a 'Subject' 'Verb' 'Object' pattern. Basically,
                due to the burger coming first in the second sentence, """
                , Emphasis "it"
                , Text " is the thing doing the eating. In Russian, however, "
                , Emphasis "'мальчик ест гамбургер'"
                , Text " would mean 'the boy is eating a hamburger', whereas "
                , Emphasis "'мальчика ест гамбургер'"
                , Text """ is a viable way of saying 'the hamburger is eating a boy'. It would be
                unusual to present the information in this order, since there are still patterns and
                conventions in word order in Russian to keep things predictable (in a good way), 
                but the 'source of truth' in the sentence's meaning would be the declension of the
                adjectives / nouns and the conjugation of the verbs. In """
                , Emphasis "'мальчика ест гамбургер'"
                , Text """, we know that the boy is the object of the sentence only due to the extra
                'а' appearing at the end of the word 'мальчик'. Pretty sneaky..."""
                ]
            , Paragraph
                [ Text """A parallel in programming that comes to mind is the use of positional
                arguments for a function or method vs named arguments (or, where that's not possible,
                an arguments object). For example, in JavaScript, we might:""" ]
            , CodeBlock
                { language = "js"
                , code = """
const processValues = (name, email, password, dateOfBirth, hasConsented) => {
    // We process the positional arguments in some way
}

// We then call this function like so
processValues('Boris', 'boris.y@rumbler.ru', 'admin', '01-02-1931', true);
                """
                }
            , Paragraph
                [ Text """We've placed a lot of importance on the order of words here. Essentially,
                'boris.y@rumbler.ru' is only being interpreted as an email because of the somewhat
                arbitrary order of arguments sent to the function. If someone wanted to refactor
                this function by changing this order (if they, I don't know, really hate themselves),
                there would be many unintended consequences as now names will be treated as emails
                and dates of birth as passwords etc."""
                ]
            , Paragraph
                [ Text """Alternatively, we could give the arguments meaning in and of themselves,
                allowing them to be understood without the need for them to appear in a particular
                order. One way to achieve this in JavaScript would be to:"""
                ]
            , CodeBlock
                { language = "js"
                , code = """
const processValues = (args) => {
    // We process the arguments object in some way using args.name, args.email etc.
}

// Or, we can just use deconstruction to keep things clearer

const processValues = ({ name, email, password, dateOfBirth, hasConsented }) => {
    // We process the deconstructed arguments object in some way
}

// We then call this function like so
processValues({ 
    name: 'Boris', 
    email: 'boris.y@rumbler.ru', 
    password: 'admin', 
    dateOfBirth: '01-02-1931', 
    hasConsented: true
});
                """
                }
            , Paragraph
                [ Text """This may seem less concise than the above option of using positional
                arguments, which is why it may be overkill when a function has one or two arguments,
                particularly when the order of those arguments is intuitive given the nature of the
                function. The benefit, though, is there is no longer any meaning coupled with the
                order of the arguments as given. If that same self-hating developer wanted to
                refactor the function, they can move around the parameters to please themselves,
                since JavaScript would be matching on property name, not the parameter order."""
                ]
            , Paragraph
                [ Text """As an analogy to English's and Russian's approach to word order, then, we 
                can choose whether we want to place meaning in the order the words appear, or 
                whether we want the words to describe their own meaning in that function. Both are
                entirely valid options, and each will be most useful in certain circumstances.""" ]
            ]
        }
    ]
