module Blog.EitherPatternNetworkCalls exposing (getContent)

import Blog.Content exposing (AttributionInfo(..), Content(..), ParagraphSegment(..))
import Date
import Time exposing (Month(..))


getContent : () -> List Content
getContent _ =
    [ Title "The Either / Result pattern"
    , SubTitle "... for network calls"
    , WhenCreated <| Date.fromCalendarDate 2020 Aug 23
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """In most Single Page Apps that rely on back-end services, you will find
                yourself making many repetitive calls to these services from your UI components,
                either directly or via some module that handles network fetches. And you'll find
                that you're always dealing with 3 or 4 varying factors:"""
                ]
            , OrderedList
                [ [ Text "The endpoint uri" ]
                , [ Text "The body of the request (optional)" ]
                , [ Text "A "
                  , [ Text "successful" ] |> Strong
                  , Text " response and its possible content"
                  ]
                , [ Text "An "
                  , [ Text "unsuccessful" ] |> Strong
                  , Text " response and its error content"
                  ]
                ]
            , Paragraph
                [ Text """What I often saw was code that within a UI component would invoke the api
                using the """
                , InlineCode "fetch"
                , Text """ API, get a response object, and then branch logic based on whether the
                result was successful or not. This can become fairly cumbersome, as shown below."""
                ]
            , CodeBlock
                { language = "js"
                , code = """
async componentDidMount() {
    this.setState({ isFetching: true });

    try {
        const productsResponse = await fetch("http://our.service/api/products");
        if (productsResponse.ok) {
            const products = await productsResponse.json();
            this.setState({ products });
        } else {
            const errorContent = await productsResponse.json();
            notifyError(errorContent);
        }
    } catch (error) {
        notifyError(error);
    }
    
    this.setState({ isFetching: false });
}
                """
                }
            , Paragraph
                [ Text """And this is ignoring the cases where we often wanted to handle the
                returned data in some way. For example, if we wanted to enrich that data with some
                other content, map it to a different shape, or use the result of one fetch as the
                input to another. In these cases, we often had early """
                , InlineCode "return"
                , Text """ calls in the failure branches in order to avoid further processing, which
                complicated setting state very quickly."""
                ]
            , Paragraph
                [ Text """This seems to be unreasonably complicated, given that in our heads we're
                simply trying to capture """
                , [ Text "'if it's successful, do this; if it's unsuccessful, do that'" ] |> Emphasised
                , Text "."
                ]
            , Paragraph
                [ Text """It just so happens there's a perfect abstraction that simplified handling
                a lot of these network calls' responses.""" ]
            ]
        }
    , Divider
    , Section
        { title =
            Just
                { title = "Either or"
                , subTitle = "... this or that"
                }
        , content =
            [ Image
                { source = "/assets/img/fork_in_road.jpg"
                , alt = "Fork in the road"
                , attribution =
                    ComplexAttribute
                        { text = "Pinnacle Advisory"
                        , link = "https://www.pinnacleadvisory.com/analyst/a-fork-in-the-road-market-review/"
                        }
                }
            , Paragraph
                [ Text "The 'Either' or 'Result' pattern (or "
                , ExternalLink "https://adambennett.dev/2020/05/the-result-monad/" "the Result Monad"
                , Text """, but that's a scary word), is very useful for encapsulating this """
                , [ Text "either or" ] |> Emphasised
                , Text " behaviour, which I've briefly written about previously "
                , InternalLink "/blog/are-you-providing-value" "here"
                , Text """. Ordinarily, a given function would return a given type of 
                result. A naive view of the above """
                , InlineCode "fetch"
                , Text """ request is that it should just return us our products, since that's what
                we're interested in, but with the complexity of HTTP requests / responses, it's
                only responsible for the API to first return us an object from which we can then
                inspect and handle further."""
                ]
            , Paragraph
                [ Text "At the crux of this monad is the ability to describe "
                , [ Text "how" ] |> Emphasised
                , Text """ you would like to handle the success / failure paths of the result of 
                some operation. The above example can be rewritten to take advantage of this
                pattern, but first it will be useful to have a function that adapts the raw """
                , InlineCode "fetch"
                , Text " API result into "
                , [ Text "either" ] |> Emphasised
                , Text " a successful result "
                , [ Text "or" ] |> Emphasised
                , Text " an unsuccessful one."
                ]
            , CodeBlock
                { language = "js"
                , code = """
class Either {
    isOk;
    value;

    constructor(isOk, value) {
        isOk = isOk;
        value = value;
    }

    handleOk(okDelegate) {
        if (this.isOk) {
            okDelegate(value);
        }

        return this;
    }

    handleFailure(failureDelegate) {
        if (!this.isOk) {
            failureDelegate(value);
        }

        return this;
    }

    // ... Here you would have some other useful methods we can talk about later

    static Ok(successfulValue) {
        return new Either(true, successfulValue);
    }

    static Fail(unsuccessfulValue) {
        return new Either(false, unsuccessfulValue);
    }
}

// Then, in some network-related module, we define a function

const fetchResult = async (url, init) => {
    try {
        const result = await fetch(url, init);
        if (result.ok) {
            return Either.Ok(await result.json());
        } else {
            return Either.Fail({
                status: result.status, 
                content: await result.json() 
            });
        }
    } catch (error) {
        return Either.Fail({ content: error });
    }
}
            """
                }
            , Paragraph
                [ Text """The 'Either' type itself can be defined in different ways; if you're a fan,
                you could write it as a """
                , ExternalLink
                    "https://coryrylan.com/blog/javascript-module-pattern-basics"
                    "function-based module"
                , Text ". I've found it useful to include "
                , InlineCode "handleOk"
                , Text " and "
                , InlineCode "handleFailure"
                , Text "methods separately in order to handle performing "
                , [ Text "side-effecty" ] |> Emphasised
                , Text """ actions for either success or failure along the pipeline, but these can
                be combined in a 'cata' as described """
                , ExternalLink
                    "https://medium.com/@dimpapadim3/either-is-a-common-type-in-functional-languages-94b86eea325c"
                    "here"
                , Text """. This may all look rather unimpressive, and it's as though we've just 
                created ourselves some extra work without any benefit. But with these beginning
                pieces, the above example of fetching products becomes:"""
                ]
            , CodeBlock
                { language = "js"
                , code = """
async componentDidMount() {
    this.setState({ isFetching: true });

    (await fetchResult("http://our.service/api/products"))
        .handleFailure(({ content }) => notifyError(content))
        .handleOk((products) => { this.setState({ products }) };);

    this.setState({ isFetching: false });
}

// If we don't like the use of async / await, this can also be

fetchResult("http://our.service/api/products")
    .then((result) => result
        .handleFailure(({ content }) => notifyError(content))
        .handleOk((products) => { this.setState({ products }) };));
            """
                }
            , Paragraph
                [ Text """This massively distills the essence of what we're trying to convey to
                other developers working on this project. At the call site, we can see that we're
                fetching some data, notifying of failure if that occurs, and setting state if the
                result is successful. That's it. """
                , [ Text "Simples" ] |> Emphasised
                , Text """. The below diff demonstrates how we cut
                through the otherwise messy success / failure branch handling."""
                ]
            , CodeBlock
                { language = "diff"
                , code = """

async componentDidMount() {
    this.setState({ isFetching: true });

-    try {
-        const productsResponse = await fetch("http://our.service/api/products");
+    (await fetchResult("http://our.service/api/products"))
-        if (productsResponse.ok) {
-            const products = await productsResponse.json();
-            this.setState({ products });
-        } else {
+        .handleOk((products) => this.setState({ products }))
-            const errorContent = await productsResponse.json();
-            notifyError(errorContent);
-        }
-    } catch (error) {
-        notifyError(error);
-    }
+        .handleFailure(({ content }) => notifyError(content));
    
    this.setState({ isFetching: false });
}
            """
                }
            , Paragraph
                [ Text """The benefits become even more apparent when you want to do something
                further with the successful result. Consider the below example:""" ]
            , CodeBlock
                { language = "js"
                , code = """
let userName;

try {
    const userResponse = await fetch("http://our.userservice/api/users/123");
    if (userResponse.ok) {
        const user = await userResponse.json();
        if (!user.name?.first || !user.name?.last) {
            return;
        }

        userName = user.name.first + " " + user.name.last;
    } else {
        const errorContent = await userResponse.json();
        notifyError(errorContent);
    }
} catch (error) {
    notifyError(error);
}

if (!userName) {
    return;
}

try {
    const filteredProductsResponse = await fetch(`http://our.service/api/products?ownedBy=${userName}`);
    if (filteredProductsResponse.ok) {
        const filteredProducts = await filteredProductsResponse.json();
        this.setState({ products: filteredProducts });
    }
} catch (error) {
    notifyError(error);
}
                """
                }
            , Paragraph
                [ Text """A large advantage of this monad is simplifying dealing with the happy
                path whilst not failing to deal with the unhappy one. In the above, we want to
                fetch the products with a filter, but """
                , [ Text "only" ] |> Strong
                , Text """ if the previous user name fetch was successful. We also need to check
                whether the returned user object actually has a first and last name defined before
                continuing, complicating the possible escape hatch """
                , InlineCode "return"
                , Text " calls within the function."
                ]
            , Paragraph
                [ Text """It would be useful if we could just pass a function that operates on a
                successful result without interfering with an unsuccessful one. That function could
                even return another Either, or just a simple result that we can wrap in an Either.
                This functionality is handled by methods usually described as a """
                , InlineCode ".bind"
                , Text ", as described "
                , ExternalLink
                    "https://fsharpforfunandprofit.com/posts/elevated-world-2/"
                    "here"
                , Text ". Let's have a look at some simplified examples of those."
                ]
            , CodeBlock
                { language = "js"
                , code = """
class Either {
    // ... As in the above example

    bind(nextDelegate) {
        if (!this.isOk) return this;  // We only perform this action if Either is successful

        const nextResult = nextDelegate(this.value);

        // Here you can return directly if the 'nextDelegate' function returns another Either
        if (nextResult instanceof Either) {
            return nextResult;
        } else {
            // Otherwise, with no errors raised, we can interpret this as successful
            return Either.Ok(nextResult);
        }
    }

    async bindAsync(nextDelegateAsync) {
        // similar implementation to the above, but this expects 'nextDelegateAsync' to
        // return a Promise, which this method can properly 'await'
    }
}
                """
                }
            , Paragraph
                [ Text "You could also wrap the evaluation of "
                , InlineCode "nextDelegate"
                , Text " in a try / catch block, and handle errors by returning "
                , InlineCode "Either.Fail"
                , Text """, but that's very much a matter for some further thought and decision
                making. After all, if a """
                , InlineCode "nextDelegate"
                , Text """ that doesn't attempt to return an Either instance simply fails, it may
                be desirable to expect the caller to handle this within the """
                , InlineCode "nextDelegate"
                , Text " function that they pass."
                ]
            , Paragraph
                [ Text """In our above, non-Either example, it looks like we also wanted to define
                when a result may be a failure. This can be handled by doing something like:"""
                ]
            , CodeBlock
                { language = "js"
                , code = """
class Either {
    // ... We've seen this before folks

    failIf(delegate) {
        if (!this.isOk) return this;

        return delegate(this.value)
            ? Either.Fail(null)
            : this;
    }
}
            """
                }
            , Paragraph
                [ Text """With these pieces in place, we can now diff the simplifications. To
                prevent your eyes from bleeding by stitching the two together, I've separated the
                removed from the added.""" ]
            , CodeBlock
                { language = "diff"
                , code = """
-let userName;
-
-try {
-    const userResponse = await fetch("http://our.userservice/api/users/123");
-    if (userResponse.ok) {
-        const user = await userResponse.json();
-        if (!user.name?.first || !user.name?.last) {
-            return;
-        }
-
-        userName = user.name.first + " " + user.name.last;
-    } else {
-        const errorContent = await userResponse.json();
-        notifyError(errorContent);
-    }
-} catch (error) {
-    notifyError(error);
-}
-
-if (!userName) {
-    return;
-}
-
-try {
-    const filteredProductsResponse = await fetch(`http://our.service/api/products?ownedBy=${userName}`);
-    if (filteredProductsResponse.ok) {
-        const filteredProducts = await filteredProductsResponse.json();
-        this.setState({ products: filteredProducts });
-    }
-} catch (error) {
-    notifyError(error);
-}

+(await fetchResult("http://our.userservice/api/users/123"))
+   .failIf((user) => !user.name?.first || !user.name?.last)
+   .bind((user) => user.name.first + " " + user.name.last)
+   .bindAsync((userName) =>
+       fetchResult(`http://our.service/api/products?ownedBy=${userName}`))
+   .then((result) => result
+       .handleFailure((error) => { 
+           if (error?.content) notifyError(error.content);
+       })
+       .handleOk((filteredProducts) => { this.setState({ products: filteredProducts }) };))
            """
                }
            ]
        }
    , Divider
    , Section
        { title =
            Just
                { title = "When not to use it"
                , subTitle = "... \"what's an 'Either'?\""
                }
        , content =
            [ Image
                { source = "https://media.giphy.com/media/zjQrmdlR9ZCM/giphy.gif"
                , alt = "Confused"
                , attribution =
                    ComplexAttribute
                        { text = "giphy.com"
                        , link = "https://giphy.com/gifs/confused-huh-mark-wahlberg-zjQrmdlR9ZCM"
                        }
                }
            , Paragraph
                [ Text """Despite the advantages, there are genuine reasons you may not want to
                introduce an Either / Result monad into your work's next project:"""
                ]
            , Collection
                [ { title = "Team doesn't understand it"
                  , text = """While you might believe it's the team's responsibility to learn
                  whatever you've read someone on the internet tell you to do, there is a genuine
                  cost incurred in any new technique introduced."""
                  }
                , { title = "Team doesn't like it"
                  , text = """Unfortunately, developers are people too, and if they're not on board
                  with it, they're likely to skirt around using it, avoid extending it, or worse,
                  remove it."""
                  }
                , { title = "'handleOk' and 'handleFailure' functions can be misunderstood"
                  , text = """If people forget that these functions are for executing some side
                  effect using the current success / failure, you'll start to see some interesting
                  attempts to use these functions to try to modify the current value contained in
                  the Either instance."""
                  }
                , { title = "Others treat it as a 'builder' object"
                  , text = """Since you're passing function callbacks in a series, other devs might
                  conclude that this is some sort of 'builder' object, where we can define only
                  once how we want to handle success or failure. Once it clicks that this is a
                  pipeline, people start to realise that the placement order of a 'handleFailure'
                  matters."""
                  }
                ]
            ]
        }
    ]
