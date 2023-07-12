---
home: true
icon: home
title: Home
heroImage: /zilla-rings@2x.png
heroImageDark: /zilla-rings@2x.png
heroText: Introduction
tagline: Zilla is an API Gateway for event-driven architectures. It securely interfaces web apps, IoT clients, and microservices to Apache Kafka® via declaratively defined API endpoints.
actions:
  - text: Quickstart
    link: /tutorials/quickstart/kafka-proxies.md
    type: primary

  - text: Install
    link: /how-tos/install.md

features:

  - title: Kafka Proxying - Realtime Cache
    icon: clipboard-check
    details: Check markdown links
    # link: ./guide/markdown/others.html#link-check

  - title: REST-Kafka Proxy - Correlated Request-Response
    icon: box-archive
    details: Decorate Markdown content with styles
    # link: ./guide/markdown/container.html

  - title: SSE-Kafka Proxy - Filtering
    icon: table-columns
    details: Group similar content with tabs and switch them together
    # link: ./guide/markdown/tabs.html

  - title: gRPC-Kafka Proxy - Correlated Request-Response
    icon: code
    details: Group similar codes with tabs
    # link: ./guide/markdown/code-tabs.html

  - title: Deployment - Helm Chart
    icon: align-center
    details: Let you decide to align paragraphs in the way you like
    # link: ./guide/markdown/align.html

  - title: Monitoring - Auto-scaling
    icon: code
    details: Allow you to add attributes for Markdown content
    # link: ./guide/markdown/attrs.html

---

## What is Zilla

Zilla is a next-generation API gateway built for event-driven architectures and streaming. It is the most seamless and reliable way of interfacing non-Kafka clients running at the edge (mobile apps, browsers, partner systems, etc.) or inside the datacenter (gRPC services) to Apache Kafka-based microservices and data.

With Zilla, apps and services can use standard protocols such as HTTP, SSE, gRPC and the native Kafka protocol (see roadmap for additional protocols on the way) to directly consume and produce Kafka event-streams.

### How Zilla works

Zilla's declarative configuration defines a routed graph of protocol decoders, transformers, encoders and caches that combine to provide a secure and stateless API entry point to your event-driven architecture.

### Why is Zilla needed

- **Unify your event-driven architecture** by enabling any non-Kafka app or service to seamlessly consume and produce event-streams.
- **Offload DevOps burden and TCO** associated with deploying and managing Kafka integration middleware, such as Kafka Connect and custom Kafka consumer/producer API implementations.
- **Streamline your event-driven architecture’s security footprint** by centralizing authorization and authentication of all non-Kafka clients.
- **Maximize your investment in Kafka** by enabling non-Kafka developers to build their applications on top of event-streams, and take advantage of Kafka’s performance and streaming data processing capabilities.

## Zilla vs Zilla Plus

|                         | Zilla      | Zilla Plus      |
|-------------------------|------------|-----------------|
| Commercial Integrations | Helm Chart | AWS, Confluent  |
| Support                 | Community  | Premium support |

{.no-boarder}

## Public and Private MSK Proxies

### Secure, flexible access to MSK clusters across the public internet

Establish connectivity between on-premise or cross-cloud Kafka® clients and MSK clusters. The Aklivity Public MSK Proxy is a secure proxy that enables access to your MSK clusters from the public internet using a custom DNS domain. This one-time setup continues to work even after your cluster scales out with new Kafka® brokers.

### Secure, scalable access to MSK clusters across VPCs, AWS accounts & regions

Establish connectivity between remote Kafka® clients and MSK clusters with ease. The Aklivity Private MSK Proxy automates the configuration of AWS PrivateLink access to your MSK cluster. This one-time setup continues to work even after your cluster scales out with new Kafka® brokers.


