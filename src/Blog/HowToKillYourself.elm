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
        , content =
            [ Paragraph
                [ Text "If you were deploying a single, large application about once a month, it "
                , Emphasis "may"
                , Text """ be reasonable to retain some manual part of the deployment process. That is,
            while you'll always gain something from automation, you might not gain enough time saved
            to justify the time investing in it."""
                ]
            , Paragraph
                [ Text """With multiple teams deploying smaller increments of work far more frequently,
            however, the penalty you'll have to pay for under-investing in your CI/CD pipeline will
            be higher.""" ]
            , Paragraph
                [ Text """This starts with (at the very least) Pull Requests - or, if you fly by the 
            seat of your pants, pushed changes to master - being picked up and built using your
            build server of choice. Successful builds would then be run through a deployment
            process of some description. Some extra considerations are:""" ]
            , Collection
                [ { title = "Code maintenance"
                  , text = """You likely already have automated tests run as part of your build
                  process, but you could also include non-functional requirements you care strongly
                  enough about. By running code analysis tools, you could fail a build because
                  you've crept over a certain cyclomatic complexity threshold, or fail a build
                  because your dependency analyser has detected a critical defect."""
                  }
                , { title = "Smoke / load tests"
                  , text = """Throughout your deployment process, you can run automated smoke and /
                  or load tests. Smoke tests, which should be comparatively quicker to run, can be
                  used to 'fail fast', after which more extensive load tests can be run. The main
                  difference with these tests is that an environment needs to be deployed first for
                  them to be run against. In the case that these tests fail, the deployment process
                  should fail."""
                  }
                , { title = "Roll-back"
                  , text = """"""
                  }
                ]
            ]
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
        , content =
            [ Paragraph
                [ Text "If you're splitting out into multiple teams because you've identified that a single team has "
                , Link
                    "https://www.theguardian.com/technology/2018/apr/24/the-two-pizza-rule-and-the-secret-of-amazons-success"
                    "exceeded the two pizza rule"
                , Text """, then you've already identified the fact that, at some point, more is less and a team can
                become as bloated as the monolithic application you're trying to carve up. You might notice some
                issues:"""
                ]
            , Collection
                [ { title = "Big teams carry weight"
                  , text = """Much like a big ball of mud, in a large team you may have a great variety of competing
                  ideas, preferences and directions. With a multitude of responsibilities, it can be difficult to
                  optimise a large team on a particular focus."""
                  }
                , { title = "Big teams are noisy"
                  , text = """If you're lucky, you'll work with people who are at least okay to talk to, and
                  communication might seem like a positive. However, if clear communication alone is relied on, you
                  might find that important facts get lost in the onslaught of words and texts."""
                  }
                , { title = "Big teams are dispersed"
                  , text = """With a team too large to fully be on the same page, you may find members who go missing
                  then return with 3 weeks' worth of the wrong code, or others who are never really clear on what the
                  plan or goal is. Such sized teams can also place more pressure on management skills of a senior
                  developer who has likely never received any support in training from the company."""
                  }
                ]
            , Paragraph
                [ Text "If you're following "
                , Link "https://en.wikipedia.org/wiki/Conway%27s_law" "Conway's Law"
                , Text """, you shouldn't just be organising into smaller, cross-functional teams which each aim to
                handle a particular component of the business' needs, you would also be structuring your teams with
                similar communication processes to the micro services you're working on."""
                ]
            , Paragraph
                [ Text "Sure, people aren't code "
                , Emphasis "(at least not yet 😈 )"
                , Text """ and the analogy will always break down after a while, but when you're splitting a large,
                singular team into smaller groups of more highly-focussed teams, aren't you basically implementing the
                'HR' aspect of micro services?"""
                ]
            , Collection
                [ { title = "Autonomy"
                  , text = """A micro service should be able to stand on its own two feet. Aside from the possible
                  cross-cutting concern of authentication, the service should ideally not depend greatly on any other
                  services. Similarly, the teams working on the services should be able to exercise autonomy. Constantly
                  re-sizing, mixing members and re-orienting teams will impede their ability to be independent."""
                  }
                , { title = "Boundaries"
                  , text = """It's still definitely possible to write services that are highly coupled with each other,
                  however the network overhead incurred when crossing a boundary should make it much better defined. In
                  the same way, clear boundaries / responsibilities for a given team makes it manageable in knowing who
                  you need to talk to when you have a question about a given service or who to talk to when some
                  integration fails. It won't be ideal if two services fail to play nicely in production and you're not
                  even sure who in what team last touched that code."""
                  }
                , { title = "Concurrency"
                  , text = """With a single deployment pipeline per service, Service A can be deployed concurrently
                  with Service B, without the two processes interfering with each other. Similarly, if you've achieved
                  autonomous (as much as is practical) teams, then you should be able to get a high amount of
                  concurrency in their work. If you can't, because you find the work of one team frequently blocking
                  another, then you may have drawn your boundaries incorrectly."""
                  }
                , { title = "Focused communication"
                  , text = """Even autonomous teams / services will need to communicate / integrate with each other,
                  and it's okay to do this when achieving a greater goal. The advantage, however, should be analogous
                  to the advantage of an interface. A member of another team doesn't need to delve into the inner
                  workings of your team / codebase, but rather you can focus communication on the points at which your
                  services interact; perhaps a HTTP API or an upstream event message."""
                  }
                ]
            ]
        }
    , Section
        { title =
            Just
                { title = "Leave integration testing for now"
                , subTitle = "You can clearly see that it just works"
                }
        , content =
            [ Image { source = "https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif", alt = "LGTM" }
            , Paragraph
                [ Text """This broaches on similar aspects to investing in your CI/CD pipeline. In fact, your higher-
                level tests (anything testing a service within the context of more than jsut one service) """
                , Emphasis "should"
                , Text " be part of your Continuous Deployment pipeline."
                ]
            , Paragraph
                [ Text """Generally though, you'll likely feel that once you've created a second service that it's still
                too early to start integration testing. Perhaps you're looking at an early UI that interacts with these
                services and would rather wait until it grows in maturity / stability before writing Selenium tests."""
                ]
            , Paragraph
                [ Text """If that's honestly the case, fine, but there are still alternatives in this situation. You
                could at least look at elementary """
                , Link "http://softwaretestingfundamentals.com/smoke-testing/" "smoke tests"
                , Text """, or consider starting non-UI integration tests. Your services should have already been
                designed in such a way that you certainly do not """
                , Emphasis "require"
                , Text """ a graphical UI to interact with them, so there should be no problem writing automated tests
                that simply talk to your HTTP APIs to ensure higher-level system functionality is working."""
                ]
            , Paragraph
                [ Text """Hell, while you're at it, you might even find that there's nothing actually stopping you
                writing conservative (at least at first) """
                , Link "https://loadninja.com/load-testing/" "load tests"
                , Text """. After having implemented some of these alternatives, and once your UI is a little more
                stable, you'll at least have the team-level experience of sticking some form of automated tests within
                the deployment pipeline. You will also, largely by necessity, have broached the conversations that you'll
                need to have, such as team responsibilities over which tests etc."""
                ]
            ]
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
