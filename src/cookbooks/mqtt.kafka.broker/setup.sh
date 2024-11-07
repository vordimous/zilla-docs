#!/bin/sh
set -e

KAFKA_VENDOR_PROFILE="${KAFKA_VENDOR_PROFILE:-kafka}"
export COMPOSE_PROFILES="${COMPOSE_PROFILES:-$KAFKA_VENDOR_PROFILE,init-$KAFKA_VENDOR_PROFILE}"
export KAFKA_BOOTSTRAP_SERVER="${KAFKA_BOOTSTRAP_SERVER:-$KAFKA_VENDOR_PROFILE:29092}"

# Start or restart Zilla
if [ -z "$(docker compose ps -q zilla)" ]; then
docker compose up -d
else
docker compose up -d --force-recreate --no-deps zilla
fi
