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

kubectl apply -f resources/ingress/k8s/setup.yml

kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

kubectl apply -f resources/ingress/k8s/ingress.yml

npm run deploy:local:authorizer

/*
*
* Acessar http://localhost:9090/auth e pegar a chave pública do Realm
* Substituir em core/k8s/core/config-map.yml
* Substituir em questions/k8s/questions/config-map.yml
* KEYCLOAK_REALM_TOKEN_SIGNATURE_PUBLIC_KEY pela chave pública obtida
*
*/

npm run deploy:local:core
npm run deploy:local:frontend
npm run deploy:local:questions
npm run deploy:local:subscriptions

```

- Remover cluster

```
kind delete clusters turingq-local
docker compose -f resources/registry/docker-compose.yml down
```

- Caso ocorra o erro: ErrImagePull ao subir os pods, remova o cluster e inicie novamente
