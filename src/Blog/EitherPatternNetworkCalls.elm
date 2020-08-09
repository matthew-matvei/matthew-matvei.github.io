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
            []
        }
    ]
