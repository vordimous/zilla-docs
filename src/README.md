---
home: true
icon: fas fa-home
title: Home
heroImage: /zilla-rings.webp
heroImageDark: /zilla-rings.webp
heroText: Zilla Documentation
tagline: Zilla is a multi-protocol, edge and service proxy. It abstracts Apache Kafka® for non-native clients, such as browsers and IoT devices, by exposing Kafka topics via user-defined REST, Server-Sent Events (SSE), MQTT, or gRPC API entry points.
actions:
  - text: Quickstart
    link: /tutorials/quickstart/kafka-proxies.md
    type: primary

  - text: Install
    link: /how-tos/install.md

features:

  - title: HTTP Proxy
    icon: fas fa-wifi
    details: Define REST and SSE endpoints that map to Kafka topics.
    link: /concepts/kafka-proxies/http-proxy.html

  - title: gRPC Proxy
    icon: fas fa-arrows-left-right-to-line
    details: Define gRPC services that map to Kafka topics.
    link: /concepts/kafka-proxies/http-proxy.html

  - title: MQTT Proxy
    icon: fas fa-diagram-project
    details: Define an MQTT broker to pub/sub on Kafka.
    link: /concepts/kafka-proxies/http-proxy.html

  - title: Zilla Config
    icon: fas fa-book
    details: Learn about the zilla.yaml configuration.
    link: /concepts/config-intro.html

---
