---
layout: /src/layouts/MarkdownPostLayout.astro
title: Kubernetes Fundamentals - Container Orchestration Made Simple
author: Shilpa Salunkhe
description: "Learn the basics of Kubernetes, the leading container orchestration platform. Understand pods, services, deployments, and how to manage containerized applications at scale."
image:
  url: "/images/imagedefault.webp"
  alt: "Kubernetes logo and cluster architecture illustration"
pubDate: 2025-01-20
tags:
  [
    "kubernetes", "container-orchestration", "devops", "cloud-native", "tutorial"
  ]
languages: ["kubernetes", "docker", "linux"]
---

Kubernetes (often abbreviated as K8s) is the de facto standard for container orchestration. As a DevOps engineer, mastering Kubernetes is crucial for managing containerized applications at scale.

## What is Kubernetes?

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google, it's now maintained by the Cloud Native Computing Foundation (CNCF).

### Why Kubernetes?

- **Automatic Scaling**: Automatically scale applications based on demand
- **Self-Healing**: Restarts failed containers and replaces them
- **Service Discovery**: Automatically discovers and load balances services
- **Rolling Updates**: Update applications with zero downtime
- **Resource Management**: Efficiently manage compute resources

## Key Concepts

### Pods

A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that share storage and network resources.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
```

### Deployments

Deployments manage Pod replicas and provide declarative updates. They ensure a specified number of Pod replicas are running.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
```

### Services

Services provide a stable network endpoint to access Pods. They enable service discovery and load balancing.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

### Namespaces

Namespaces provide logical separation of resources within a cluster. They help organize and manage resources.

```bash
# Create a namespace
kubectl create namespace production

# List namespaces
kubectl get namespaces

# Set default namespace
kubectl config set-context --current --namespace=production
```

## Basic Kubernetes Commands

### Cluster Management

```bash
# Get cluster information
kubectl cluster-info

# Get nodes
kubectl get nodes

# Describe a node
kubectl describe node <node-name>
```

### Working with Pods

```bash
# Create a pod from YAML
kubectl apply -f pod.yaml

# Get pods
kubectl get pods

# Get pods in all namespaces
kubectl get pods --all-namespaces

# Describe a pod
kubectl describe pod <pod-name>

# Delete a pod
kubectl delete pod <pod-name>

# Get pod logs
kubectl logs <pod-name>

# Execute command in pod
kubectl exec -it <pod-name> -- /bin/bash
```

### Working with Deployments

```bash
# Create deployment
kubectl create deployment nginx --image=nginx:1.21

# Get deployments
kubectl get deployments

# Scale deployment
kubectl scale deployment nginx --replicas=5

# Update deployment image
kubectl set image deployment/nginx nginx=nginx:1.22

# Rollout status
kubectl rollout status deployment/nginx

# Rollback deployment
kubectl rollout undo deployment/nginx
```

### Working with Services

```bash
# Create service
kubectl create service loadbalancer nginx --tcp=80:80

# Get services
kubectl get services

# Expose deployment as service
kubectl expose deployment nginx --port=80 --type=LoadBalancer
```

## ConfigMaps and Secrets

### ConfigMaps

ConfigMaps store configuration data as key-value pairs.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://localhost:5432/mydb"
  api_key: "your-api-key"
```

### Secrets

Secrets store sensitive data like passwords and API keys.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=  # base64 encoded
  password: cGFzc3dvcmQ=  # base64 encoded
```

## Health Checks

### Liveness Probe

Determines if a container is running properly.

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
```

### Readiness Probe

Determines if a container is ready to accept traffic.

```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Resource Management

### Resource Requests and Limits

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

## Common Patterns

### Rolling Updates

Kubernetes supports rolling updates by default, allowing zero-downtime deployments.

```bash
kubectl set image deployment/nginx nginx=nginx:1.22
kubectl rollout status deployment/nginx
```

### Horizontal Pod Autoscaling

Automatically scale the number of pods based on CPU or memory usage.

```bash
kubectl autoscale deployment nginx --cpu-percent=80 --min=2 --max=10
```

## Getting Started Locally

### Minikube

Minikube runs a single-node Kubernetes cluster on your local machine.

```bash
# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start Minikube
minikube start

# Enable addons
minikube addons enable ingress
minikube addons enable dashboard
```

### Kind (Kubernetes in Docker)

Kind runs Kubernetes clusters using Docker containers.

```bash
# Install Kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create cluster
kind create cluster --name my-cluster
```

## Best Practices

1. **Use Deployments**: Always use Deployments instead of creating Pods directly
2. **Resource Limits**: Always set resource requests and limits
3. **Health Checks**: Implement liveness and readiness probes
4. **Labels**: Use consistent labeling strategy
5. **Namespaces**: Organize resources using namespaces
6. **Secrets Management**: Never commit secrets to version control
7. **RBAC**: Implement Role-Based Access Control
8. **Monitoring**: Set up monitoring and logging

## Next Steps

1. Set up a local Kubernetes cluster using Minikube or Kind
2. Deploy your first application
3. Learn about Ingress controllers
4. Explore Helm for package management
5. Study advanced topics like StatefulSets, DaemonSets, and Operators

## Resources

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Kubernetes Tutorials](https://kubernetes.io/docs/tutorials/)
- [Kubernetes Playground](https://www.katacoda.com/courses/kubernetes)

Kubernetes is a powerful platform that enables you to manage containerized applications efficiently. Start with the basics, practice locally, and gradually explore advanced features! ☸️
