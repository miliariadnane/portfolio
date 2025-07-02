---
title: 'Your First MCP Server: Building a Java Conference Tool with Spring AI'
date: '2025-07-02'
tags: ['Spring AI', 'MCP', 'MCP Server', 'Claude Desktop', 'Spring Boot']
draft: false
summary: 'Learn how to build Model Context Protocol (MCP) servers using Spring AI framework. This hands-on guide showcase an MCP server that provides Java conference data as a tool to LLMs '
---

![MCP Spring AI banner](/static/blogs/spring-ai-mcp/spring-ai-mcp-banner.png)

Remember when we talked about [MCP fundamentals](./mcp-explained-as-easy-as-abc.md)? All that theory was nice, but we all know the best way to learn is to actually build something.

That's exactly what we'll do here: build a **JavaConf MCP Server** from scratch. The goal is to give an LLM live access to Java conference markdown data - CFP deadlines, locations, hybrid options and more. We'll build it with Java and Spring, and see how Spring AI makes the MCP part straightforward.

---

## The Big Picture: MCP in Spring AI

Alright, before we get to the code (I know, the fun part), let's quickly go over the architecture. The Spring team did something pretty with their [MCP setup](https://spring.io/blog/2024/12/11/spring-ai-mcp-announcement).

![Spring AI MCP Architecture](/static/blogs/spring-ai-mcp/spring-ai-mcp-architecture.jpg)

Here's what's happening under the hood:

- **Spring AI Application**: Uses Spring AI framework to build Generative AI applications that want to access data through MCP.
- **Spring MCP Clients**: Spring AI implementation of the MCP protocol that maintains 1:1 connections with servers.
- **MCP Servers**: Lightweight programs that each expose specific capabilities through the standardized Model Context Protocol.
- **Local Data Sources**: Your computer's files, databases, and services that MCP servers can securely access.
- **Remote Services**: External systems available over the internet (e.g., through APIs) that MCP servers can connect to.

This architecture supports a wide range of use cases, from simple file system access to complex multi-model AI interactions with database and internet connectivity.

## Project Overview: JavaConf MCP Server

![JavaConf MCP Server](/static/blogs/spring-ai-mcp/javaConf-mcp-server.png)

- 🔄 **Fetches live data** from GitHub's Java conferences repository
- 📊 **Parses markdown tables** to extract structured conference information
- 🛠️ **Exposes MCP tools** that LLMs can invoke to get conference data
- 🎯 **Filters by year** to provide relevant, targeted information

Let's build this step by step!

## Project Structure

```
├── pom.xml  # Project dependencies and build configuration
└── src
    └── main
        ├── java
        │   └── nano
        │       └── dev
        │           └── javaconf
        │               ├── JavaConfMcpServerApplication.java # Main application
        │               ├── config/
        │               │   └── McpToolConfiguration.java     # MCP tool configuration
        │               ├── model/
        │               │   └── ConferenceInfo.java           # Data model for conference info
        │               └── service/
        │                   ├── ConferenceToolService.java    # MCP tool implementation
        │                   ├── GitHubService.java            # Fetches data from GitHub
        │                   └── MarkdownParsingService.java   # Parses markdown content
        └── resources
            ├── application.properties             # Spring and MCP server configuration
```

## Getting Started with Dependencies

First, let's set up our Spring Boot project with the necessary dependencies in our `pom.xml` file:

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-mcp-server-spring-boot-starter</artifactId>
</dependency>
```

Remember to add the Spring Milestones repository:

```xml
<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
    <repository>
        <id>spring-snapshots</id>
        <name>Spring Snapshots</name>
        <url>https://repo.spring.io/snapshot</url>
        <releases>
            <enabled>false</enabled>
        </releases>
    </repository>
        <repository>
        <id>central-portal-snapshots</id>
        <name>Central Portal Snapshots</name>
        <url>https://central.sonatype.com/repository/maven-snapshots/</url>
        <releases>
            <enabled>false</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```

## Configuration

Let's configure our MCP server in `application.properties`:

```12:21:src/main/resources/application.properties
# MCP Server Identification
spring.ai.mcp.server.name=javaConf-mcp-server
spring.ai.mcp.server.version=0.0.1-SNAPSHOT

# Disable the Spring Boot banner when running
spring.main.banner-mode=off

# Tell Spring Boot not to start a web server
spring.main.web-application-type=none
```

The key configuration here is setting `web-application-type=none` because MCP servers typically don't need a web interface - they communicate through the MCP protocol.

## Data Model

Our server pulls the conference data by parsing the `README.md` from the excellent [javaconferences/javaconferences.github.io](https://github.com/javaconferences/javaconferences.github.io) repository on GitHub. The specific URL is configured in `application.properties` and defaults to the main branch, so it's always fetching the latest version.

```12:21:src/main/resources/application.properties
# GitHub URL for the markdown file
github.markdown.url=https://raw.githubusercontent.com/javaconferences/javaconferences.github.io/main/README.md
```

-> Data model representing conference information:

```1:20:src/main/java/nano/dev/javaconf/model/ConferenceInfo.java
package nano.dev.javaconf.model;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
public class ConferenceInfo {
    private int year;
    private String conferenceName;
    private String location;
    private Boolean isHybrid;
    private String cfpStatus;
    private String cfpLink;
    private String link;
    private String country;
}
```

This data model captures all the essential information about Java conferences that LLMs might need.

## Core Services

### GitHub Service

Our `GitHubService` fetches live markdown content from the Java conferences repository:

![GitHubService class code](/static/blogs/spring-ai-mcp/GitHubService.png)

This service provides an abstraction for fetching external data, with error handling and logging.

### Markdown Parsing Service

The `MarkdownParsingService` parses GitHub markdown tables into structured data:

![MarkdownParsingService class code](/static/blogs/spring-ai-mcp/MarkdownParsingService.png)

Key features of our parsing implementation:

- **Uses CommonMark** for robust markdown parsing
- **Supports GitHub Flavored Markdown** tables extension
- **Processes sections by year** (H3 headings like "2024", "2025")
- **Extracts links and metadata** from table cells
- **Handles parsing errors**

## The MCP Tool Implementation

Here's the heart of our MCP server - the tool that LLMs can invoke:

![ConferenceToolService class code](/static/blogs/spring-ai-mcp/ConferenceToolService.png)

**Key Points About MCP Tool:**

1. **`@Tool` Annotation**: This Spring AI annotation automatically registers the method as an MCP tool
2. **Clear Description**: The description helps LLMs understand when to use this tool
3. **Structured Input**: Using a record for the request parameter ensures type safety

**Provided Tool**:

- **Name:** `getJavaConferences`
- **Description:** Get information about Java conferences for a specific year (if specified and found in the source) or the current year by default. Parses data for all years found under H3 headings in the source markdown file.
- **Input Parameter:**
  - `year` (String, Optional): The 4-digit year to retrieve conferences for. If omitted or invalid, defaults to the current year.
- **Output:** A list of JSON objects, each representing a conference with the following fields:
  - `conferenceName` (String)
  - `date` (String)
  - `location` (String)
  - `isHybrid` (Boolean)
  - `cfpLink` (String) - URL for the Call for Papers, if available
  - `cfpDate` (String) - Closing date for CFP, if available
  - `link` (String) - Main conference link
  - `country` (String)

## MCP Configuration

Finally, we need to register our tool service as an MCP callback:

```17:25:src/main/java/nano/dev/javaconf/config/McpToolConfiguration.java
    /**
     * Defines the ConferenceToolService as a ToolCallback bean for the MCP server.
     * Spring AI MCP Server automatically discovers beans of type ToolCallback.
     */
    @Bean
    public List<ToolCallback> javaConferenceTool(ConferenceToolService conferenceToolService) {
        log.debug("Registering ConferenceToolService as ToolCallback bean via McpToolConfiguration.");
        return List.of(ToolCallbacks.from(conferenceToolService));
    }
```

This configuration tells Spring AI MCP to expose our `ConferenceToolService` methods as MCP tools that external clients can discover and invoke.

## Testing Our MCP Server

To test our MCP server, you can:

1. **Build the project** using Maven to generate the MCP server JAR.
2. **Configure Claude Desktop**

this involves editing your `claude_desktop_config.json` to tell it how to run our server.

macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
Windows: %APPDATA%/Claude/claude_desktop_config.json

```json
{
  "mcpServers": {
    "javaConf-mcp-server": {
      "command": "java",
      // "command": "PATH_TO_USER/.sdkman/candidates/java/current/bin/java", /* in my case i'm using the java version installed by sdkman */
      "args": [
        "-jar",
        "PATH_TO_PROJECT/javaConf-mcp-server/target/javaconf-mcp-server-0.0.1-SNAPSHOT.jar"
      ]
    }
  }
}
```

⚠️ Use the full path to your Java project's `javaconf-mcp-server-0.0.1-SNAPSHOT.jar` file.

3.  **Test It Works**

    - **Start Claude Desktop**
    - **Check if the tool is listed** (✅ Success: You should see Claude use the getJavaConferences tool!)
    - **Start a conversation**
      - "What Java conferences are happening in 2024?"
      - "Show me conferences in Europe with open CFPs"
      - "Which Java conferences support hybrid attendance?"

Here's what a real conversation might look like:

![Claude Desktop conversation](/static/blogs/spring-ai-mcp/claude-desktop-conversation.png)

---

## Final words

So there you have it. From a simple idea to a working MCP serve using Spring AI. 
The possibilities are wide open. Now it's your turn to get creative.
Go build something cool!
