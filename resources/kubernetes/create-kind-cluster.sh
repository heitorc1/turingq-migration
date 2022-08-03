#!/bin/sh
set -o errexit

CLUSTER_NAME="turingq-local"

REGISTRY_ENV_CONFIG="$(dirname $0)/../registry/.env"

if [ ! -e "$REGISTRY_ENV_CONFIG" ]
then
  echo "Please create a .env file at /resources/registry/"
  exit
fi

. $REGISTRY_ENV_CONFIG

KIND_CLUSTER_CONFIG=`cat $(dirname $0)/kind-cluster.yml`

REGISTRY_IP=`docker inspect -f '{{.NetworkSettings.Networks.kind.IPAddress}}' "${REGISTRY_NAME}"`

if [ -z "$REGISTRY_IP" ]
then
  echo "Registry '${REGISTRY_NAME}' not found. Please set up your registry before running this command."
  exit
fi

cat <<EOF | kind create cluster --name=${CLUSTER_NAME} --config=-
${KIND_CLUSTER_CONFIG}
containerdConfigPatches:
- |-
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."localhost:${REGISTRY_PORT}"]
    endpoint = ["http://${REGISTRY_IP}:5000"]
EOF

docker network connect "kind" "${REGISTRY_NAME}" || true

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: local-registry-hosting
  namespace: kube-public
data:
  localRegistryHosting.v1: |
    host: "localhost:${REGISTRY_PORT}"
    hostFromContainerRuntime: "registry:5000"
    hostFromClusterNetwork: "${REGISTRY_IP}:5000"
    help: "https://kind.sigs.k8s.io/docs/user/local-registry/"
EOF
