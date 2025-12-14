---
layout: /src/layouts/MarkdownPostLayout.astro
title: Building CI/CD Pipelines with Jenkins
author: Shilpa Salunkhe
description: "Learn how to set up continuous integration and continuous deployment pipelines using Jenkins. Master Jenkinsfile, pipeline as code, and automate your software delivery process."
image:
  url: "/images/imagedefault.webp"
  alt: "Jenkins logo and CI/CD pipeline workflow illustration"
pubDate: 2025-01-25
tags:
  [
    "jenkins", "ci-cd", "devops", "automation", "pipeline"
  ]
languages: ["jenkins", "docker", "git"]
---

Jenkins is one of the most popular open-source automation servers used for building, testing, and deploying software. As a DevOps engineer, mastering Jenkins is essential for implementing robust CI/CD pipelines.

## What is Jenkins?

Jenkins is an open-source automation server that helps automate the parts of software development related to building, testing, and deploying. It facilitates continuous integration and continuous delivery (CI/CD).

### Key Features

- **Open Source**: Free and community-driven
- **Extensible**: Thousands of plugins available
- **Distributed**: Can run builds across multiple machines
- **Pipeline as Code**: Define pipelines using Jenkinsfile
- **Integration**: Works with Git, Docker, Kubernetes, and more

## Installing Jenkins

### Using Docker

```bash
# Run Jenkins in Docker
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### On Ubuntu/Debian

```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt-get update
sudo apt-get install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

## First Steps

1. Access Jenkins at `http://localhost:8080`
2. Enter the initial admin password
3. Install suggested plugins
4. Create admin user
5. Configure Jenkins URL

## Understanding Jenkins Pipelines

### Declarative Pipeline

A declarative pipeline uses a structured syntax defined in a Jenkinsfile.

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'mvn clean package'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'mvn test'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker build -t myapp .'
                sh 'docker push myapp:latest'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

### Scripted Pipeline

A scripted pipeline uses Groovy-based DSL.

```groovy
node {
    stage('Build') {
        echo 'Building...'
        sh 'mvn clean package'
    }
    
    stage('Test') {
        echo 'Testing...'
        sh 'mvn test'
    }
    
    stage('Deploy') {
        echo 'Deploying...'
        sh 'docker build -t myapp .'
    }
}
```

## Building a Complete CI/CD Pipeline

### Example: Node.js Application Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'myapp'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'test-results.xml'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    image.push()
                    image.push("latest")
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh 'kubectl set image deployment/myapp myapp=${DOCKER_IMAGE}:${DOCKER_TAG} -n staging'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                sh 'kubectl set image deployment/myapp myapp=${DOCKER_IMAGE}:${DOCKER_TAG} -n production'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            emailext (
                subject: "Pipeline Succeeded: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build succeeded!",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
        failure {
            emailext (
                subject: "Pipeline Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build failed!",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

## Key Jenkins Concepts

### Agents

Agents are machines that execute pipeline steps.

```groovy
pipeline {
    agent {
        label 'docker-agent'
    }
    // ...
}
```

### Stages

Stages represent distinct parts of the pipeline.

```groovy
stages {
    stage('Build') { }
    stage('Test') { }
    stage('Deploy') { }
}
```

### Steps

Steps are individual tasks within a stage.

```groovy
steps {
    sh 'echo "Hello World"'
    sh 'npm install'
}
```

### Post Actions

Post actions run after stages or pipeline completion.

```groovy
post {
    always {
        archiveArtifacts artifacts: 'dist/**/*'
    }
    success {
        echo 'Pipeline succeeded!'
    }
    failure {
        echo 'Pipeline failed!'
    }
}
```

## Integrating with Docker

### Building Docker Images

```groovy
stage('Build Docker Image') {
    steps {
        script {
            def image = docker.build("myapp:${env.BUILD_NUMBER}")
            image.push()
        }
    }
}
```

### Using Docker Agents

```groovy
pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
```

## Integrating with Kubernetes

### Deploying to Kubernetes

```groovy
stage('Deploy to Kubernetes') {
    steps {
        sh '''
            kubectl apply -f k8s/deployment.yaml
            kubectl set image deployment/myapp myapp=myapp:${BUILD_NUMBER}
            kubectl rollout status deployment/myapp
        '''
    }
}
```

## Best Practices

1. **Pipeline as Code**: Store Jenkinsfile in version control
2. **Use Credentials**: Store secrets in Jenkins credentials
3. **Parallel Execution**: Run independent stages in parallel
4. **Artifact Management**: Archive and publish artifacts
5. **Notifications**: Set up email/Slack notifications
6. **Cleanup**: Clean workspace after builds
7. **Error Handling**: Implement proper error handling
8. **Security**: Follow security best practices

## Useful Plugins

- **Blue Ocean**: Modern UI for Jenkins pipelines
- **Docker Pipeline**: Build and use Docker containers
- **Kubernetes**: Deploy to Kubernetes clusters
- **Git**: Git integration
- **Email Extension**: Enhanced email notifications
- **Credentials Binding**: Secure credential management

## Monitoring and Debugging

### Viewing Logs

```bash
# View console output
# Access via Jenkins UI: Job > Build > Console Output

# View logs via CLI
curl http://localhost:8080/job/myjob/lastBuild/consoleText
```

### Pipeline Visualization

Use Blue Ocean plugin for visual pipeline representation:

```bash
# Install Blue Ocean
# Manage Jenkins > Manage Plugins > Available > Blue Ocean
```

## Common Pipeline Patterns

### Multi-Branch Pipeline

Automatically create pipelines for each branch.

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Building branch: ${env.BRANCH_NAME}"
            }
        }
    }
}
```

### Parameterized Builds

```groovy
pipeline {
    agent any
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production'])
        string(name: 'VERSION', defaultValue: 'latest')
    }
    stages {
        stage('Deploy') {
            steps {
                echo "Deploying ${params.VERSION} to ${params.ENVIRONMENT}"
            }
        }
    }
}
```

## Resources

- [Jenkins Official Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Jenkins Plugins](https://plugins.jenkins.io/)
- [Jenkins Best Practices](https://www.jenkins.io/doc/book/pipeline/pipeline-best-practices/)

Jenkins is a powerful tool for automating your CI/CD workflows. Start with simple pipelines and gradually build more complex automation! 🚀
