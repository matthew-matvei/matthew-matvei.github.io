module Blog.LinqPerformanceLessons exposing (getContent)

import Blog.Content exposing (AttributionInfo(..), Content(..), ParagraphSegment(..))
import Date
import Time exposing (Month(..))


getContent : () -> List Content
getContent _ =
    [ Title "Lessons on performance with Linq"
    , SubTitle "... when comparing logically equivalent methods"
    , WhenCreated <| Date.fromCalendarDate 2020 Nov 23
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """I initially started writing benchmarks for LINQ methods during regular pull requests, when
                reviewing others' code. I would often see certain method calls that seemed unnecessary or less than
                optimally efficient, but I wanted to verify my intuitions. Having done so, I can see that there can
                sometimes be some mental gymnastics that goes into concluding whether a query can be optimised. However,
                there are some key takeaways that I'd like to go through. All code involved in the benchmarks referred
                to below can be found in my """
                , ExternalLink
                    "https://github.com/matthew-matvei/ComparableLinqMethodsBenchmark"
                    "ComparableLinqMethodsBenchmark"
                , Text " repository."
                ]
            , Image
                { source = "/assets/img/gotta-go-fast.gif"
                , alt = "Gotta go fast"
                , attribution =
                    ComplexAttribute
                        { text = "Know Your Meme"
                        , link = "https://knowyourmeme.com/memes/gotta-go-fast"
                        }
                }
            , Paragraph
                [ Text """LINQ wasn't built for blistering-fast performance, so why worry about benchmarking various
                LINQ methods? True, LINQ's strength lies in declaratively describing how a lazily-evaluated query over
                some data should be performed, not necessarily in dealing with that data with the fewest allocations or
                iterations. That said, if we're sticking within the confines of LINQ and just comparing
                logically-equivalent methods (i.e., different methods that produce the same results) in a fairly
                declarative way, are there any lessons to be learnt about how to best wield it?"""
                ]
            , Paragraph
                [ Text "Short answer: there are both lessons to learn and some hidden surprises to puzzle over" ]
            ]
        }
    , Section
        { title =
            Just
                { title = "Environmental factors"
                , subTitle = "... set the scene"
                }
        , content =
            [ Paragraph
                [ Text "Below are the relevant specs outputted by "
                , ExternalLink "https://benchmarkdotnet.org/articles/overview.html" "Benchmark Dotnet"
                , Text ", which I used to measure and compare performance by defining benchmarks."
                ]
            , CodeBlock
                { language = "ini"
                , code =
                    """
BenchmarkDotNet=v0.12.1, OS=Windows 10.0.18363.1198 (1909/November2018Update/19H2)
Intel Core i7-9700K CPU 3.60GHz (Coffee Lake), 1 CPU, 8 logical and 8 physical cores
.NET Core SDK=5.0.100
  [Host]     : .NET Core 5.0.0 (CoreCLR 5.0.20.51904, CoreFX 5.0.20.51904), X64 RyuJIT
  DefaultJob : .NET Core 5.0.0 (CoreCLR 5.0.20.51904, CoreFX 5.0.20.51904), X64 RyuJIT

"""
                }
            , Paragraph
                [ Text """Obviously mileage can vary depending on your operating system and target runtime, but I would
            hazard a guess that .NET 5 running on Windows will be a fairly common combination of factors once
            adoption of .NET 5 becomes more prevalent. If you found some interesting results, particularly those that
            contradict mine, using a different setup, reach out at """
                , Emphasis "matthew"
                , Strong "(dot)"
                , Emphasis "d"
                , Strong "(dot)"
                , Emphasis "james"
                , Strong "87"
                , Text " at "
                , Emphasis "gmail.com"
                , Text "."
                ]
            , Paragraph
                [ Text """Overall, though, this isn't about raw, absolute metrics, but rather about seeing relative
                differences within the same operating environment and making decisions based on that. I'm hoping you
                can steer away certain LINQ practices and towards others at the end of it. I should also point out that
                generally the worst-case scenario is used: for example, when searching for an element in a list, to
                show the full weight of a """
                , InlineCode "O(n)"
                , Text """ operation, the element is appended when defining the source data structure (this order may
                not be preserved when creating a dictionary from the elements)."""
                ]
            ]
        }
    , Divider
    , Section
        { title =
            Just
                { title = "Lessons I learnt"
                , subTitle = "... the not-so-surprising"
                }
        , content =
            [ Heading "The Baseline"
            , Paragraph
                [ Text """Initially, I simply wanted to understand the differences in the same general, simple mapping
                operation. This would give me an idea of how the underlying enumerable data structure can be iterated
                through. In most benchmarks each enumerable data source has a size of """
                , InlineCode "200"
                , Text " or "
                , InlineCode "201"
                , Text ", but to heighten the differences here I upped the anti to "
                , InlineCode "200,000"
                , Text ". In the class "
                , InlineCode "BaselineSelect"
                , Text " all that is done is a simple mapping using "
                , InlineCode ".Select"
                , Text " and the enumerable that's produced is consumed using a "
                , InlineCode "Consumer"
                , Text " from Benchmark Dotnet"
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Baseline (T[])", "8.597 ms", "0.1263 ms", "0.1119 ms" ]
                    , [ "Baseline (List<T>)", "9.402 ms", "0.0857 ms", "0.0801 ms" ]
                    , [ "Baseline (Collection<T>)", "9.258 ms", "0.0871 ms", "0.0815 ms" ]
                    , [ "Baseline (HashSet<T>)", "9.928 ms", "0.0916 ms", "0.0856 ms" ]
                    , [ "Baseline (Dictionary<T1, T2>)", "11.066 ms", "0.0634 ms", "0.0562 ms" ]
                    ]
                }
            , Paragraph
                [ Text "As you can see, "
                , InlineCode "T[]"
                , Text " and "
                , InlineCode "Dictionary<T1, T2>"
                , Text """ stand out for being noticeably better and worse respectively. This helps establish some
                baseline expectations about iterating through these data structures. Any call to iterate through a """
                , InlineCode "T[]"
                , Text " will be significantly faster than "
                , InlineCode "Dictionary<T1, T2>"
                , Text """ since in the latter case a lot of translation from the dictionary structure to something
                resembling an """
                , InlineCode "IEnumerable<KeyValuePair<T1, T2>>"
                , Text " needs to occur."
                ]
            ]
        }
    ]
