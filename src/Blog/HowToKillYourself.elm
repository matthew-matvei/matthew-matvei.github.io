module Blog.HowToKillYourself exposing (getContent)

import Blog.Content exposing (Content(..), ParagraphSegment(..))


getContent : () -> List Content
getContent _ =
    [ Title "How to kill yourself"
    , SubTitle "...with micro services"
    , WhenCreated "November 15 2019"
    , Section
        { title = Nothing
        , content =
            [ Paragraph
                [ Text """If suicide by cop doesn't take your fancy, perhaps you'd like to hear about
            microservices: Distribute Death."""
                , Text """There are many possible advantages in splitting up the old monolith and adopting a micro
            services-based architecture, but there are as many (if not more) pitfalls. Some are transparent, some are
            opaque, some are """
                , Emphasis "business-y"
                , Text """, some are technical, but all can come back to put an end to you (and your cool new micro
        services-based app)."""
                ]
            ]
        }
    , Section
        { title = Just { title = "Jump on the band wagon", subTitle = "Everyone else is doing it" }
        , content =
            [ Paragraph
                [ Text """There have certainly been enough bandwagons already in tech; the Enterprise Service Bus, the
                Cloud, the whole Object-Oriented Programming thing - so it's curious why we haven't gotten better at
                realising that the next thing won't solve all our problems."""
                ]
            , Paragraph
                [ Text """So when you're planning your next to-do list app, you might be thinking ahead to how you'll
                    scale this out to millions, no wait, """
                , Emphasis "trillions"
                , Text """ of users. You'll likely then choose micro services, knowing that they're
        critical in being able to scale to stupid-large volumes of traffic, a la """
                , Link
                    "https://cloud.google.com/blog/products/gcp/bringing-pokemon-go-to-life-on-google-cloud"
                    ("Pok" ++ "é" ++ "mon Go")
                , Text ". And before you know it, you've got a separate "
                , InlineCode "ToDoService"
                , Text ", "
                , InlineCode "ReminderService"
                , Text " and "
                , InlineCode "ToDoRecommendationService"
                , Text """. About a year after you release your product you have earnt yourself a solid 1.5% of the
                market share, with 1000's of people around the country using your app daily."""
                ]
            , Paragraph
                [ Text """And you come to realise you've completely over-engineered your application, because you were
                focused on a conclusion, that everyone and their dog will want to use this app, before you had any data
                to indicate that."""
                ]
            , Paragraph
                [ Text """If you're getting into micro services because you feel it's almost an expectation now then
                you're already in it for the wrong reasons. It's likely you'll be excited about its potential to scale,
                and be forgetting that there's more benefit in its ability to scale """
                , Emphasis "teams"
                , Text ", not just "
                , Emphasis "software"
                , Text """. If you're operating a company that doesn't have enough people to fill those teams, you're
                going to waste all that actual potential."""
                ]
            , Paragraph
                [ Text """You're also less likely to really have your heart set on a micro services-based solution,
                warts and all. More difficult aspects, such as deciding how to deal with cascading failures that can
                negatively impact autonomous teams are likely to get shelved in favour of focusing on potential
                throughput and other prettier things. There are a lot of negatives that you now need to deal with
                because you decided to go micro services that you're only going to do if you """
                , Emphasis "know"
                , Text " that you've chosen it for a clear, demonstrable "
                , Strong "need"
                , Text "."
                ]
            , Paragraph [ Text "If you're not going to deal with that, then keep away." ]
            , Image
                { source = "https://media.giphy.com/media/kmdSKqlSHQJMs/giphy.gif"
                , alt = "danger"
                }
            ]
        }
    , Section
        { title =
            Just
                { title = "Don't worry about what the business needs"
                , subTitle = "They don't even know what an API is"
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Don't invest in your CI / CD strategy"
                , subTitle = "Because Visual Studio comes with Right-Click Publish"
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Deploy more services than people"
                , subTitle = "The only thing better than a micro service is a nano service"
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Don't silo people into teams"
                , subTitle = "Everyone everywhere all the time"
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Leave integration testing for now"
                , subTitle = "You can clearly see that it just works"
                }
        , content = []
        }
    , Section
        { title =
            Just
                { title = "Forget about how users will see this application"
                , subTitle = "Surely the final piece of the puzzle will just fall into place, right?"
                }
        , content = []
        }
    ]
