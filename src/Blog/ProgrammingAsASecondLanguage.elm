module Blog.ProgrammingAsASecondLanguage exposing (getContent)

import Blog.Content exposing (AttributionInfo(..), Content(..), ParagraphSegment(..))
import Date
import Time exposing (Month(..))


getContent : () -> List Content
getContent _ =
    [ Title "Programming as a Second Language"
    , SubTitle "... and why I'm glad I've learnt / taught a second language"
    , WhenCreated <| Date.fromCalendarDate 2020 Jan 26
    , Section
        { title = Nothing
        , content =
            [ Image
                { source = "/assets/img/meme3.jpg"
                , alt = "Useless teacher"
                , attribution = TextAttribute "Memecenter"
                }
            , Paragraph
                [ Text """I have come to the world of programming relatively late, at least compared
                to some other people I work with. For anyone who has ever suffered with """
                , ExternalLink "https://www.youtube.com/watch?v=eqhUHyVpAwE" "Imposter Syndrome"
                , Text """, you can understand how that might be quite daunting. It can feel like 
            you've been wasting all this time and potential on travel, tangential job paths and other 
            pursuits."""
                ]
            , Paragraph
                [ Text """Prior to my current career, I worked mainly in the teaching of music and
            English as a Second Language. These weren't just gigs for money: I've been genuinely
            interested in both. When I look at how these jobs fit in with my current trajectory, I
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
    , Divider
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
                , ExternalLink
                    "https://www.jinfonet.com/resources/bi-defined/3-tier-architecture-complete-overview/"
                    "Three Tier Architecture"
                , Text """, the dearer they'd likely hold it to their hearts, even though the larger
                the concept is the more likely a """
                , ExternalLink
                    "https://jimmybogard.com/vertical-slice-architecture/"
                    "viable alternative exists"
                , Text """. If you've learnt some aspects of a foreign language, however, you can 
                see that there is a multitude of different, equally valid ways of attacking the 
                same problem."""
                ]
            , Paragraph
                [ Text "English places a lot of importance "
                , ExternalLink
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
                unusual to present the information in this way, since there are still patterns and
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
    , Divider
    , Section
        { title =
            Just
                { title = "Be concise"
                , subTitle = "... less is more"
                }
        , content =
            [ Image
                { source = "/assets/img/sarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg"
                , alt = "Less is more"
                , attribution =
                    ComplexAttribute
                        { text = "Photo by Sarah Dorweiler on Unsplash"
                        , link = "https://unsplash.com/@sarahdorweiler?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
                        }
                }
            , Paragraph
                [ Text """When teaching ESL, you're by nature of it communicating with people who
                don't usually understand English very well... in English. That puts a lot of 
                pressure in being highly concise. Fewer words are often better. A long sentence can 
                often mask the truly important word or words that the students should be focusing 
                on."""
                ]
            , Paragraph
                [ Text """When writing code, the audience isn't really the computer. Your compiler
                doesn't care how sensible your variable names are, but other developers who """
                , Strong "will"
                , Text """ have to understand your code some day will care, and they are your
                audience. In this sense, then, you are writing a foreign language that will be read
                and (ideally) understood by someone else for whom this is also a foreign language.
                Imagine if we wrote all our instructions to a computer in Latin: knowing that
                your colleague would have to make sense of it all, you would hopefully settle for -
                where the option exists - simpler grammar and vocabulary."""
                ]
            , Paragraph
                [ Text "Additionally, "
                , ExternalLink
                    "https://danieljscheufler.wordpress.com/2016/12/27/code-is-read-more-often-than-it-is-written/"
                    "code is read more often that it is written"
                , Text """. Especially if what you're writing is a 'hot path' in terms of other
                developers being required to read and understand it, you should treat it as
                optimisation to pause, think, and make your code as straight forward and to the
                point as possible. Some examples might be:"""
                ]
            , CodeBlock
                { language = "cs"
                , code = """
var numbers = new[] { 1, 2, 3 };

var result = new List<int>();
for (var i = 0; i < numbers.Count(); i++)
{
    var num = numbers[i];
    if (num > 1)
    {
        var a = num * num;
        result.Add(a);
    }
}

Console.WriteLine(result);
                """
                }
            , Paragraph
                [ Text """This will get the job done. And for some, this is very readable, """
                , Emphasis "concise"
                , Text """ code. For me, though, the intention (signal) is lost in a sea of words
                (noise). I don't want another developer to have to explore the bowels of my code to
                understand it. Ideally, they could understand this more from the surface. So I might
                instead use:"""
                ]
            , CodeBlock
                { language = "cs"
                , code = """
var numbers = new[] { 1, 2, 3 };

var result = numbers
    .Where(num => num > 1)
    .Select(num => num * num);
                """
                }
            , Paragraph
                [ Text """Not only is there the immediately noticeable advantage of """
                , Emphasis "'Oh hey, there are fewer words to read'"
                , Text ", but those words are also more declarative. We could read this simply as"
                ]
            , BlockQuote """The result is the numbers where they're greater than 1, mapping each one
            by multiplying it by itself."""
            , Paragraph
                [ Text """For anyone reading along who is unfamiliar with C# Linq syntax, you may have 
                even understood it by inference. This is of course a contrived example, and it's 
                probably fine leaving it where it is, but if you were to imagine that the callback 
                passed to the """
                , InlineCode ".Where"
                , Text " and "
                , InlineCode ".Select"
                , Text """ methods were less trivial, and risked obfuscating this code, the use of
                some local functions / private helper methods can alleviate this, to make it:"""
                ]
            , CodeBlock
                { language = "cs"
                , code = """
var numbers = new[] { 1, 2, 3 };

var result = numbers
    .Where(NumberGreaterThanOne)
    .Select(SquareNumber);
                """
                }
            , Paragraph
                [ Text """This only makes the broader code more concise if those callback functions
                themselves are reasonable, something that the process of attempting to name them
                may illuminate. Let's say some sick joke meant that the query ignored the last item:"""
                ]
            , CodeBlock
                { language = "cs"
                , code = """
// Notice our named helper method is becoming less concise
var result = numbers
    .Where(NumberGreaterThanOneAndItemNotLast)
    .Select(SquareNumber);

// Whereas, if we were to keep these separate
var result = numbers
    .Where(NumberGreaterThanOne)
    .Where(ItemNotLast)
    .Select(SquareNumber);
                """
                }
            , Paragraph
                [ Text """Here, it was seen that it didn't make sense to shove two very different
                actions into one private helper method, which resulted essentially in two calls to
                the """
                , InlineCode ".Where"
                , Text """ method. It's arguable this is inefficient, and I would agree that
                (particularly in languages that don't have any optimisation of these collection-based
                functions) this - to a computer - may seem excessive, but hopefully to a human
                reader this splits out the filtering requirements more discretely and concisely."""
                ]
            , Paragraph
                [ Text """Starting with a simple base that other developers can easily understand
                also makes it easier to add required embellishments later. Examples include a retry 
                policy surrounding a network call, or error logging to record exceptions occurred 
                during a HTTP request. Hopefully, the next developer, with a concentrated purpose,
                will also be able to contribute to the shared codebase in an equally focused
                manner.""" ]
            ]
        }
    , Divider
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """ESL, perhaps unintuitively for the lay person, is often taught with English
                as the medium when the teacher is a native speaker. This forces you to -
                particularly when you have students at varying levels - learn how to communicate
                complex ideas at varying levels of complexity. This isn't just applicable when
                trying to explain to a child that 'I do, you do, but he / she / it """
                , Strong "does"
                , Text """', but also useful when giving an overview to your non-technical manager
                how you're going to implement your new system's architecture. If you can't boil
                down some pretty complicated ideas into a form that's palatable to them, you might
                not be able to justify some of your work or argue some of your decisions."""
                ]
            , Paragraph
                [ Text """Learning a second language draws a number of parallels with learning a
                programming language. There is a syntax, a vocabulary - there are areas in which
                there's no room for movement or interpretation, and others where the lines are less
                clear. Broadly, though, I think you can learn a lot about your communication with
                others, as well as an appreciation for the vast array of ways in which we can say
                the same thing with our code.""" ]
            ]
        }
    ]
