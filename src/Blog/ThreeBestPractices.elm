module Blog.ThreeBestPractices exposing (getContent)

import Blog.Content exposing (AttributionInfo(..), Content(..), ParagraphSegment(..))
import Date
import Time exposing (Month(..))


getContent : () -> List Content
getContent _ =
    [ Title "3 Best Practices in programming"
    , SubTitle "... and how there are no Best Practices"
    , WhenCreated <| Date.fromCalendarDate 2019 Nov 15
    , Section
        { title = Nothing
        , content =
            [ Paragraph [ Text """We've all had that argument with another developer where
        we've reasonably laid out our position why it would be a good idea to do something,
        only to be met with""" ]
            , BlockQuote "Yes, but best practice..."
            , Image
                { source = "https://media.giphy.com/media/d0NnEG1WnnXqg/giphy.gif"
                , alt = "boom-mic-drop"
                , attribution = TextAttribute "GIPHY"
                }
            , Paragraph [ Text """and that's all they need to say. And how can you respond to that? 'Sure, then I want to do
            something less than best' hardly wins anyone over. They've said the relevant buzzword and we can now just
            switch off our brains and do what the man on the Internet told us to do. If you've never had this
            conversation before, congratulations.""" ]
            , Paragraph
                [ Text """For me, however, experience in this conversation brings me to my first 😓 blargh post. I want
            to show you that there are no strictly """
                , Emphasis "best"
                , Text """ practices and remind you that everything really does
            depend on the situation."""
                ]
            ]
        }
    , Divider
    , Section
        { title = Just { title = "1. Commenting", subTitle = "Everyone's favourite pastime" }
        , content =
            [ Paragraph
                [ Text "My last workplace had a severely pro-commenting culture, with rules for commenting "
                , InlineCode "private"
                , Text " methods and simple object properties. This led to wonders such as..."
                ]
            , CodeBlock
                { language = "cs"
                , code = """
/// <summary>
/// Returns the current value of this object.
/// </summary>
/// <returns>The current value of this object</returns>
public int GetValue() =>
    this.Value
                """
                }
            , Paragraph [ Text """with more text explaining than doing, regardless of whether the code is already
            completely unambiguous. Worse still, this can easily be...""" ]
            , CodeBlock
                { language = "cs"
                , code = """
/// <summary>
/// Returns the current value of this object.
/// </summary>
/// <returns>The current value of this object</returns>
public int GetValue() =>
    this.Value ?? throw new InvalidOperationException();
            """
                }
            , Paragraph
                [ Text "at which point, the comments don't even mention the most surprising "
                , Emphasis "feature"
                , Text " about this method, which is that if it's called when "
                , InlineCode "this.Value"
                , Text " is "
                , InlineCode "null"
                , Text " then we're gonna explode!"
                ]
            , Image
                { source = "https://media.giphy.com/media/13d2jHlSlxklVe/giphy.gif"
                , alt = "explosions"
                , attribution = TextAttribute "GIPHY"
                }
            , Paragraph [ Text """On the other side of this spectrum is my current workplace, which strictly believes
            that all code should be self-descriptive enough to not warrant any comments, ever. And there are some good
            reasons:""" ]
            , Collection
                [ { title = "Programmers will barely read your code, let alone the comments that go with it"
                  , text = """We deal with tight deadlines and a lot of words to process. I am human, and if there are
            reasonable shortcuts to take, I'll take them. First things first, you're well-versed yet untestable code
            comments."""
                  }
                , { title = "The compiler can never know whether your comments are correct anymore"
                  , text = """If you change what a JavaScript function returns without changing your JS Doc, then you're
            no better than those that use social engineering to convince old ladies you work at her bank."""
                  }
                , { title = "Maintenance costs"
                  , text = """There's no such thing as a free sandwich, and I have found myself wasting very real time
            in order to satisfy commenting standards that either my workplace or university had."""
                  }
                , { title = "There's no guarantee your code will be easier to understand"
                  , text = """Walls of description can distract coders from the nuts and bolts of the code, and if the
            comments become stale (where the code has moved on but the comment has not been updated) then they only
            cause confusion."""
                  }
                ]
            , Paragraph [ Text """That said, there is a time and place for documentation. The more your actual code can
            inform this, the better. For example, think how your typed API is self-documenting when you have a
            method...""" ]
            , CodeBlock
                { language = "cs"
                , code = """
Task<bool> ItemExistsAsync(string itemId);
                """
                }
            , Paragraph
                [ Text "Immediately, I know that I need to give it a "
                , InlineCode "string"
                , Text " identifier of an item, and I can "
                , InlineCode "await"
                , Text " a "
                , InlineCode "boolean"
                , Text " answer. Or even better, if you dabble a little more with "
                , Emphasis "functional"
                , Text " patterns..."
                ]
            , CodeBlock
                { language = "cs"
                , code = """
Either<Error, Item> GetItem(string itemId);
                """
                }
            , Paragraph
                [ Text "From this, I can see that I'll either get an "
                , InlineCode "Error"
                , Text " (if something went wrong) or I'll get the "
                , InlineCode "Item"
                , Text """ I was looking for. This even means I don't need to dig into the bowels of the method to
                discover that it might actually """
                , InlineCode "throw"
                , Text " an exception (or even rely on code comments to describe this to me)."
                ]
            , BlockQuote "Cool, so what do you suggest?"
            , Paragraph [ Text """I'm glad you asked. I would consider the following when determining whether you should
            use comments or not.""" ]
            , Collection
                [ { title = "Is the code understandable without it?"
                  , text = """This can be difficult, since it'll always be understandable to the author, which is why a
                  code review process can be very useful."""
                  }
                , { title = "Can I make things clearer by refactoring?"
                  , text = """If there's a certain if condition that makes people's eyes bleed and scratch their heads,
                  then perhaps you can assign that condition to a named function."""
                  }
                , { title = "How accessible is the code to the caller?"
                  , text = """Consider whether the caller of some code is able to see it. For example, a private method
                will be called from within the same class, so if a developer is working on the caller, they will have
                full access to it. If you're writing the outer API of some library code (or, using OpenAPI, documenting
                a HTTP API) there'll likely be more value in commenting, since the consumer perhaps won't be able to
                peer into the code as easily."""
                  }
                ]
            ]
        }
    , Divider
    , Section
        { title = Just { title = "2. Get defensive", subTitle = "Trust no one" }
        , content =
            [ Image
                { source = "https://media.giphy.com/media/32b3S2YQbby2A/giphy.gif"
                , alt = "shifty-eyes"
                , attribution = TextAttribute "GIPHY"
                }
            , Paragraph [ Text """It's generally considered best practice to not trust the calling code, and to always
            check your arguments. But while you might not trust the guy down the street, do you trust your neighbours?
            It isn't completely black and white, and some thought should be given to how defensive you need to be.""" ]
            , Paragraph [ Text """I've seen, for example, code imitated by the following in a web application that uses
            Dependency Injection to provide dependencies:""" ]
            , CodeBlock
                { language = "cs"
                , code = """
public MyService(
    object depA,
    object depB,
    object depN
)
{
    this.depA = depA ?? throw new ArgumentNullException(nameof(depA));
    this.depB = depB ?? throw new ArgumentNullException(nameof(depB));
    this.depN = depN ?? throw new ArgumentNullException(nameof(depN));
}
                """
                }
            , Paragraph
                [ Text "Since it was expected behaviour of the "
                , InlineCode "MyService"
                , Text " class to "
                , InlineCode "throw"
                , Text " if any of its dependencies were "
                , InlineCode "null"
                , Text ", this of course came with unit tests verifying this expected behaviour."
                ]
            , Paragraph
                [ Text """Within the context of web-application code (where a consumer of your application
            typically communicates via HTTP), this code isn't really library code and a developer designing this class
            is likely going to be in a position to check the calling code. Also, keeping that same context in mind,
        we know we're in a position where the dependencies are guaranteed by our DI framework to be resolved and
        delivered; if a dependency cannot be resolved from the DI container, then with our setup an exception will be
        thrown and the """
                , InlineCode "MyService"
                , Text " class will not be constructed."
                ]
            , Paragraph
                [ Text "So you "
                , Emphasis "could"
                , Text """ see these checks as redundant. And whilst C# (above) let's you tidy this up with the null
                coalescing ("""
                , InlineCode "??"
                , Text """) operator, in some other languages this can become more distracting. There are two main ends
                of the spectrum to be on with this."""
                ]
            , Paragraph
                [ Text "You could say "
                , Strong "I trust no one"
                , Text """, and I can't guarantee that this class will always be resolved through Dependency Injection.
                Even then, we may switch DI frameworks, the standard behaviour may be different and we might end up
                trying to construct this class with """
                , InlineCode "null"
                , Text " dependencies."
                ]
            , Paragraph
                [ Text "You could also say "
                , Strong "Take responsibility when calling me"
                , Text ", and decide that if a caller has attempted to manually construct this class with a "
                , InlineCode "null"
                , Text """ dependency, then they've violated the class' type contract (which asks in this example case
                for an """
                , InlineCode "object"
                , Text ", not an "
                , InlineCode "object"
                , Emphasis " or "
                , InlineCode "null"
                , Text ") and can no longer have any expectations about its behaviour."
                ]
            , Paragraph
                [ Text """There's truth to both positions. It may be better in your situation to put responsibility on
                the caller in order to minimise the bloat and complexity of this class, allowing it to evolve faster
                (I've given an example of a """
                , InlineCode "class"
                , Text """' constructor, but this can apply to any of its methods' arguments, including complex object
                arguments). Or it may be, particularly if you're writing deeper-level library code, more appropriate to
                guard against every inch of input you get from calling code."""
                ]
            ]
        }
    , Divider
    , Section
        { title = Just { title = "3. Don't reinvent the wheel", subTitle = "But why not try square tyres?" }
        , content =
            [ Image
                { source = "https://media.giphy.com/media/UP5CZUXC5dH1K/giphy.gif"
                , alt = "square-wheels"
                , attribution = TextAttribute "GIPHY"
                }
            , Paragraph
                [ Text """Taken to the extreme, someone might want to import libraries (especially large utility
            libraries, such as """
                , InlineCode "lodash.js"
                , Text """) to get the job done for them. After all, someone else has likely written this functionality
            before, and particularly if it's a popular, open-source code base, it's likely undergone more scrutiny than
            my (given company policy) private repository will ever receive."""
                ]
            , Paragraph
                [ Text """There's nothing wrong with this line of thinking, in most cases. It's been some years
            since the """
                , ExternalLink "https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/" """2016 chaos caused by pulling a
            commonly-shared dependency"""
                , Text ", the "
                , InlineCode "npm"
                , Text " package "
                , ExternalLink "https://www.npmjs.com/package/left-pad" "left-pad"
                , Text """. While it may be an extreme example, it does point out that sometimes wheels <b>can</b> be
                reinvented. It's a cost / value ratio between the time it would take you to rewrite this functionality,
                vs the 'costs' (which may be your JS bundle size, or your coupling to a certain library / framework)
                involved in importing something pre-rolled. For example, if you're in need of a function to recursively
                flatten an array, consider the following code before importing half of """
                , InlineCode "lodash.js"
                , Text " to do it for you:"
                ]
            , CodeBlock
                { language = "js"
                , code = """
function flattenArray(array) {
    return array.reduce(
        (accumulator, current) => (Array.isArray(current)
            ? accumulator.concat(flattenArray(current))
            : accumulator.concat(current)),
        []);
}
                """
                }
            , Paragraph
                [ Text """Sure, certain aspects of it could be improved, the main one, depending on your project's
                policy on defensiveness, would be checking the given """
                , InlineCode "array"
                , Text """. The costs would be the requirement of testing this function, and maintaining it in the
            inevitable circumstance where you now need this function to flatten to a certain depth level. The benefits,
            however, is that you would have negated the need for depending on a large library."""
                ]
            , Paragraph
                [ Text """Library code is complicated because it needs to incorporate a huge (and potentially growing)
                range of callers, which might bring issues with environment, language version and unreasonable,
                unexpected yet possible input. Even if you're not sure about your own abilities, you might find it a lot
        simpler rolling your own in some cases, since you can keep your solution scoped to the needs of
        your own project. Having actually written the functionality yourself, you'll also have """
                , Strong "a)"
                , Text " learnt how it works in detail (making it easier to debug / reason about) and "
                , Strong "b)"
                , Text " improved your abilities."
                ]
            , Paragraph [ Text """I have been both on projects that import everything, usually landing us in some form
            of dependency hell or another, and ones that attempt to start from scratch on everything. Before deciding,
        consider:""" ]
            , Collection
                [ { title = "What's the size / complexity of this functionality I want?"
                  , text = """You might not know up front. That's okay; if you've given it an hour of your time, you'll
            likely already understand whether this is looking like a reasonable function, or whether you're starting to
            write the code that you will labour over for another month."""
                  }
                , { title = "What's available that's already done this?"
                  , text = """If the only library you can find hasn't been updated (when it likely should have been) for
            years, has no public support / interest, with unaddressed / ignored issues, or would lock you into some tech
            stack you don't want a part of, I wouldn't touch it with a ten-foot pole."""
                  }
                , { title = "Will we be able to get out of this?"
                  , text = """If someone eagerly imported the whole of lodash because it seemed like you'd need a lot of
                its functionality moving forward, then it turned out you only needed a couple of functions (and the
                needed functionality was spread out across modules so cherry-picking wasn't an option), there's nothing
                stopping you from adapting the source code of the few functions you need and killing the import. There
                would be a simple way to remove that dependency on that library."""
                  }
                ]
            ]
        }
    , Section
        { title = Nothing
        , content =
            [ Paragraph [ Text """There are countless other examples of 'best practices' that people follow
            dogmatically, even when over time 'best practices' go through complete paradigm shifts (going from
            Object-Oriented approaches to Functional-Oriented ones, de-duplicated data to allowing duplication where
            read performance may be improved). You will likely, at first, just follow these and keep your head down.""" ]
            , Paragraph [ Text """As you improve your own understanding of what it is you're doing as a developer,
            however, start to ask 'why?', even against well-established 'best practices' that no one else questions. In
            any case you'll come to understand the root reason why you should follow this rule, and be able to stop
            telling people 'We should do this because it's best practice'. You may even come to realise this practice
            that is usually good isn't very appropriate for your given situation.""" ]
            , Paragraph [ Text """Or at the very least, you can feel the rage burn through your veins next week when
            some other dev rips out your lovingly crafted function that was working just fine to import a library,
            saying 'Haven't they even read about best practices here?'""" ]
            ]
        }
    ]
