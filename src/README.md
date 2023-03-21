---
home: true
icon: home
title: Home
heroImage: /logo-dark.png
heroImageDark: /logo.png
heroText: APIs for Data-in-Motion
tagline: Open source software connecting web and mobile applications to event-driven microservices using standard protocols, such as HTTP, Server-Sent Events and Kafka.
actions:
  - text: " Quick Start"
    link: /get-started/
    type: primary
    icon: code

  - text: " Install"
    link: reference/zpm/install.md
    icon: download

features:
  - title: Zilla CLI
    icon: terminal
    details: The Zilla Runtime command line interface uses the Zilla Runtime Configuration to control and observe the Zilla runtime.
    link: reference/zilla/README.md

  - title: Zilla Manager
    icon: bars-progress
    details: The Zilla Manager command line interface uses the Zilla Manager Configuration to package the Zilla runtime with minimal 
    link: reference/zpm/README.md

  - title: Bindings
    icon: arrows-left-right-to-line
    details: Each configured binding represents a step in the pipeline as data streams are decoded, translated or encoded according to a specific protocol type.
    link: reference/zilla.yaml/binding.md

  - title: Vaults
    icon: vault
    details: Each configured vault represents a container for digital keys and certificates based on a specific implementation type.
    link: reference/zilla.yaml/valut.md

  - title: Guards
    icon: shield-halved
    details: Each configured guard represents a security checkpoint for one or more bindings based on a specific implementation type.
    link: reference/zilla.yaml/guard.md

  - title: Proxies
    icon: diagram-project
    details: Design and configure your API Endpoints such as REST API, SSE and more.
    link: src/configure-kafka-proxies/README.md

  - title: Amazon MSK
    icon: database
    details: Learn how to deploy a more secure Amazon MSK with Aklivity Public MSK Proxy.
    link: connect-your-kafka/amazon-msk.md

  - title: Avian
    icon: server
    details: Connect to Aiven Kafka from Zilla.
    link: connect-your-kafka/aiven.md

  - title: Confluent Cloud
    icon: cloud
    details: Connect to Confluent Cloud from Zilla.
    link: connect-your-kafka/confluent-cloud.md

  - title: RedPanda
    icon: bars-staggered
    details: Connect to Redpanda from Zilla.
    link: connect-your-kafka/redpanda.md

copyright: false
footer: Theme by <a href="https://theme-hope.vuejs.press/" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © aklivity, Inc. 2023
---


**Zilla** is open-source software connecting web and mobile applications to event-driven microservices using standard protocols, such as HTTP, Server-Sent Events and Kafka.

Zilla is designed on the fundamental principle that _every data flow is a stream_, and that streams can be composed together to create efficient protocol transformation pipelines. This concept of a stream holds at both the network level for communication protocols and also at the application level for data processing.

Zilla's declarative configuration defines a routed graph of protocol decoders, transformers, encoders and caches that combine to provide a secure and stateless API entry point to your event-driven architecture.

For example, when deployed in front of a Kafka cluster, Zilla can be configured to support:

* HTTP request-response interaction with Kafka-based microservices
* HTTP event-driven caching populated by messages from a Kafka topic
* reliable message streaming from a Kafka topic via Server-Sent Events
* secure HTTP request-response APIs using JWT access tokens
* secure Server-Sent Events streams using continuous authorization via JWT access tokens

As a developer, you can focus on writing and testing your event-driven microservices with technologies such as Kafka consumers and producers, you can define your web and mobile APIs using Zilla, and then you can deploy securely at a global scale.
