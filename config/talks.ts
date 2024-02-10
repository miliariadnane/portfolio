
export interface Talk {
    title: string;
    slug: string;
    tags: string[];
    date: string;
    description: string;
    watchTalk?: string;
    demosList: string[];
    slides: string;
    banner: string;
}

export const talks: Talk[] = [
    {
        title: 'Java for ML ? Yes, It’s possible ! A 101 Hands-On guide to deep learning',
        slug: 'java-for-ml-yes-its-possible-a-101-hands-on-guide-to-deep-learning',
        tags: ['Java', 'Deep Learning', 'Machine Learning', 'Image Classification', 'CNN'],
        date: '2024-01-03',
        description:
        'In this talk, we explored the feasibility of using Java for Machine Learning. We delved into the workings of image recognition, explaining how deep learning models recognize objects in an image. We discussed the core operations of Convolution Neural Networks (CNNs) - Convolution, Pooling, and Activation. The highlight of the talk was a demo of a Spring Boot application that classifies images of coriander (Qazbor) and parsley (Maadanous) herbs using a deep learning model built with DeepLearning4j.',
        watchTalk: '',
        demosList: [
            'https://github.com/miliariadnane/herb-classifier-api',
        ],
        slides: 'https://docs.google.com/presentation/d/1laIMblFrNtsICfyP6Vit5DiWNiwD1gPZN-waFA1f7wg/edit?usp=sharing',
        banner: '/static/talks/transperfect-talk/java-for-ml.png',
    },
    {
        title: 'Hexagonal Architecture Demystified: Everything You Need to Know !',
        slug: 'hexagonal-architecture-demystified-everything-you-need-to-know',
        tags: ['Hexagonal Arch', 'Clean Arch', 'DDD', 'Distributed Systems'],
        date: '2023-09-05',
        description:
            'Hexagonal architecture was a software design pattern that decoupled the applications core domain from its dependencies. This made the application more flexible and easier to test, as well as made it easier to adapt the application to new requirements or technologies. During the presentation, I delved into the principles of hexagonal architecture and saw how they were applied to the development of a simple e-commerce microservice application. I also analyzed the advantages and challenges associated with hexagonal architecture, providing insights on its implementation through a real-world example involving a Spring Boot application with Domain-Driven Design (DDD) principles.',
        watchTalk: '',
        demosList: [
            'https://github.com/miliariadnane/product-discount-service-hexagonal-architecture',
        ],
        slides: 'https://docs.google.com/presentation/d/1aRHpDMAcnK5wUJhduYWKhapjGCC00TN2-AlU_M-qILs/edit?usp=sharing',
        banner: '/static/talks/transperfect-talk/hexagonal-architecture.png',
    },
    {
        title: 'My Journey Into The World Of Microservices Using Spring Cloud',
        slug: 'my-journey-into-the-world-of-microservices-using-spring-cloud',
        tags: ['Spring Cloud', 'Microservices'],
        date: '2022-12-21',
        description:
            'In this talk turn around architecture of microservices and the different concepts surrounding this pattern. So, the talk will cover concepts such as service discovery, load balancing, asynchronous massaging and a few more concepts. The presentation will include a demo of a side project that I worked on it a few months ago, where I will share my journey in building simple e-commerce microserivce app from scratch using spring cloud, kubernetes and AWS.',
        watchTalk: 'https://www.youtube.com/watch?v=HzNY9xoL_sA&t=5s&ab_channel=GeeksBlaBla',
        demosList: [
            'https://github.com/miliariadnane/demo-microservices',
            'https://github.com/miliariadnane/advanced-microservices',
        ],
        slides: 'https://docs.google.com/presentation/d/12FpMlcLw_ULQztTCN5ym7oqBYKpPoMynh5DTbaHf_Fw/edit?usp=sharing',
        banner: '/static/talks/blablaconf-microservices/blablaconf-microservices-talk.png',
    },
    {
        title: 'Why soft skills are important in your career ?',
        slug: 'why-soft-skills-are-important-in-your-career',
        tags: ['Soft Skills'],
        date: '2020-07-21',
        description:
            'This talk is about the importance of soft skills in your career and how to improve them. I will share my experience and my journey in improving my soft skills and how it helped me to grow in my career.',
        watchTalk: 'https://youtu.be/88pff7BfZ14',
        demosList: [
            '',
        ],
        slides: 'https://docs.google.com/presentation/d/1wP_l3atFE0R-PoLUoJwSxAphSHZmD-l0vaQ-CmNMHks/edit?usp=sharing',
        banner: '/static/talks/soft-skills-for-your-career/soft-skills-for-your-career.png',
    }
];
