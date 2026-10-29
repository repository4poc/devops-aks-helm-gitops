## Instructions

### Build Image

```
docker build -t node-backend-app .

docker build -t node-backend-app:1.0 .
```

### Tag Image

```
 docker tag node-backend-app:latest varinder2284/node-backend-app:1.0
```

## Publish Image

```
docker push varinder2284/node-backend-app:1.0
```

```
docker build --no-cache -t node-backend-api:latest .

docker tag node-backend-api:latest varindergupta/node-backend-api:latest

docker push varindergupta/node-backend-api:latest

kubectl apply -f helm\templates\deployment.yaml

kubectl get pods -n apps

## so the pods restart and fetch updated latest images.

kubectl rollout restart deployment/node-backend-app -n apps

```
