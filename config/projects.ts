import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'Hexagonal Architecture in Spring Boot with DDD - Product Discount Service',
    slug: 'product-discount-service-hexagonal-architecture',
    banner: '/static/projects/hexagonal-arch/banner.png',
    website: 'https://github.com/miliariadnane/product-discount-service-hexagonal-architecture',
    description:
      'A practical demonstration of Hexagonal Architecture in Spring Boot with Domain-Driven Design (DDD) principles for a dynamic Product Discount Service. This project emphasizes clean code, testability, and architectural best practices.',
    shortDescription:
      'This application is not business oriented and my focus is mostly on technical part, I just want to implement a sample app from scratch with microservice architecture using different technologies, principles and patterns.',
    repository: 'https://github.com/miliariadnane/product-discount-service-hexagonal-architecture',
    stack: [
      Stack.java,
      Stack.springBoot,
      Stack.microservices,
      Stack.distributedSystems,
      Stack.postgres,
      Stack.mongo,
      Stack.docker,
    ],
    dimensions: [250, 610],
    screenshots: [
      '/static/projects/hexagonal-arch/banner.png',
      '/static/projects/hexagonal-arch/screenshots/hexa-arch-and-ddd.png',
      '/static/projects/hexagonal-arch/screenshots/hexa-arch-illustration.png',
    ],
    deployment: {
      web: 'https://github.com/miliariadnane/product-discount-service-hexagonal-architecture',
    },
    subProjects: [],
  },
  {
    title: 'Herb Classifier - AI APP : Parsley or Coriander ?',
    slug: 'herb-classifier',
    banner: '/static/projects/herb-classifier/banner.png',
    description: 'A simple web application that classifies images of coriander (Qazbor) and parsley (Maadanous) herbs using a deep learning model built with DeepLearning4j.',
    repository: 'https://github.com/miliariadnane/tasks-planner-app',
    stack: [Stack.java, Stack.springBoot, Stack.deepLearning, Stack.imageClassification, Stack.deepLearning4j, Stack.cnn],
    dimensions: [360, 640],
    screenshots: [],
    deployment: {
      web: 'https://github.com/miliariadnane/herb-classifier-api',
      // android: '',
      // ios: '',
    },
    website: 'https://herbify-app.vercel.app/',
    subProjects: [],
  },
  {
    title: 'Tasks Planner App',
    slug: 'tasks-planner-app',
    banner: '/static/projects/tasksplanner/banner.png',
    description:
      'A minimalist collaborative app for scheduling and managing your tasks with the team and getting notifications through discord.',
    repository: 'https://github.com/miliariadnane/tasks-planner-app',
    stack: [Stack.springBoot, Stack.angular, Stack.postgres, Stack.aws],
    dimensions: [360, 640],
    screenshots: [
      '/static/projects/tasksplanner/screenshots/new-task.png',
      '/static/projects/tasksplanner/screenshots/users-list.png',
      '/static/projects/tasksplanner/screenshots/discord-notification.png',
      '/static/projects/tasksplanner/screenshots/monitoring-dashboard.png',
      '/static/projects/tasksplanner/screenshots/main-page.png',
    ],
    deployment: {
      web: 'https://github.com/miliariadnane/tasks-planner-app',
      // android: '',
      // ios: '',
    },
    website: 'https://github.com/miliariadnane/tasks-planner-app',
    subProjects: [],
  },
  {
    title: 'Store App With Microservice Architecture with Spring Cloud, Kubernetes and AWS',
    slug: 'demo-microservices',
    banner: '/static/projects/microservices/banner.png',
    website: 'https://github.com/miliariadnane/advanced-microservices',
    description:
      'A practical sample store, built with spring frameworks, kubernetes and deployed on AWS. This is an advanced part based on my previous project demo-microservices in which I am focusing on security concerns, resiliency, observability and deployment improvements.',
    shortDescription:
      'This application is not business oriented and my focus is mostly on technical part, I just want to implement a sample app from scratch with microservice architecture using different technologies, principles and patterns.',
    repository: 'https://github.com/miliariadnane/advanced-microservices',
    stack: [
      Stack.java,
      Stack.springBoot,
      Stack.distributedSystems,
      Stack.postgres,
      Stack.rabbitMq,
      Stack.kubernetes,
      Stack.docker,
      Stack.aws,
    ],
    dimensions: [360, 640],
    screenshots: [
      '/static/projects/microservices/banner.png',
    ],
    deployment: {
      web: 'https://github.com/miliariadnane/advanced-microservices',
    },
    subProjects: [
      {
        title: 'Demoing microservices architecture in spring ecosystem with simple e-commerce application',
        description: 'This repo contains demo about how to build simple ecommerce microservices app from scratch step by step based on spring boot (spring cloud, spring cloud gateway, spring data JPA, spring web, ...), deployed on Kubernetes and AWS using EKS. The app composed of 5 microservices [customer - product - order - payment - notification] communicating with each other using REST API (+ Open Feign) and messaging system (RabbitMQ).',
        repository: 'https://github.com/miliariadnane/demo-microservices',
        deployment: {},
      },
    ],
  },
];
