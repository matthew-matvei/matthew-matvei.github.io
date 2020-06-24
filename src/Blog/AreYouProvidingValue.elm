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
                , subTitle = "...graveyard modules"
                }
        , content =
            [ Paragraph
                [ Text """So you're writing a view component - maybe in React or Vue, and you want to
                extract a rather complicated function out into its own module... because the
                function is complicated."""
                ]
            , Paragraph
                [ Text "Since there's no overarching "
                , Emphasis "reason"
                , Text """ for this module, other than just to house this function that you're going
                to import the function from (which, you reason, will make the code more reusable
                and testable), you decide to put it in a new file called """
                , InlineCode "helpers.js"
                , Text """. You put the function there, write some tests, and import it in one place
                - the component you were working on when you extracted out this function."""
                ]
            , Paragraph
                [ Text """A few weeks later you notice in this same code base a very similar function
                that was clearly written for one other particular component as well. This time, the
                developer put it in a file called """
                , InlineCode "utils.js"
                , Text " and they had no idea that your function that lives is "
                , InlineCode "helpers.js"
                , Text " even existed. After all, they saw a file called "
                , InlineCode "helpers.js"
                , Text """ and had no idea that the particular function they needed at the time 
                would be in there. And how would they? The module's name gives no clues about what
                area of functionality it's centred on."""
                ]
            , Paragraph
                [ Text """If you want to provide value to other developers with reusable code that
                can be worked with and extended logically, consider what can be seen as generic, has
                few dependencies and doesn't make strong assumptions about the calling code. For
                example:""" ]
            , CodeBlock
                { language = "js"
                , code = """
// helpers.js

const formatResult = (data, excludedProducts) => {
    let result = "";
    for (var product of data) {
        if (excludedProducts.some(p => p.info.id === product.info.id))
            continue;
            
        result = result + product.info.name + ';'
    }
}
                """
                }
            , Paragraph
                [ Text "This non-descript "
                , InlineCode "helpers.js"
                , Text " module now has a very uninformatively named "
                , InlineCode "formatResult"
                , Text """ function. Whether it serves any immediate use is one thing, but anyone
                who tries to apply this to any other problem they have are likely to find it's not
                fit for their purpose."""
                ]
            , Paragraph
                [ Text """To get something useful from this, let's try to think about what this 
                rather contrived function is, at the heart of it, trying to do.""" ]
            , Paragraph
                [ Text """Essentially, it takes an array of data and concatenates product names with
                a trailing ';' from it, as long as those products shouldn't be excluded. There's a
                great number of ways that we can make this a little more generic to hopefully make
                this a better candidate for reuse, depending on how much power / responsibility we
                want to place back into the caller's hands. Some examples are:""" ]
            , CodeBlock
                { language = "js"
                , code = """
// products.js

const formatNames = (data, excludedProducts) => {
    // Implementation as above
}
                """
                }
            , Paragraph
                [ Text """This first alternative doesn't change much at all. In fact, all it does
                is centre this functionality in a products-related module. Depending on how
                consistent your product models are, this may be enough for this function to now be
                easier to find and more reusable. That said, it still makes a lot of assumptions
                about both what these products look like and the fact that 'format' means
                'concatenate'.""" ]
            , CodeBlock
                { language = "js"
                , code = """
// products.js

const concatProductNames = (
    data, 
    {
        selectName = x => x, 
        excludeIf = x => false
    } = {}) => 
    data
        .filter(product => !excludeIf(product))
        .map(selectName)
        .reduce((result, current) => result + current + ';', '');

// Then call this with

concatProductNames(
    products,
    {
        selectName: p => p.info.name,
        excludeIf: p => productsToExclude.some(pe => pe.info.id === p.info.id)
    });
)
            """
                }
            , Paragraph
                [ Text """This option places more responsibility again on the caller, asking them
                to provide a function for both selecting a product's name and determining whether
                a product should be included or not. This means that any other potential caller can
                reuse this, even if they have a different shape of product, and even if they have a
                different (or no) requirements about whether the product should be excluded. That
                said, it still makes some assumptions about how the result should be concatenated,
                which may be just enough contained functionality to still make this function
                valuable in the domain of products.""" ]
            , Paragraph
                [ Text """I rewrote the implementation above to show that, mainly, this function is
                really just a filter and a map, with some string concatenation that the caller may
                or may not want. What if we had no real domain logic that specified that we often
                need product names listed in this contrived way? We could offer the following:""" ]
            , CodeBlock
                { language = "js"
                , code = """
// arrays.js

const filterMap = (array, filter, map) => {
    const result = [];

    for (var elem of array) {
        if (filter(elem)) {
            result.push(map(elem));
        }
    }

    return result;
}

// Then, to get the same result as we did before

const relevantProductNames = filterMap(
    products,
    p => excludedProducts.every(pe => pe.info.id !== p.info.id),
    p => p.info.name
);

const result = relevantProductNames.reduce((acc, current) => acc + current + ';', '');
                """
                }
            , Paragraph
                [ Text """This places almost all power and responsibility at the feet of the caller,
                but provides purely generic array-based functionality which could be relevant for
                any manner of purpose. In fact, the only real feature this function offers is
                avoiding the double enumeration of an array, which could get expensive in larger
                arrays (and they'd better be large before you start worrying too much about this).""" ]
            , Paragraph
                [ Text """On the great spectrum of reusable code, this may be verging on the side of
                'but do I even need this', and yeah in most cases the caller could simply """
                , InlineCode ".filter"
                , Text " and "
                , InlineCode ".map"
                , Text """ themselves. The most reusable yet useful function may lie somewhere in
                the middle of the two extremes I've provided."""
                ]
            ]
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
