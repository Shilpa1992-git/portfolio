---
layout:  /src/layouts/ProjectLayout.astro
title: 'Online Shopping App'
pubDate: 2025-01-20
description: 'A full-stack e-commerce application built with modern DevOps practices. Features containerized microservices, CI/CD pipelines, and cloud deployment on AWS.'
languages: ["docker", "kubernetes", "jenkins", "linux", "aws"]
image:
  url: "/images/projects/online-shopping-app.png"
  alt: "Online Shopping App - E-commerce application with DevOps practices"
--- 

This project showcases a **complete e-commerce application** built with modern DevOps practices and deployed using industry-standard tools and technologies.

## 🛍️ Features

- **Microservices Architecture**: Modular design with independent services
- **Container Orchestration**: Docker containers managed by Kubernetes
- **CI/CD Pipeline**: Automated builds, tests, and deployments with Jenkins
- **Cloud Deployment**: Hosted on AWS with high availability
- **Monitoring & Logging**: Prometheus and Grafana for observability
- **Infrastructure as Code**: Terraform for AWS resource provisioning

## 💡 Technologies Used

- Docker & Docker Compose
- Kubernetes (EKS)
- Jenkins CI/CD
- AWS (EC2, EKS, RDS, S3)
- Terraform
- Linux
- Git
- Prometheus & Grafana

## 🚀 Project Structure

```
online-shopping-app/
├── docker-compose.yml      # Local development setup
├── k8s/                    # Kubernetes manifests
│   ├── deployments/
│   ├── services/
│   ├── configmaps/
│   └── secrets/
├── terraform/              # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── Jenkinsfile             # CI/CD pipeline
├── monitoring/             # Prometheus & Grafana configs
│   ├── prometheus.yml
│   └── grafana-dashboards/
└── README.md               # Documentation
```

## 📋 Key Learnings

- Building scalable microservices with Docker
- Kubernetes deployments and service discovery
- Implementing CI/CD pipelines with Jenkins
- AWS cloud infrastructure management
- Infrastructure as Code with Terraform
- Application monitoring and observability

## 🌐 Demo

👉 [View on GitHub](https://github.com/shilpa1992-git)

## 🎯 DevOps Highlights

1. **Containerization**: All services containerized with Docker
2. **Orchestration**: Kubernetes for container management
3. **Automation**: Full CI/CD pipeline with Jenkins
4. **Cloud Native**: AWS-based infrastructure
5. **Observability**: Complete monitoring stack

## 📚 Documentation

The project includes:

- Detailed setup and deployment guides
- Architecture diagrams
- API documentation
- CI/CD pipeline documentation
- Monitoring and alerting setup

## 🔧 Getting Started

1. Clone the repository
2. Set up AWS credentials
3. Run Terraform to provision infrastructure
4. Deploy using Jenkins pipeline
5. Access the application

## 🎓 Skills Demonstrated

- DevOps Engineering
- Cloud Computing (AWS)
- Container Orchestration
- CI/CD Implementation
- Infrastructure as Code
- System Monitoring

🚀 *Developed as part of my DevOps learning journey.*
