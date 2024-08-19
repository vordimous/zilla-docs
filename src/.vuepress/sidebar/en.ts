import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/reference/": [
    {
      text: "Zilla Runtime",
      prefix: "config/",
      children: [
        {
          text: "CLI (zilla)",
          link: "zilla-cli.md",
          children: [],
        },
        {
          text: "Zilla Config Overview",
          link: "overview.md",
          children: [],
        },
        {
          text: "Resolvers",
          link: "resolvers.md",
          children: [],
        },
      ],
    },
    {
      text: "Bindings",
      prefix: "config/bindings/",
      children: "structure",
    },
    {
      text: "Catalogs",
      prefix: "config/catalogs/",
      children: "structure",
    },
    {
      text: "Guards",
      prefix: "config/guards/",
      children: "structure",
    },
    {
      text: "Models",
      prefix: "config/models/",
      children: "structure",
    },
    {
      text: "Telemetry",
      prefix: "config/telemetry/",
      children: [
        {
          text: "Events",
          link: "events.md",
        },
        {
          text: "Metrics",
          prefix: "metrics/",
          children: "structure",
        },
        {
          text: "Exporters",
          prefix: "exporters/",
          children: "structure",
        },
      ],
    },
    {
      text: "Vaults",
      prefix: "config/vaults/",
      children: "structure",
    },
    {
      text: "Plugins",
      children: [
        {
          text: "VS Code extension",
          link: "vscode/README.md",
          children: [],
        },
      ],
    },
    {
      text: "Zilla Manager",
      prefix: "manager/",
      children: [
        {
          text: "CLI (zpm)",
          link: "zpm-cli.md",
          children: [],
        },
        {
          text: "zpm Config Overview",
          link: "overview.md",
          children: [],
        },
      ],
    },
  ],
  "/solutions/": [
    {
      text: "Secure Public Access",
      icon: "aky-zilla-plus",
      children: [
        {
          text: "Deployment Options",
          link: "concepts/kafka-proxies/secure-public-access.md",
          children: [],
        },
        {
          text: "Amazon MSK",
          collapsible: true,
          prefix: "how-tos/amazon-msk/secure-public-access/",
          link: "how-tos/amazon-msk/secure-public-access/production.md",
          children: [
            {
              text: "Terraform",
              link: "https://github.com/aklivity/zilla-plus-aws-templates/tree/main/amazon-msk/cdktf/secure-public-access",
            },
            {
              text: "CloudFormation",
              collapsible: true,
              link: "production.md",
              children: [
                {
                  text: "with SASL/SCRAM",
                  link: "production.md",
                },
                {
                  text: "with Mutual TLS (mTLS)",
                  link: "production-mutual-tls.md",
                },
                {
                  text: "with Unauthorized access",
                  link: "development.md",
                },
              ],
            },
          ],
        },
        {
          text: "Confluent Cloud",
          link: "how-tos/confluent-cloud/secure-public-access.md",
          children: [],
        },
      ],
    },
    {
      text: "IoT Ingest and Control",
      icon: "aky-zilla-plus",
      children: [
        {
          text: "Deployment Options",
          link: "concepts/kafka-proxies/iot-ingest-control.md",
          children: [],
        },
        {
          text: "Amazon MSK",
          link: "how-tos/amazon-msk/iot-ingest-control.md",
          children: [],
        },
        {
          text: "Confluent Cloud",
          link: "how-tos/confluent-cloud/iot-ingest-control.md",
          children: [],
        },
        {
          text: "Redpanda",
          link: "how-tos/redpanda/iot-ingest-control.md",
          children: [],
        },
      ],
    },
    {
      text: "Web Streaming",
      icon: "aky-zilla-plus",
      children: [
        {
          text: "Deployment Options",
          link: "concepts/kafka-proxies/web-streaming.md",
          children: [],
        },
        {
          text: "Amazon MSK",
          children: [
            {
              text: "Terraform",
              link: "https://github.com/aklivity/zilla-plus-aws-templates/tree/main/amazon-msk/cdktf/web-streaming",
            },
          ],
        },
      ],
    },
    {
      text: "Other Resources",
      children: [
        {
          text: "AWS",
          prefix: "how-tos/aws-services/",
          children: "structure",
        },
      ],
    },
  ],
  "/": [
    {
      text: "Getting Started",
      children: [
        {
          text: "What is Zilla?",
          link: "concepts/what-is-zilla.md",
          children: [],
        },
        {
          text: "Quickstart",
          link: "how-tos/quickstart/index.md",
          children: [],
        },
        {
          text: "Bindings",
          link: "concepts/bindings.md",
          children: [],
        },
        {
          text: "Bring Your Own Spec",
          link: "concepts/spec-generation.md",
          children: [],
        },
      ],
    },
    {
      text: "Integration",
      children: [
        {
          text: "Connecting to Kafka",
          collapsible: true,
          prefix: "how-tos/connecting-to-kafka/",
          link: "how-tos/connecting-to-kafka/apache-kafka.md",
          children: [
            "apache-kafka.md",
            "aiven.md",
            "amazon-msk.md",
            "confluent-cloud.md",
            "redpanda.md",
          ],
        },
        {
          text: "Catalogs",
          link: "concepts/catalogs.md",
          children: [],
        },
      ],
    },
    {
      text: "Kafka Proxying",
      children: [
        {
          text: "-hidden-",
          ariaLabel: "-hidden-",
          link: "/",
          children: [],
        },
        {
          text: "HTTP Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/http-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/http-proxy.md",
            },
            {
              text: "Create a Simple CRUD API",
              link: "tutorials/rest/rest-intro.md",
            },
            {
              text: "Create a Simple SSE Stream",
              link: "tutorials/sse/sse-intro.md",
            },
            {
              text: "Run the TodoMVC CQRS Demo",
              link: "https://github.com/aklivity/zilla-demos/tree/main/todo-mvc-cqrs",
            },
          ],
        },
        {
          text: "MQTT Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/mqtt-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/mqtt-proxy.md",
            },
            {
              text: "Setup an MQTT Kafka broker",
              link: "how-tos/mqtt/mqtt.kafka.broker.md",
            },
            {
              text: "Run the Taxi Demo",
              link: "https://github.com/aklivity/zilla-demos/tree/main/taxi",
            },
          ],
        },
        {
          text: "gRPC Kafka Proxy",
          collapsible: true,
          link: "concepts/kafka-proxies/grpc-proxy.md",
          children: [
            {
              text: "Overview",
              link: "concepts/kafka-proxies/grpc-proxy.md",
            },
            {
              text: "Expose a Simple gRPC Server",
              link: "tutorials/grpc/grpc-intro.md",
            },
            {
              text: "Implement the Route Guide example",
              link: "how-tos/grpc/grpc.route-guide.service.md",
            },
          ],
        },
      ],
    },
    {
      text: "Deploy & Operate",
      children: [
        {
          text: "Installing Zilla",
          link: "how-tos/deploy-operate.md",
          children: [],
        },
        {
          text: "Telemetry Logs & Metrics",
          collapsible: true,
          link: "concepts/telemetry.md",
          children: [
            {
              text: "Overview",
              link: "concepts/telemetry.md",
            },
            {
              text: "Add logs & metrics",
              link: "tutorials/telemetry/telemetry-intro.md",
            },
            {
              text: "Push to an OTLP Collector",
              link: "how-tos/telemetry/opentelemetry-protocol.md",
            },
          ],
        },
        {
          text: "Secure Public Access on AWS",
          icon: "aky-zilla-plus",
          link: "solutions/concepts/kafka-proxies/secure-public-access.md",
          children: [],
        },
        {
          text: "IoT Ingest and Control on AWS",
          icon: "aky-zilla-plus",
          link: "solutions/concepts/kafka-proxies/iot-ingest-control.md",
          children: [],
        },
        {
          text: "Web Streaming on AWS",
          icon: "aky-zilla-plus",
          link: "solutions/concepts/kafka-proxies/web-streaming.md",
          children: [],
        },
      ],
    },
    {
      text: "Security",
      children: [
        {
          text: "-hidden-",
          ariaLabel: "-hidden-",
          link: "/",
          children: [],
        },
        {
          text: "Guards",
          collapsible: true,
          link: "concepts/guards.md",
          children: [
            {
              text: "Overview",
              link: "concepts/guards.md",
            },
            {
              text: "Add JWT auth to MQTT",
              link: "https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.broker.jwt",
            },
            {
              text: "Add JWT auth to REST",
              link: "https://github.com/aklivity/zilla-examples/tree/main/http.echo.jwt",
            },
            {
              text: "Add JWT auth to SSE",
              link: "https://github.com/aklivity/zilla-examples/tree/main/sse.proxy.jwt",
            },
          ],
        },
        {
          text: "Vaults",
          collapsible: true,
          link: "concepts/vaults.md",
          children: [
            {
              text: "Overview",
              link: "concepts/vaults.md",
            },
            {
              text: "Server Encryption, TLS & SSL",
              link: "concepts/ssl.md",
            },
          ],
        },
      ],
    },
    {
      text: "Reference",
      prefix: "reference/",
      children: [
        {
          text: "Vscode",
          link: "vscode/",
          children: [],
        },
        {
          text: "Config Overview",
          link: "config/overview.md",
          children: [],
        },
        {
          text: "Bindings",
          link: "config/bindings/",
          children: [],
        },
        {
          text: "Catalogs",
          link: "config/catalogs/",
          children: [],
        },
        {
          text: "Models",
          link: "config/models/",
          children: [],
        },
        {
          text: "Guards",
          link: "config/guards/",
          children: [],
        },
        {
          text: "Vaults",
          link: "config/vaults/",
          children: [],
        },
        {
          text: "Telemetry",
          link: "config/telemetry/",
          children: [],
        },
      ],
    },
  ],
});
