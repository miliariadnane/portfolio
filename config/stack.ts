import { Colors } from './colors';

export enum Stack {
  // Languages
  java,
  go,
  typescript,
  javascript,

  // Frontend
  angular,
  react,

  // Backend
  spring,
  springBoot,
  laravel,

  // Cloud
  aws,

  // Messaging
  rabbitMq,
  kafka,

  // Databases
  postgres,
  mysql,
  mongo,

  // Tools
  docker,
  kubernetes,

  // Architecture
  distributedSystems,
  microservices,

  // AI
  deepLearning,
  machineLearning,
  imageClassification,
  cnn,
  deepLearning4j,
  LLM,
  langchain4j,
  GenAI,
}

export const WorkStack = [
  Stack.java,
  Stack.spring,
  Stack.springBoot,
  Stack.go,
  Stack.typescript,
  Stack.react,
  Stack.angular,
  Stack.distributedSystems,
  Stack.docker,
  Stack.kubernetes,
  Stack.aws,
  Stack.rabbitMq,
  Stack.kafka,
  Stack.postgres,
  Stack.mysql,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.java]: {
    value: 'Java',
    color: Colors.javascript,
  },
  [Stack.typescript]: {
    value: 'TypeScript',
    color: Colors.typescript,
  },
  [Stack.go]: {
    value: 'Go',
    color: Colors.go,
  },
  [Stack.react]: {
    value: 'React',
    color: Colors.react,
  },
  [Stack.angular]: {
    value: 'Angular',
    color: Colors.angular,
  },
  [Stack.spring]: {
    value: 'Spring Frameworks',
    color: Colors.spring,
  },
  [Stack.springBoot]: {
    value: 'Spring Boot',
    color: Colors.springboot,
  },
  [Stack.aws]: {
    value: 'AWS',
    color: Colors.aws,
  },
  [Stack.kafka]: {
    value: 'Kafka',
    color: Colors.kafka,
  },
  [Stack.rabbitMq]: {
    value: 'RabbitMQ',
    color: Colors.rabbitmq,
  },
  [Stack.postgres]: {
    value: 'Postgres',
    color: Colors.postgres,
  },
  [Stack.mysql]: {
    value: 'MySQL',
    color: Colors.mysql,
  },
  [Stack.docker]: {
    value: 'Docker',
    color: Colors.docker,
  },
  [Stack.kubernetes]: {
    value: 'Kubernetes',
    color: Colors.kubernetes,
  },
  [Stack.distributedSystems]: {
    value: 'Distributed Systems',
    color: Colors.distributedsystems,
  },
  [Stack.javascript]: {
    value: 'Javascript',
    color: Colors.javascript,
  },
  [Stack.laravel]: {
    value: 'Laravel',
    color: Colors.laravel,
  },
  [Stack.mongo]: {
    value: 'MongoDB',
    color: Colors.mongo,
  },
  [Stack.microservices]: {
    value: 'Microservices',
    color: Colors.microservices,
  },
  [Stack.machineLearning]: {
    value: 'Machine Learning',
    color: Colors.machinelearning,
  },
  [Stack.deepLearning]: {
    value: 'Deep Learning',
    color: Colors.deeplearning,
  },
  [Stack.imageClassification]: {
    value: 'Image Classification',
    color: Colors.imageclassification,
  },
  [Stack.cnn]: {
    value: 'CNN',
    color: Colors.cnn,
  },
  [Stack.deepLearning4j]: {
    value: 'DeepLearning4j',
    color: Colors.deeplearning4j,
  },
  [Stack.LLM]: {
    value: 'LLM',
    color: Colors.llm,
  },
  [Stack.langchain4j]: {
    value: 'Langchain4j',
    color: Colors.langchain4j,
  },
  [Stack.GenAI]: {
    value: 'GenAI',
    color: Colors.genai,
  },

};
