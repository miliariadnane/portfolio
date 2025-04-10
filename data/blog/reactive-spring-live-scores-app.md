---
title: 'Reactive Programming with Reactive Spring: Building a Live Football Scores App'
date: '2024-12-18'
tags: ['Spring Boot', 'Reactive Programming', 'WebFlux', 'Reactor']
draft: false
summary: ''
---

> Real-time applications are becoming increasingly demanding of modern systems, especially in event-driven architectures 
where instant updates and responsive experiences are crucial. In this blog post, we'll cover the key concepts 
of reactive programming and how they can be applied real-world application showcasing a real-time live football scores app using Spring Boot and WebFlux.
---

## Understanding Reactive Programming Paradigm

**Reactive programming** is everywhere in our daily lives. Think of tracking a flight's position - the road map updates continuously as the plane moves across the airspace. Or checking your bank account after shopping - your balance updates instantly with each purchase, and connected savings accounts adjust automatically. These real-world examples show how modern applications handle data flows and updates reactively, making systems more responsive.

### What Makes it "Reactive"?

Think of reactive programming like following your favorite sports team:

1. **It's Event-Driven**
  - You don't keep asking "did something happen?"
  - Instead, updates come to you when they happen -> Like getting notifications when your team scores

2. **It's Non-Blocking**
  - Your app stays responsive while waiting for data (No frozen screens or loading spinners)
  - Like checking other league matches while waiting for your favorite team score updates

3. **It Handles Backpressure**
  - Prevents overload when there's too much happening

4. **It's Message-Based**
  - Data flows through the system like messages
  - Each part handles what it needs to

### The Building Blocks

Reactive systems have four main parts:
- `Publishers`: They send out data (like score updates)
- `Subscribers`: They receive data (like fans watching scores)
- `Subscriptions`: They connect publishers and subscribers
- `Processors`: They can change data as it flows through

![building blocks](/static/blogs/reactive-sb/building-blocks.png)

### The Building Blocks in Action

Let's see these concepts in action with some practical general examples:

#### 1. Publisher

A Publisher sends out data streams. In reactive programming, it offers several methods:

![publisher](/static/blogs/reactive-sb/publisher.png)

#### 2. Subscriber

Subscriber consumes data and handles different stream events:

![subscriber](/static/blogs/reactive-sb/subscriber.png)

#### 3. Subscription

Subscription controls the flow between publishers and subscribers:

![subscription](/static/blogs/reactive-sb/subscription.png)

#### 4. Processor

Processor transforms data as it flows through:

![processor](/static/blogs/reactive-sb/processor.png)

## Reactive Programming in Spring Ecosystem

Now that we understand reactive programming basics, let's see how Spring implements these concepts. Spring's reactive stack introduces two essential frameworks: Spring WebFlux and Project Reactor.

### Spring WebFlux

- Spring WebFlux is a reactive web framework that provides an alternative to spring MVC for building a non-blocking, asynchronous, and event-driven APIs for web
  applications.
- It's built on the top of Reactor library that handles concurrency with small number of threads and scales well with fewer hardware resources.

### Reactor Project

Project Reactor is the engine powering Spring's reactive features, designed and developed to facilitate reactive programming by building on the reactive streams specification that was introduced in Java 9.
It gives us two main tools:

1. **Flux** - For handling multiple values
  - It's a publisher that emits 0 to N items and completes or errors
  - Recommended choice for handling multiple values
  - Like getting a stream of match updates

2. **Mono** - For handling single values
  - Specialized publisher that deals with 0 or 1 item
  - Recommended for single-response operations
  - Like getting details of one specific match

## Building a Real-Time Live Score Match App

### Project Overview

- The goal from this project is to build a reactive application that fetches live football match data from an external API ([RapidAPI Football](https://rapidapi.com/api-sports/api/api-football)) and streams it to clients in real-time.
- We'll use Spring Boot for our backend, WebFlux for handling reactive streams, and Hilla vaadin project to bridge our backend with react typescript frontend.

### Source code and application preview

Check out the complete source code on GitHub:
[Live Score App Repository](https://github.com/miliariadnane/live-score-reactive-spring-boot)

Let's take a look at what you'll get running:

- Browse through football leagues worldwide
![building blocks](/static/blogs/reactive-sb/league-list.jpeg)

- Track live matches with real-time score updates
![Live Matches](/static/blogs/reactive-spring/match-list.jpeg)

Now, let's dive into how we built this.

### Setting Up the Project

The project follows the standard Spring Boot project structure, with the following key components:

```text
src/
├── main/
│   ├── java/
│   │   └── dev/
│   │       └── nano/
│   │           └── livescore/
│   │               ├── LiveScoreService.java
│   │               ├── FootballApiService.java
│   │               ├── LiveScoreEndpoint.java
│   │               └── model/
│   │                   ├── Match.java
│   │                   └── dto/
│   │                       └── ApiResponse.java
│   └── frontend/
│       └── components/
│           ├── league/
│           │   └── LeagueList.tsx
│           └── match/
│               └── MatchDetails.tsx
└── test/
```

### Domain Model

The domain model consists of two main entities: `Match` and `League`, then there's two DTOs for the API response:
`ApiResponse` for match data and `LeagueApiResponse`.` for league data.

```java
@Data
public class Match {
    @Id
    private Long id;

    // Fixture
    private String referee;
    private String timezone;
    private LocalDateTime date;
    private Long timestamp;

    // Venue
    private Integer venueId;
    private String venueName;
    private String venueCity;

    // Status
    private String statusLong;
    private String statusShort;
    private Integer elapsed;

    // League
    private Integer leagueId;
    private String leagueName;
    private String country;
    private String leagueLogo;
    private String leagueFlag;
    private Integer season;
    private String round;

    // Home team
    private Integer homeTeamId;
    private String homeTeam;
    private String homeLogo;
    private Boolean homeWinner;

    // Away team
    private Integer awayTeamId;
    private String awayTeam;
    private String awayLogo;
    private Boolean awayWinner;
  
   // ... other attributes
}
```

```java 
@Data
public class League {
    @Id
    private Long id;
    private String name;
    private String type;
    private String logo;
    private String countryName;
    private String countryCode;
    private String countryFlag;
    private String season;
}
```

### WebClient Configuration for External API : RapidAPI Football

The RapidAPI Football API provides comprehensive football data including live scores, fixtures, and detailed match statistics. 

```java
@Configuration
@Slf4j
public class WebClientConfig {

  @Value("${football-api.base-url}")
  private String baseUrl;

  @Value("${football-api.api-key}")
  private String apiKey;

  @Value("${football-api.host}")
  private String host;

  @Bean
  public WebClient footballApiClient() {

    return WebClient.builder()
            .baseUrl(baseUrl)
            .defaultHeader("X-RapidAPI-Key", apiKey)
            .defaultHeader("X-RapidAPI-Host", host)
            .codecs(configurer -> configurer
                    .defaultCodecs()
                    .maxInMemorySize(16 * 1024 * 1024)) // Set buffer size to 16MB
            .filter((request, next) -> {
              log.debug("Making request to: {}", request.url());
              log.debug("Headers: {}", request.headers());
              return next.exchange(request);
            })
            .build();
  }
}
```

- The value annotation used to inject the base URL, API key, and host from the application.yml file.

### Service Layer

The heart of our application is the `FootballApiService`, which fetches live football match data from **https://api-football-v1.p.rapidapi.com/v3**. 
It uses the `WebClient` to make non-blocking HTTP requests to make HTTP requests and processes the response using the `Flux` and `Mono` types depending on the number of items expected in the response.

```java
@Service
@RequiredArgsConstructor
public class FootballApiService {

    private final WebClient webClient;

    public Flux<Match> getLiveScores() {
        return webClient.get()
                .uri("/fixtures?live=all")
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .flatMapMany(apiResponse -> Flux.fromIterable(apiResponse.getResponse()))
                .map(this::convertToMatch);
    }

    public Mono<Match> getMatchDetails(Long matchId) {
        return webClient.get()
                .uri("/fixtures?id=" + matchId)
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .flatMap(apiResponse -> Mono.justOrEmpty(apiResponse.getResponse().stream().findFirst()))
                .map(this::convertToMatch);
    }

    // ... other methods
}
```

The `FootballApiService` has method that allows to map ApiResponse to Match and League objects:

```java
@Service
@RequiredArgsConstructor
public class FootballApiService {

    // existing code
  
    // example of mapping ApiResponse to Match object
    private League convertToLeague(LeagueApiResponse.LeagueResponse leagueResponse) {
      League league = new League();
      league.setId(leagueResponse.getLeague().getId());
      league.setName(leagueResponse.getLeague().getName());
      league.setType(leagueResponse.getLeague().getType());
      league.setLogo(leagueResponse.getLeague().getLogo());
      league.setCountryName(leagueResponse.getCountry().getName());
      league.setCountryCode(leagueResponse.getCountry().getCode());
      league.setCountryFlag(leagueResponse.getCountry().getFlag());

      if (!leagueResponse.getSeasons().isEmpty()) {
        league.setSeason(leagueResponse.getSeasons().get(0).toString());
      }

      return league;
    }
}
```  

To expose the service methods to the frontend, we'll create a `LiveScoreEndpoint` class that handles HTTP requests and
delegates to the `FootballApiService`, we use Hilla's @Endpoint annotation:

```java
@Endpoint
@AnonymousAllowed
public class LiveScoreEndpoint {

    private final LiveScoreService liveScoreService;

    public @Nonnull Mono<Match> getMatchDetails(Long matchId) {
        return liveScoreService.getMatchDetails(matchId);
    }

    public @Nonnull Flux<Match> getLiveScores(String league) {
        return liveScoreService.getLiveScoresByLeague(league);
    }

    // ... other methods
}
```

### Running the Application

Before starting:
1. Get your API key from [RapidAPI Football](https://rapidapi.com/api-sports/api/api-football)
2. Update `application.yaml` with your RapidAPI credentials

Since we're using Hilla, running the application is straightforward:
```bash
mvn spring-boot:run
```

This single command starts both backend and frontend servers.

That's it folks! If you've any remark or suggestion, leave it in the comment below or fill a Github issue.


