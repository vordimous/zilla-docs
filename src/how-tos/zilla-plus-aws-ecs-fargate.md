---
icon: aky-zilla-plus
description: This Guide will walk you through deploying a simple Zilla Plus service running on AWS ECS Fargate. Zilla Plus is an enterprise-ready, Kafka-native edge, and service proxy. It is a flexible, secure, and reliable way of creating stateless, multi-protocol API entry points into your Kafka cluster for both native and non-native Kafka clients.
---

# Deploying Zilla Plus on AWS ECS Fargate

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: info Estimated time to complete 10-15 minutes.
:::

## Overview

The [<ZillaPlus/>](https://aws.amazon.com/marketplace/pp/prodview-lqfqftufwpttm) is an enterprise-ready, Kafka-native edge, and service proxy. It is a flexible, secure, and reliable way of creating stateless, multi-protocol API entry points into your Kafka cluster for both native and non-native Kafka clients. With <ZillaPlus/>, you can create publicly reachable Kafka endpoints into a Kafka cluster. You can also expose topics inside your Kafka cluster via declaratively defined REST, SSE, gRPC, and MQTT APIs.

This Guide will walk you through deploying your first <ZillaPlus/> service on AWS ECS Fargate.

## Prerequisites

- An Amazon ECS cluster
- An Amazon ECR repository or another container repository
- A Subscription to the <ZillaPlus/> [product on Amazon Marketplace](https://aws.amazon.com/marketplace/pp/prodview-lqfqftufwpttm)

## Build The HTTP Echo solution FROM the Zilla Plus base image

> This will create a container image with the necessary config files inside.

- From the active <ZillaPlus/> [subscription page](https://aws.amazon.com/marketplace/server/procurement?productId=prod-amntslj4ggryw)

  - Click `Continue to Configuration`
    - Fulfillment option: `Zilla Plus`
    - Software version: `Select the most recently released version`
  - Click `Continue to Launch`
    - Copy and run the `aws` login command from the Container images section to confirm you can pull the <ZillaPlus/> container image.
    - Note the image name `709825985650.dkr.ecr.us-east-1.amazonaws.com/aklivity/zilla-plus-ecr:<version>` and one of the version tags stored in the `CONTAINER_IMAGES` variable, which will be used later.

- Create the below `Dockerfile` with the <ZillaPlus/> container image using the version tag you got from the previous steps. Use the `COPY` instruction to add the `zilla.yaml` below to your container image.


  ::: code-tabs

  @tab Dockerfile

  ```Dockerfile
  FROM 709825985650.dkr.ecr.us-east-1.amazonaws.com/aklivity/zilla-plus-ecr:<version>-alpine

  COPY ./zilla.yaml /etc/zilla/zilla.yaml
  ```

  @tab zilla.yaml

  ```yaml
  ---
  name: http-echo
  bindings:
    north_tcp_server:
      type: tcp
      kind: server
      options:
        host: 0.0.0.0
        port:
          - 7114
      routes:
        - when:
            - port: 7114
          exit: north_http_server
    north_http_server:
      type: http
      kind: server
      routes:
        - when:
            - headers:
                :scheme: http
          exit: north_echo_server
    north_echo_server:
      type: echo
      kind: server
  telemetry:
    exporters:
      stdout_logs_exporter:
        type: stdout
  ```

  :::

- Optionally add files, any other files used in your `zilla.yaml` can be added to the container in the same directory as the `zilla.yaml` config.

  ```Dockerfile
  COPY ./zilla.yaml /etc/zilla/zilla.yaml
  COPY ./tls /etc/zilla/tls
  COPY ./specs /etc/zilla/specs
  ```

- Build your image to be pushed to [Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) or another registry.

  ::: important Before you build

  - Make sure you are logged in to the `Zilla Plus` registry to pull the base image. This is a separate log in action from any other registries (ex. If you are pushing the built image to Amazon ECR).

  ```bash
  aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 709825985650.dkr.ecr.us-east-1.amazonaws.com
  ```

  - Confirm the CPU Architecture you need. Use the `docker build --platform` option to match the desired [cpuArchitecture](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RuntimePlatform.html#API_RuntimePlatform_Contents) that you can configure in your ECS task.

  :::

  ```bash
  docker build -t zp-example/http-echo:v1 .
  ```

- Tag your image with the remote repository name and tag.

  ```bash
  docker tag zp-example/http-echo:v1 [your-registry-url]/zp-example/http-echo:v1
  ```

- Push your image to your remote repository.

  ```bash
  docker push [your-registry-url]/zp-example/http-echo:v1
  ```

## Create an AWS ECS Fargate Task for your service

> This will create the AWS ECS Fargate Task that will be used to deploy your service.

- Create an IAM role for the Task. This role will be used by the running <ZillaPlus/> container.

  ::: tabs

  @tab Task role

  Name:

  ```text
  ecsTaskRole_ZillaPlus
  ```

  Policies:

  ```text
  AWSMarketplaceMeteringFullAccess
  AWSMarketplaceMeteringRegisterUsage
  ```

  :::

- If you used the Amazon ECR as your image repository, create a role with the `AmazonECSTaskExecutionRolePolicy` permission and use it as the `Task execution role` when creating the Task.

  ::: tabs

  @tab Task execution role

  Name:

  ```text
  ecsTaskExecutionRole
  ```

  Policies:

  ```text
  AmazonECSTaskExecutionRolePolicy
  ```

  :::

- [Create a new Task Definition](https://us-east-1.console.aws.amazon.com/ecs/v2/create-task-definition-with-json) from JSON
  - Substitute `<your-registry-url>`, `<ecsTaskRole_ZillaPlus ARN>`, and `<ecsTaskExecutionRole ARN>` for their respective values.

  ::: code-tabs

  @tab Task Definition JSON

  ```json
  {
    "family": "zilla-plus-http-echo-fargate",
    "networkMode": "awsvpc",
    "containerDefinitions": [
      {
        "name": "zp-http-echo",
        "image": "<your-registry-url>/zp-example/http-echo:v1",
        "portMappings": [
          {
            "name": "http",
            "containerPort": 7114,
            "hostPort": 7114,
            "protocol": "tcp",
            "appProtocol": "http"
          }
        ],
        "essential": true,
        "command": ["start", "-v", "-e"],
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "/ecs/",
            "mode": "non-blocking",
            "awslogs-create-group": "true",
            "max-buffer-size": "25m",
            "awslogs-region": "us-east-1",
            "awslogs-stream-prefix": "ecs"
          }
        }
      }
    ],
    "requiresCompatibilities": ["FARGATE"],
    "taskRoleArn": "<ecsTaskRole_ZillaPlus ARN>",
    "executionRoleArn": "<ecsTaskExecutionRole ARN>",
    "cpu": "1 vCPU",
    "memory": "3 GB"
  }
  ```

  :::

## Create a Service from your AWS ECS Fargate Task

> This will create a service based on the configuration in the Task.

- [Create a Service](https://us-east-1.console.aws.amazon.com/ecs/v2/clusters/my-ecs-cluster/create-service) from your new task.
- Deployment configuration:
  - Family: `zilla-plus-http-echo-fargate`
  - Service name: `my_zilla_plus_service`
- Network configuration:
  - Set the VPC to be the Same as your ECS Cluster.
  - Select the Public subnets.
  - Make sure the `Public IP` flag to true.
  ::: important Open Service Ports
  Make sure the security group allows traffic over the ports defined in the `portMappings` of the service.
  :::
- `Create` the Service.

## Verify your service is running

> This will call the service and get an echoed response.

Once the service has started with all tasks succeeding, you will see the <ZillaPlus/> container log `"started"`.

- Get the Public IP of the running Task in your service.
- Call the HTTP Echo service.

  ```bash
  curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://[Task Public IP]:7114
  ```

  ```output
  Hello, world
  ```

- In your Task logs, you will see a `BINDING_HTTP_REQUEST_ACCEPTED` log from the above request

Congratulations! You have successfully deployed your first <ZillaPlus/> service using AWS ECS Fargate.
