module Blog.LinqPerformanceLessons exposing (getContent)

import Blog.Content exposing (AttributionInfo(..), Content(..), ParagraphSegment(..))
import Component.Table.Caption as TableCaption
import Date
import Html exposing (text)
import Time exposing (Month(..))


getContent : () -> List Content
getContent _ =
    [ Title "Lessons on performance with LINQ"
    , SubTitle "... when comparing logically equivalent methods"
    , WhenCreated <| Date.fromCalendarDate 2020 Dec 7
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
                [ Text """LINQ may not have been built for blistering-fast performance, so why worry about benchmarking various
                LINQ methods? True, its strength lies in declaratively describing how a lazily-evaluated query over
                some data should be performed, not necessarily in dealing with that data with the fewest allocations or
                iterations. That said, if we're sticking within the confines of LINQ and just comparing
                logically-equivalent methods (i.e., different methods that produce the same results) in a fairly
                declarative way, are there any lessons to be learnt about how to best wield it?"""
                ]
            , BlockQuote "Short answer: there are both lessons to learn and some hidden surprises to puzzle over"
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
                [ Text "Below are the relevant specs for my machine outputted by "
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
                , [ Text "matthew" ] |> Emphasised
                , [ Text "(dot)" ] |> Strong
                , [ Text "d" ] |> Emphasised
                , [ Text "(dot)" ] |> Strong
                , [ Text "james" ] |> Emphasised
                , [ Text "87" ] |> Strong
                , Text " at "
                , [ Text "gmail.com" ] |> Emphasised
                , Text "."
                ]
            , Paragraph
                [ Text """Overall, though, this isn't about raw, absolute metrics, but rather about seeing relative
                differences within the same operating environment and making decisions based on that. I'm hoping you
                can steer away from certain LINQ practices and towards others at the end of it. I should also point out that
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
            [ Image
                { source = "https://media.giphy.com/media/Jrq94lNNcguM8/giphy.gif"
                , alt = "O RLY? Let me write that down GIF"
                , attribution =
                    ComplexAttribute
                        { text = "Giphy.com"
                        , link = "https://giphy.com/"
                        }
                }
            , Heading "The Baseline"
            , Paragraph
                [ Text """Initially, I simply wanted to understand the differences in the same general, simple mapping
                operation. This would give me an idea of how the underlying enumerable data structures can be iterated
                through. In most benchmarks each enumerable data source has a size of """
                , InlineCode "200"
                , Text " or "
                , InlineCode "201"
                , Text ", but to heighten the differences here I upped the anti to "
                , InlineCode "200,000"
                , Text ". In the class "
                , InlineCode "BaselineSelect"
                , Text ", all that is done is a simple mapping using "
                , InlineCode "Select"
                , Text " and the enumerable that's produced is consumed using a "
                , InlineCode "Consumer"
                , Text " from Benchmark Dotnet."
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
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "BaselineSelect"
                        , TableCaption.Emphasis " (200,000 items)"
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
            , Heading "Dictionary.Values"
            , Paragraph
                [ Text "In fact, "
                , InlineCode "Dictionary<T1, T2>"
                , Text " (or "
                , InlineCode "Dictionary<TKey, TValue>"
                , Text """) comes with such high penalties for iterating through it, that I wanted to see whether
                iterating instead through a dictionary's """
                , InlineCode "Values"
                , Text ", which is a "
                , InlineCode "ValueCollection"
                , Text ", would yield better results. When iterating this, only "
                , InlineCode "TValue"
                , Text "s are yielded. This removes the overhead of needing to construct "
                , InlineCode "KeyValuePair<TKey, TValue>"
                , Text "s. Below, I compare mapping through the dictionary itself vs mapping its "
                , InlineCode "Values"
                , Text ". Again, this is using a higher than usual count of data, "
                , InlineCode "200,000"
                , Text ", to heighten the differences."
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Values.Select(pred)", "9.601 ms", "0.0232 ms", "0.0217 ms" ]
                    , [ "Select(pred)", "11.118 ms", "0.0729 ms", "0.0646 ms" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "DictionaryValuesSelectVsDictionarySelect"
                        , TableCaption.Emphasis " (200,000 items)"
                        ]
                }
            , Paragraph
                [ Text "Likewise, "
                , InlineCode "First"
                , Text ", which again incurs translation when iterating through the dictionary to "
                , InlineCode "KeyValuePair<TKey, TValue>"
                , Text "s, can benefit from grabbing the "
                , InlineCode "Values"
                , Text ". Note the below values are from querying over data with a count of just "
                , InlineCode "201"
                , Text "."
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Values.First(pred)", "1.963 us", "0.0089 us", "0.0079 us" ]
                    , [ "First(pred).Value", "3.244 us", "0.0123 us", "0.0115 us" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "DictionaryValuesFirstVsDictionaryFirstValue"
                        , TableCaption.Emphasis " (201 items)"
                        ]
                }
            , Paragraph
                [ Text "Working with a dictionary, "
                , InlineCode "First(pred)"
                , Text """ won't be the most efficient way to grab an element. Generally you should be able to access
                that element by some hashable index that you've chosen (might be a """
                , InlineCode "Guid"
                , Text " id, for example), to get the "
                , InlineCode "O(1)"
                , Text """ constant complexity performance. If, however, for whatever reason you need to get the first
                element in a dictionary where you can't get the element by its hashed index, then it may be worth
                grabbing the """
                , InlineCode "Values"
                , Text " collection."
                ]
            , Heading "Order Matters"
            , Paragraph
                [ Text """If you were hoping that you could enjoy the same query optimisation techniques you can get
                with SQL, it's important to confirm that order does indeed matter. The delegates that you pass LINQ
                methods """
                , [ Text "can" ] |> Emphasised
                , Text """ have side effects, so they need to be executed in the order they're defined. I've used a
                simple filter -> map to compare the results."""
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Select -> Where (T[])", "8.656 μs", "0.0091 μs", "0.0076 μs" ]
                    , [ "Where -> Select (T[])", "2.582 μs", "0.0106 μs", "0.0088 μs" ]
                    , [ "Select -> Where (List<T>)", "9.217 μs", "0.0247 μs", "0.0231 μs" ]
                    , [ "Where -> Select (List<T>)", "3.381 μs", "0.0325 μs", "0.0288 μs" ]
                    , [ "Select -> Where (Collection<T>)", "9.892 μs", "0.0163 μs", "0.0145 μs" ]
                    , [ "Where -> Select (Collection<T>)", "4.069 μs", "0.0048 μs", "0.0040 μs" ]
                    , [ "Select -> Where (HashSet<T>)", "9.646 μs", "0.0095 μs", "0.0084 μs" ]
                    , [ "Where -> Select (HashSet<T>)", "3.985 μs", "0.0047 μs", "0.0042 μs" ]
                    , [ "Select -> Where (Dictionary<T>)", "11.338 μs", "0.0103 μs", "0.0086 μs" ]
                    , [ "Where -> Select (Dictionary<T>)", "4.917 μs", "0.0111 μs", "0.0104 μs" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "SelectWhereVsWhereSelect"
                        , TableCaption.Emphasis " (200 items)"
                        ]
                }
            , Paragraph
                [ Text """Perhaps it's just me, but when combining deduplication and filtering, it felt like
                deduplication should come first. My intuition (which was wrong...), made me feel that filtering over
                the reduced subset of elements post-deduplication would be the better option. I confirmed just how
                wrong I was by comparing the two possible orders."""
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Where -> Distinct (T[])", "2.533 μs", "0.0038 μs", "0.0032 μs" ]
                    , [ "Distinct -> Where (T[])", "8.346 μs", "0.0135 μs", "0.0113 μs" ]
                    , [ "Where -> Distinct (List<T>)", "3.276 μs", "0.0023 μs", "0.0021 μs" ]
                    , [ "Distinct -> Where (List<T>)", "8.734 μs", "0.0090 μs", "0.0080 μs" ]
                    , [ "Where -> Distinct (Collection<T>)", "3.959 μs", "0.0041 μs", "0.0039 μs" ]
                    , [ "Distinct -> Where (Collection<T>)", "8.725 μs", "0.0144 μs", "0.0127 μs" ]
                    , [ "Where -> Distinct (HashSet<T>)", "3.886 μs", "0.0043 μs", "0.0041 μs" ]
                    , [ "Distinct -> Where (HashSet<T>)", "8.828 μs", "0.0070 μs", "0.0058 μs" ]
                    , [ "Where -> Distinct (Dictionary<T>)", "5.829 μs", "0.0070 μs", "0.0066 μs" ]
                    , [ "Distinct -> Where (Dictionary<T>)", "11.460 μs", "0.0145 μs", "0.0129 μs" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "WhereDistinctVsDistinctWhere"
                        , TableCaption.Emphasis " (200 items)"
                        ]
                }
            , Paragraph
                [ Text "You can see that "
                , InlineCode "Distinct"
                , Text """ is a pretty expensive operation. I was interested to see how expensive it was based on how
                many unique elements (i.e., unique according to whatever implementation of """
                , InlineCode "IEqualityComparer<T>"
                , Text " you gave it) there are in the enumerable. To simplify the comparison, I stuck just to "
                , InlineCode "T[]"
                , Text " and modified how many unique elements there are in a collection of "
                , InlineCode "200"
                , Text "."
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Where -> Distinct (10 distinct elems)", "6.168 μs", "0.0979 μs", "0.0916 μs" ]
                    , [ "Distinct -> Where (10 distinct elems)", "8.770 μs", "0.1653 μs", "0.1837 μs" ]
                    , [ "Where -> Distinct (50 distinct elems)", "5.565 μs", "0.0576 μs", "0.0539 μs" ]
                    , [ "Distinct -> Where (50 distinct elems)", "10.088 μs", "0.1474 μs", "0.1379 μs" ]
                    , [ "Where -> Distinct (100 distinct elems)", "5.511 μs", "0.0502 μs", "0.0469 μs" ]
                    , [ "Distinct -> Where (100 distinct elems)", "10.050 μs", "0.1769 μs", "0.1655 μs" ]
                    , [ "Where -> Distinct (150 distinct elems)", "6.570 μs", "0.0385 μs", "0.0341 μs" ]
                    , [ "Distinct -> Where (150 distinct elems)", "10.633 μs", "0.1500 μs", "0.1403 μs" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "WhereDistinctVsDistinctWhere_DifferingLevelsOfDistinctness"
                        , TableCaption.Emphasis " (200 items)"
                        ]
                }
            , Heading "Redundancy Matters ... sometimes"
            , Paragraph
                [ Text "That lack of magical optimisation extends to chained "
                , InlineCode "Where"
                , Text """ calls. Iteration through the resulting enumerable will happen as many times as you have calls
                to """
                , InlineCode "Where"
                , Text """. This is somewhat unfortunate, since it can be tempting, depending on your style, to write 
                filters that should happen in series like """
                , InlineCode "myNumbers.Where(IsEven).Where(IsNegative)"
                , Text ". It would be nice if the provided delegates could be composed when combining "
                , [ Text "where" ] |> Emphasised
                , Text " iterators, so that "
                , InlineCode "myNumbers"
                , Text """ in the example above would only need to be iterated over once. Without this black magic, you
                may want to think of composing the """
                , InlineCode "IsEven"
                , Text " and "
                , InlineCode "IsNegative"
                , Text " methods yourself, if appropriate. As it were, the differences in performance are:"
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Where -> Where (T[])", "807.9 ns", "1.28 ns", "1.19 ns" ]
                    , [ "Where (T[])", "433.3 ns", "1.04 ns", "0.92 ns" ]
                    , [ "Where -> Where (List<T>)", "1,576.7 ns", "10.42 ns", "9.75 ns" ]
                    , [ "Where (List<T>)", "1,198.0 ns", "2.25 ns", "1.88 ns" ]
                    , [ "Where -> Where (Collection<T>)", "2,210.4 ns", "5.40 ns", "5.06 ns" ]
                    , [ "Where (Collection<T>)", "1,917.4 ns", "18.65 ns", "16.53 ns" ]
                    , [ "Where -> Where (HashSet<T>)", "2,319.5 ns", "10.45 ns", "9.77 ns" ]
                    , [ "Where (HashSet<T>)", "1,901.3 ns", "6.11 ns", "5.71 ns" ]
                    , [ "Where -> Where (Dictionary<T1, T2>)", "4,122.7 ns", "12.19 ns", "10.18 ns" ]
                    , [ "Where (Dictionary<T1, T2>)", "3,925.7 ns", "7.04 ns", "6.25 ns" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "WhereWhereVsWhere"
                        , TableCaption.Emphasis " (201 items)"
                        ]
                }
            , Paragraph
                [ Text """Looking at these numbers, you might be forgiven (i.e., I might be forgiven 😉) for believing
                that the same penalisation would apply to chaining """
                , InlineCode "Select"
                , Text " calls. The following, however, shows that this is not the case:"
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Select -> Select (T[])", "20.68 ms", "0.176 ms", "0.165 ms" ]
                    , [ "Select (T[])", "20.75 ms", "0.171 ms", "0.160 ms" ]
                    , [ "Select -> Select (List<T>)", "21.38 ms", "0.252 ms", "0.236 ms" ]
                    , [ "Select (List<T>)", "21.19 ms", "0.148 ms", "0.138 ms" ]
                    , [ "Select -> Select (Collection<T>)", "21.31 ms", "0.116 ms", "0.097 ms" ]
                    , [ "Select (Collection<T>)", "21.49 ms", "0.215 ms", "0.201 ms" ]
                    , [ "Select -> Select (HashSet<T>)", "21.65 ms", "0.156 ms", "0.146 ms" ]
                    , [ "Select (HashSet<T>)", "21.46 ms", "0.145 ms", "0.135 ms" ]
                    , [ "Select -> Select (Dictionary<T>)", "23.52 ms", "0.271 ms", "0.253 ms" ]
                    , [ "Select (Dictionary<T>)", "23.75 ms", "0.184 ms", "0.163 ms" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "SelectSelectVsSelect"
                        , TableCaption.Emphasis " (200,000 items)"
                        ]
                }
            ]
        }
    , Section
        { title =
            Just
                { title = "Surprises I found"
                , subTitle = "... the head-scratchers"
                }
        , content =
            [ Image
                { source = "https://media.giphy.com/media/1oJLpejP9jEvWQlZj4/giphy.gif"
                , alt = "Visible confusion GIF"
                , attribution =
                    ComplexAttribute
                        { text = "Giphy.com"
                        , link = "https://giphy.com"
                        }
                }
            , Paragraph
                [ Text """A lot of the benchmarks I wrote confirmed hunches and helped clarify the severity of the
                differences in performance between equivalent methods. Some routine ones, however, exposed some pretty
                interesting surprises."""
                ]
            , Heading "When double-enumeration doesn't matter"
            , Paragraph
                [ Text "Have a look at the following where I compare "
                , InlineCode "Select(delegate).Contains"
                , Text " with "
                , InlineCode "Any"
                , Text ":"
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Select -> Contains (T[])", "1.246 μs", "0.0020 μs", "0.0017 μs" ]
                    , [ "Any (T[])", "1.223 μs", "0.0027 μs", "0.0025 μs" ]
                    , [ "Select -> Contains (List<T>)", "1.873 μs", "0.0056 μs", "0.0052 μs" ]
                    , [ "Any (List<T>)", "1.923 μs", "0.0118 μs", "0.0111 μs" ]
                    , [ "Select -> Contains (Collection<T>)", "1.813 μs", "0.0163 μs", "0.0145 μs" ]
                    , [ "Any (Collection<T>)", "1.227 μs", "0.0035 μs", "0.0032 μs" ]
                    , [ "Select -> Contains (HashSet<T>)", "2.576 μs", "0.0075 μs", "0.0070 μs" ]
                    , [ "Any (HashSet<T>)", "1.850 μs", "0.0025 μs", "0.0021 μs" ]
                    , [ "Select -> Contains (Dictionary<T1, T2>)", "3.739 μs", "0.0045 μs", "0.0042 μs" ]
                    , [ "Any (Dictionary<T1, T2>)", "3.155 μs", "0.0075 μs", "0.0066 μs" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "SelectContainsVsAnyBenchmark"
                        , TableCaption.Emphasis " (201 items)"
                        ]
                }
            , Paragraph
                [ Text "Since the "
                , InlineCode "Select(delegate).Contains"
                , Text """ incurs a double enumeration of the iterable source, my intuition would tell me that it will
                always be slower than """
                , InlineCode "Any"
                , Text """, which only requires a single enumeration. As we saw before when establishing the baseline
                and examining chained """
                , InlineCode "Where"
                , Text """ calls, there's always a price to be paid for the enumeration through the enumerable data
                structure. And this is generally the case above, except curiously enough for """
                , InlineCode "T[]"
                , Text " and "
                , InlineCode "List<T>"
                , Text " where here the difference between the two methods is negligible. Yet even a "
                , InlineCode "Collection<T>"
                , Text " shows a marked improvement when choosing "
                , InlineCode "Any"
                , Text "."
                ]
            , Paragraph
                [ Text """There's no punchline here. I'm actually at a loss to explain it, since it seems as though the
                time taken for """
                , InlineCode "T[]"
                , Text " and "
                , InlineCode "List<T>"
                , Text """ is just exempt from the rules. The results are relatively the same when I bump the count of
                the data source up to """
                , InlineCode "200,000"
                , Text "."
                ]
            , Heading "Filtering vs finding"
            , Paragraph
                [ Text "The biggest surprise for me though comes when comparing "
                , InlineCode "Where(predicate).FirstOrDefault"
                , Text " against "
                , InlineCode "FirstOrDefault(predicate)"
                , Text """. Again, the intuition that the former incurs double-enumeration and thus it must be worse
                actually doesn't hold up here."""
                ]
            , Table
                { header = [ "Method", "Mean", "Error", "Std Dev" ]
                , rows =
                    [ [ "Where -> First or Default (T[])", "688.8 ns", "1.07 ns", "0.89 ns" ]
                    , [ "First or Default (T[])", "1,282.1 ns", "2.76 ns", "2.45 ns" ]
                    , [ "Where -> First or Default (List<T>)", "1,391.0 ns", "2.78 ns", "2.60 ns" ]
                    , [ "First or Default (List<T>)", "2,041.6 ns", "4.65 ns", "4.35 ns" ]
                    , [ "Where -> First or Default (Collection<T>)", "1,808.3 ns", "4.97 ns", "4.64 ns" ]
                    , [ "First or Default (Collection<T>)", "2,004.6 ns", "23.88 ns", "21.17 ns" ]
                    , [ "Where -> First or Default (HashSet<T>)", "2,031.0 ns", "4.93 ns", "4.61 ns" ]
                    , [ "First or Default (HashSet<T>)", "1,979.5 ns", "3.38 ns", "3.00 ns" ]
                    , [ "Where -> First or Default (Dictionary<T1, T2>)", "3,253.9 ns", "4.31 ns", "3.82 ns" ]
                    , [ "First or Default (Dictionary<T1, T2>)", "3,122.0 ns", "8.47 ns", "7.93 ns" ]
                    ]
                , caption =
                    Just
                        [ TableCaption.Text "Results of "
                        , TableCaption.InlineCode "WhereThenFirstOrDefaultVsFirstOrDefault"
                        , TableCaption.Emphasis " (201 items)"
                        ]
                }
            , Paragraph
                [ InlineCode "T[]"
                , Text " and "
                , InlineCode "List<T>"
                , Text " show a significant improvement when doing "
                , InlineCode "Where(predicate).FirstOrDefault"
                , Text " over simply finding the first thing using "
                , InlineCode "FirstOrDefault(predicate)"
                , Text "."
                ]
            , Paragraph
                [ Text "The trick here is that the implementation of "
                , InlineCode "Where"
                , Text " creates special iterators for "
                , InlineCode "T[]"
                , Text " and "
                , InlineCode "List<T>"
                , Text " that appear to make use of those types, whereas "
                , InlineCode "FirstOrDefault"
                , Text " and, it appears, "
                , InlineCode "First"
                , Text " do not. "
                , ExternalLink "https://github.com/dotnet/runtime/issues/19382" "This GitHub issue"
                , Text " raises this problem, and there should be a fix for this inconsistency on the horizon."
                ]
            ]
        }
    , Divider
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """As mentioned, LINQ isn't going to be your choice if you're looking for high-performing code.
                It can, however, be a great tool in writing concise, declarative code, particularly if you're leaning
                towards Functional Programming. This alone can lower the cost in maintaining current code and delivering
                additional functionality. When it comes to choosing not """
                , [ Text "whether" ] |> Emphasised
                , Text ", but "
                , [ Text "how" ] |> Emphasised
                , Text " you use LINQ, some key takeaways are:"
                ]
            , Collection
                [ { title = "Avoid iterating through a dictionary where possible"
                  , text = """A dictionary is great for retrieving items by a known index. They're less great for
                  simply iterating through them, item by item. If you do need to do this, consider iterating through the
                  dictionary's 'Values' property instead. This doesn't greatly impact the clarity of the code, but it
                  does positively affect performance."""
                  }
                , { title = "Order and invokation count matters"
                  , text = """Whilst it may sometimes appear more concise to layout your query with multiple chained
                  'Where' filters, you may also be paying for redundant enumerations. Instead consider composing
                  multiple predicates, even if just to a local helper function / method, that is then used when
                  iterating once."""
                  }
                , { title = "Consider 'Where(predicate).First' instead of 'First(predicate)', but don't rely on it"
                  , text = """Currently, there are proven performance gains in favouring 'Where(predicate).First' over
                  'First(predicate)' (and similarly for 'FirstOrDefault(predicate)'), and it's still relatively concise
                  language for the query. That said, this is relying on a particular hitch in the implementation detail,
                  and there's no promise that you'll continue to have this performance benefit in future, altering the
                  cost / benefit ratio."""
                  }
                ]
            , Paragraph
                [ Text """As always, don't just take my word for it - if you're concerned about performance of your
                code, always look to prove the benefits of alternatives with benchmarking."""
                ]
            ]
        }
    ]
