## Project Folder Strcuture

```
my-app/
├── src/
├── Dockerfile
├── helm/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
└── gitops/
    ├── dev/
    │   └── application.yaml
    ├── staging/
    │   └── application.yaml
    └── prod/
        └── application.yaml
```

- src/ → Application Code
- helm/ → defines how the application is deployed:
  - Deployment
  - Service
  - Ingress
  - ConfigMap, etc.
- gitops/ → defines what should be deployed and where:
  - environment-specific configuration
  - Argo CD Applications
  - Helm values references, etc.

## CI/CD Steps

CI builds:

## Build Docker image

```
docker build -t node-frontend-app:latest .

docker build -t node-frontend-app:1.0 .
```

## Tag Image

```
docker tag node-frontend-app:2.0 varinder2284/node-frontend-app:1.0
```

## Publish Image

```
docker push varinder2284/node-frontend-app:1.0
```

## Test the image locally

```
docker run -p 3000:3000 node-frontend-app
```

```
kubectl apply -f helm/node-frontend-app/templates/deployment.yaml

kubectl get namespaces
kubectl get pods -n apps
kubectl describe pod node-frontend-app-55f679bfb9-8kqd7 -n apps
kubectl get replicasets -n apps

kubectl get deployments -n apps
kubectl rollout undo deployment/node-frontend-app -n apps

```

2. Create Helm chart

   Install the Helm release

   ```
   helm install node-frontend-app ./node-frontend-app -n apps --create-namespace
   ```

   Upgrade / rollout a new image

   ```
   helm upgrade node-frontend-app ./node-frontend-app \
   -n apps \
   --set image.repository=varinder2284/node-frontend-app \
   --set image.tag=latest
   ```

   Watch the rollout

   ```
   kubectl rollout status deployment/node-frontend-app -n apps
   ```

   Check Pods

   ```
   kubectl get pods -n apps
   ```

   View Helm releases

   ```
   helm list -n apps
   ```

   View Helm release history

   ```
   helm history node-frontend-app -n apps
   ```

   Rollback If the new deployment is broken:

   ```
   helm rollback node-frontend-app -n apps
   ```

   Or to a specific revision:

   ```
   helm rollback node-frontend-app 1 -n apps
   ```

   Kubernetes will pull latest when a new Pod starts. However, pushing a new latest image to Docker Hub does not by itself create a Kubernetes rollout.

   You can force a new rollout with:

   ```
    kubectl rollout restart deployment/node-frontend-app -n apps
   ```

   deployment.apps/node-frontend-app restarted

   ```
   $ kubectl rollout status deployment/node-frontend-app -n apps

   ```

   deployment "node-frontend-app" successfully rolled out

   For production, I'd recommend using versioned tags such as:

   ```

   varinder2284/node-frontend-app:1.0.1
   varinder2284/node-frontend-app:1.0.2
   varinder2284/node-frontend-app:1.0.3

   ```

   rather than latest. This makes Helm rollouts and rollbacks much safer.

   ```
   $ kubectl get hpa -n apps
   ```

   ```
   NAME                    REFERENCE                      TARGETS              MINPODS   MAXPODS   REPLICAS   AGE
   node-frontend-app-hpa   Deployment/node-frontend-app   cpu: <unknown>/70%   1         1         2          19s
   ```

3. pushes both to ACR.

## Recommended approach

```
Developer
   │
   ▼
Git push
   │
   ▼
CI/CD
   ├── Build container image
   ├── Push image → ACR
   └── Update GitOps values
          │
          ▼
     gitops/dev/values.yaml
          │
          ▼
       Argo CD
          │
          ▼
      Kubernetes
```
