---
title: 'Leading Java AI Frameworks: LangChain4j vs Spring AI for Custom Chatbots 🥊'
date: '2024-10-07'
tags: ['LLMs', 'RAG', 'LangChain4j', 'Spring AI']
draft: false
summary: 'Compare Langchain4j and Spring AI for building Java/RAG applications. Discover their key features and capabilities, see RAG implementation examples, and explore real-world projects. Find out which framework best fits your Java AI development needs.'
---

> In our previous blogs, we discovered the core concepts of LLMs and RAG, also exploring the RAG process under the hood. During this blog, we're diving into the exciting world of AI frameworks for Java. If you've been scratching your head trying to figure out which framework to use for your next AI project, you're in the right place. We're going to break down the differences between Langchain4j and SpringAI, and highlighting their unique features and capabilities.
---

## Quick Reminder: Language Models, Chat Models, Embedding Models, and RAG

Before we jump into the nitty-gritty of each framework, let's revisit some key concepts that we've covered in our previous blogs:

- **Language Models**: are AI models trained on big amounts of text data to predict the next word in a sequence that they can then generate a coherent text based on the provided input.

- **Chat Models**: These are fine-tuned language models designed to facilitate conversations, answering questions and providing responses in a conversational manner, they can maintain context over mutiple turns and give coherent responses. They are typically used for interactive applications like chatbots.

- **Embedding Models**: These models are used to convert text into numerical vectors (embeddings) in order to represent the semantic meaning of the text. They are important in RAG because they allow us to search for relevant information in the text based on similarity search algorithms (Go back to [RAG Under the Hood](/blog/rag-under-the-hood) 🔙 if you need a quick refresher on this topic).

- **RAG**: It's a technique combines the generative capabilities of LLMs with the advanced search capabilities of vector databases from an external knowledge base. This approach enhances the accuracy of the responses and gives up-to-date and specific responses. (Go back to [RAG Under the Hood](/blog/rag-under-the-hood) 🔙 if you need more details about how RAG process works).

Now that we're all on the same page, let's dive into our contenders! 

## The Contenders in the Ring 🥊 
### LangChain4j 🦜️🔗: Components and Features

[LangChain4j](https://github.com/langchain4j/langchain4j) is a java framework designed to simplify the development of LLM/RAG applications in Java ecosystem based on [LangChain](https://docs.langchain.com/). It provides a set of abstractions and tools to work with LLM providers like OpenAI, Ollama, and more and also allows implementing RAG workflows for specific use cases.

#### Key Components

- **Model interfaces**: LangChain4j provides a set of interfaces to work with different types of models, like: `LanguageModel`, `ChatLanguageModel`, `EmbeddingModel`, and `TokenizerModel`. These interfaces allow seamless integration with various AI providers such as OpenAI, Ollama, Hugging Face, and many others.

- **Document Loaders**: As we've previously seen, the RAG process requires a lot of data, and in most cases, this data is stored in a vector database. LangChain4j provides components facilitating loading documents from different sources (e.g., PDF, text files, etc.) into a common format.

- **Text Splitters**: These are used to split the text into smaller chunks for efficient processing and embedding. LangChain4j provides a set of text splitters to work with different types of text, like: `RecursiveCharacterTextSplitter`, `TokenTextSplitter`, and `SentenceTextSplitter`. These allow you to split text based on character count, token count, or sentence boundaries.

- **Vector Databases**: Abstractions for storing and retrieving vector embeddings, with support for various vector databases. The most popular choices are [PgVector](https://github.com/pgvector/pgvector) and [Chroma](https://github.com/chroma-db/chroma).

- **Memory**: It allows maintaining a conversation history and context, which is crucial for chatbot applications.

- **Agents**:  Tools for composing multiple steps in an LLM workflow.

There are a lot more components that LangChain4j provides, and you can find more details in the [official documentation](https://docs.langchain4j.dev/).

#### Example: Implementing RAG with LangChain4j

Here's a simple example of how to implement RAG with LangChain4j.

```java
// Load and split documents
TextLoader loader = TextLoader.fromDirectory("path");
List<Document> documents = loader.load();
TextSplitter splitter = new RecursiveCharacterTextSplitter(1000, 200);
List<Document> splits = splitter.splitDocuments(documents);

// Create embeddings with OpenAI and store in vector database 
EmbeddingModel embeddingModel = OpenAIEmbeddingModel.withApiKey(OPENAI_API_KEY);
EmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
EmbeddingsCache embeddingsCache = new InMemoryEmbeddingsCache();
for (Document doc : splits) {
    Embedding embedding = embeddingModel.embed(doc.text()).content();
    embeddingStore.add(embedding, new TextSegment(doc.text()));
}

// Create retriever and language model
Retriever<TextSegment> retriever = EmbeddingStoreRetriever.from(embeddingStore, embeddingModel, 2);
ChatLanguageModel model = OpenAiChatModel.withApiKey(OPENAI_API_KEY);

// Create RAG prompt
PromptTemplate promptTemplate = PromptTemplate.from(
    "Answer the question based on the following context:\n\n" +
    "Context: {{context}}\n\n" +
    "Question: {{question}}\n\n" +
    "Answer:");

// Use RAG to answer questions
String question = "What is the best tech conference in MEA region?";
List<TextSegment> relevantDocs = retriever.findRelevant(question);
String context = relevantDocs.stream()
    .map(TextSegment::text)
    .collect(Collectors.joining("\n\n"));

String prompt = promptTemplate.apply(Map.of("context", context, "question", question));
String answer = model.generate(prompt);
System.out.println(answer);
```

In this sample example, we've walked through all the necessary steps to implement RAG with LangChain4j, from loading documents and generating embeddings to creating the final prompt and generating answers.

For more advanced use cases, you can use the appropriate abstractions like the `Vectore database` to store embeddings also choose the appropriate `Text Splitter` in case you need to split the text in a specific way.

To see LangChain4j in action, check out a real-world example I built: a Spring Boot documentation chatbot. This project demonstrates how to create a chatbot that quickly and accurately answers questions about Spring Boot documentation using RAG techniques. [GitHub Repo 👈](https://github.com/miliariadnane/spring-boot-doc-rag-bot)

![spring-boot-doc-bot](/static/blogs/langchain4j-vs-spring-ai/spring-boot-doc-bot.png)

### Spring AI 🍃: Components and Features

[Spring AI](https://spring.io/projects/spring-ai) is a sub-project of Spring developed by the Spring team to integrate AI capabilities into Spring applications. It aims to provide components and features for working with LLM providers and RAG workflows like Langchain4j project.

#### Key Components

- **AI Client**: Interface to for interacting with AI services, supporting both synchronous and asynchronous operations. 

- **Model Abstractions**: Same as LangChain4j, Spring AI provides a set of abstractions to work with different types of models (e.g., OpenAI, Ollama, etc.)

- **Prompt Template**: Spring AI includes a `PromptTemplate` class that helps in creating and managing prompts with placeholders for dynamic content.

- **Document Reader**: Spring AI gives us the `DocumentReader` interface and an `HtmlDocumentReader` implementation to read and process documents from various sources.

- **Transformers**: Utilities for processing and transforming text data like tokenization, sentence splitting, and more.

- **Vector Database**

You can find more details about each component in the [official documentation](https://docs.spring.io/spring-ai/reference/index.html).

#### Example: Implementing RAG with Spring AI

Here's an example of how you might implement a RAG workflow using SpringAI:

```java
@Configuration
public class AIConfig {

    @Bean
    public AiClient aiClient(AiProperties aiProperties) {
        // Use OpenAI as an example, but you can choose any AI provider that Spring AI supports
        return new OpenAiClient(aiProperties);
    }

    @Bean
    public VectorStore vectorStore() {
        // In-memory vector store for simplicity, but you can use any other implementation like PgVector or Chroma
        return new InMemoryVectorStore();
    }

    @Bean
    public EmbeddingClient embeddingClient(AiClient aiClient) {
        // Use OpenAI embedding model as an example, but you can choose any embedding model that Spring AI supports
        return new OpenAiEmbeddingClient(aiClient);
    }
}

@Service
@RequiredArgsConstructor
public class RAGService {

    private final AiClient aiClient;
    private final VectorStore vectorStore;
    private final EmbeddingClient embeddingClient;

    public void indexDocuments(List<Document> documents) {
        for (Document doc : documents) {
            Embedding embedding = embeddingClient.embed(doc.getContent());
            vectorStore.add(List.of(new EmbeddingWithMetadata(embedding, Map.of("source", doc.getMetadata().get("source")))));
        }
    }

    public String answerQuestion(String question) {
        // Create the embedding for the question
        Embedding questionEmbedding = embeddingClient.embed(question);
        // Find the relevant documents in the vector store
        List<EmbeddingWithMetadata> relevantDocs = vectorStore.findRelevant(questionEmbedding, 2);

        // Get the context from the relevant documents
        String context = relevantDocs.stream()
            .map(EmbeddingWithMetadata::getMetadata)
            .map(metadata -> metadata.get("source").toString())
            .collect(Collectors.joining("\n\n"));

        // Create the prompt for the language model
        String prompt = String.format(
            "Answer the question based on the following context:\n\n" +
            "Context: %s\n\n" +
            "Question: %s\n\n" +
            "Answer:", context, question);

        // Generate the answer using the language model
        ChatCompletionRequest request = ChatCompletionRequest.builder()
            .messages(List.of(new UserMessage(prompt)))
            .build();

        // Generate the answer using the language model and return the result
        ChatCompletionResponse response = aiClient.chatCompletion(request);
        return response.getResult().getOutput().getContent();
    }
}
```
This code demonstrates how to configure and utilize Spring AI to implement a RAG system. We've created a simple `RAGService` that uses Spring AI components to perform three key functions: indexing documents, retrieving relevant information, and generating insightful answers.

To see Spring AI in action beyond this basic example, check out another real-world project I developed: the Moroccan Cooking Companion 🇲🇦🍽️. This Spring Boot application allow users to explore traditional Moroccan cuisine by searching for dishes and retrieving not only their recipes but also appetizing images. The project built with Spring Boot, Spring AI, and Hilla, demonstrating how these technologies can come together to create a rich, interactive experience. [GitHub Repo 👈](https://github.com/miliariadnane/moroccan-cooking-companion)

![moroccan-cooking-companion](/static/blogs/langchain4j-vs-spring-ai/mcc-bot.png)

## Comparison: Langchain4j vs SpringAI

To provide a comparison of Langchain4j vs SpringAI, let's examine a comprehensive overview of these frameworks along with another player in the field, Semantic Kernel. This comparison is based on data collected in February 2024.

![langchain4j-vs-spring-ai-vs-semantic-kernel](/static/blogs/langchain4j-vs-spring-ai/langchain4j-vs-spring-ai-vs-semantic-kernel.png)

Let's summarize the key points from this comparison:

1. JDK Compatibility:

    - Langchain4j supports a wide range of JDK versions: 8, 11, 17, and 21.
    - SpringAI is compatible with JDK 17.
    - Semantic Kernel supports JDK 17 and 21.


2. GraalVM Support:

    - Langchain4j fully supports GraalVM.
    - Neither SpringAI nor Semantic Kernel support GraalVM as of February 2024.


3. Release Status:

    - Langchain4j is in General Availability, indicating a stable and production-ready state.
    - SpringAI is marked as Experimental, suggesting it's still in active development and may undergo significant changes.
    - Semantic Kernel is in Alpha stage, implying it's in early development and may not be suitable for production use yet.


4. RAG Support:

    - All three frameworks provide support for Retrieval-Augmented Generation (RAG).


5. Documentation:

    - Langchain4j offers comprehensive and well-structured documentation with good examples.
    - SpringAI provides clear, concise documentation that seamlessly integrates with the broader Spring ecosystem, benefiting from Spring's established documentation practices and style.
    - Semantic Kernel currently offers limited documentation, which is still in progress, reflecting its early stage of development and alpha status.


6. Development Activity:

    - Langchain4j shows high development activity with frequent commits, regular releases, and active community engagement.
    - SpringAI also demonstrates strong development activity with steady development progress with regular commits and periodic releases. While not as frequent as Langchain4j, SpringAI's development is consistent.
    - Semantic Kernel shows moderate but growing development activity. As a newer project in the Java space, it has fewer overall commits compared to the others, but it's still in active development.

## Wrapping It Up 

> Both Langchain4j and SpringAI offer powerful tools for building RAG applications in the Java ecosystem. The choice between them will depend on your specific needs, existing technology stack, and development preferences.

> Langchain4j provides a rich set of components and higher-level abstractions, making it an excellent choice for developers looking to quickly build complex AI applications. Its wide range of integrations and extensive documentation make it a versatile option for various use cases.

> SpringAI, on the other hand, shines in its seamless integration with the Spring ecosystem. It's an ideal choice for teams already using Spring and looking to add AI capabilities to their applications. While it may have fewer features compared to Langchain4j, its design and the backing of the Spring team make it a strong framework, especially for enterprise applications.

As both frameworks continue to evolve, we can expect to see more features, optimizations, and integrations added over time.

