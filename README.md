# TuringQ - Migration

## Commands

### Root Package

- Setting up dependencies for all packages

```
npm run setup
```

### Lerna

- Creating new packages

```
lerna create <package>
```

- Adding dependencies or packages to a specific package

```
lerna add <dependency/package> --scope <package>
```

- Listing all packages

```
lerna list
```

### Iniciar projeto

- Iniciar cluster

```
docker compose -f resources/registry/docker-compose.yml up -d
sh resources/kubernetes/create-kind-cluster.sh
kubectl cluster-info --context kind-turingq-local
npm run deploy:local:authorizer
npm run deploy:local:core
```

- Remover cluster

```
kind delete cluster --name=turingq-local
docker compose -f resources/registry/docker-compose.yml down
```
