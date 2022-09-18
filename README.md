# TuringQ - Migration

## Commands

### Root Package

- Setting up dependencies for all packages

```
npm run setup
```

### Iniciar projeto

- Iniciar cluster

```
docker compose -f resources/registry/docker-compose.yml up -d

sh resources/kubernetes/create-kind-cluster.sh

kubectl cluster-info --context kind-turingq-local

kubectl apply -f resources/ingress/k8s/setup.yml

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

kubectl apply -f resources/ingress/k8s/ingress.yml

npm run deploy:all:local

kubectl get po
```

- Remover cluster

```
kind delete cluster --name=turingq-local
docker compose -f resources/registry/docker-compose.yml down
```

- Caso ocorra o erro: ErrImagePull ao subir os pods, remova o cluster e inicie novamente
