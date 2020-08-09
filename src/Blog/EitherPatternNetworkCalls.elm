module Blog.EitherPatternNetworkCalls exposing (getContent)

import Blog.Content exposing (Content(..), ParagraphSegment(..))
import Date
import Time exposing (Month(..))


getContent : () -> List Content
getContent _ =
    [ Title "The Either / Result pattern"
    , SubTitle "... for network calls"
    , WhenCreated <| Date.fromCalendarDate 2020 Aug 9
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """In most Single Page Apps that rely on back end services, you will find
                yourself making many repetitive calls to these services from your UI components,
                either directly or via some module that handles network fetches. And you'll find
                that you're always dealing with 3 or 4 varying factors:"""
                ]
            , OrderedList
                [ [ Text "The endpoint uri" ]
                , [ Text "The body of the request (optional)" ]
                , [ Text "A successful response and its possible content" ]
                , [ Text "An unsuccessful response and its error content" ]
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
                returned data in some way. For example if we wanted to enrich that data with some
                other content, map it to a different shape, or use the result of one fetch as the
                input to another. In these cases, we often had early """
                , InlineCode "return"
                , Text """ calls in the failure branches in order to avoid further processing, which
                complicated setting state appropriately."""
                ]
            , Paragraph
                [ Text """This is unfortunately complicated, given that in our heads we're simply
                wanting to capture """
                , Emphasis "if it's successful, to this; if it's unsuccessful, do that"
                , Text "."
                ]
            , Paragraph
                [ Text """It just so happens there's a perfect abstraction that simplified a lot of 
                these network calls' responses.""" ]
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
            [ Paragraph
                [ Text "The 'Either' or 'Result' pattern (or "
                , ExternalLink "https://adambennett.dev/2020/05/the-result-monad/" "the Result Monad"
                , Text """, but that's a scary word), is very useful for encapsulating this """
                , Emphasis "either or"
                , Text """ behaviour. Ordinarily, a given function would return a given type of 
                result. Given a naive view of the above """
                , InlineCode "fetch"
                , Text """ request is that it should just return us our products, since that's what
                we're interested in, but with the complexity of HTTP requests / responses, it's
                only responsible for the API to first return us an object from which we can then
                inspect and handle further."""
                ]
            , Paragraph
                [ Text "At the crux of this monad is the ability to describe "
                , Emphasis "how"
                , Text """ you would like to handle the success / failure paths of the result of 
                some operation. The above example can be rewritten to take advantage of this
                pattern, but first it will be useful to have a function that adapts the raw """
                , InlineCode "fetch"
                , Text " API result into "
                , Emphasis "either"
                , Text " a successful result "
                , Emphasis "or"
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

    // ... Some other useful methods we can talk about later

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
                result is successful. That's it. Simples. The below diff demonstrates how we cut
                through the otherwise messy success / failure branch handling."""
                ]
            , CodeBlock
                { language = "diff"
                , code = """

async componentDidMount() {
    this.setState({ isFetching: true });

-    try {
-        const productsResponse = await fetch("http://our.service/api/products");
+   (await fetchResult("http://our.service/api/products"))
-        if (productsResponse.ok) {
-            const products = await productsResponse.json();
-            this.setState({ products });
-        } else {
+       .handleOk((products) => this.setState({ products }))
-            const errorContent = await productsResponse.json();
-            notifyError(errorContent);
-        }
-    } catch (error) {
-        notifyError(error);
-    }
+       .handleFailure(({ content }) => notifyError(content));
    
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
                , Strong "only"
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
                , Text " or "
                , InlineCode ".map"
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
                [ Text """In our above, non-Either example, it looks like we also wanted to define
                when a result may be a failure. This can be handled by doing something like:"""
                ]
            , CodeBlock
                { language = "js"
                , code = """
class Either {
    // We've seen this before folks

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
                [ Text "With these pieces in place, we can now diff the simplifications." ]
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
+           })
+       .handleOk((filteredProducts) => { this.setState({ products: filteredProducts }) };))
            """
                }
            ]
        }
    ]
