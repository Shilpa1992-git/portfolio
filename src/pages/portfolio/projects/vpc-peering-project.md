---
layout:  /src/layouts/ProjectLayout.astro
title: 'VPC Peering Project'
pubDate: 2025-01-18
description: 'AWS VPC Peering implementation demonstrating secure network connectivity between multiple Virtual Private Clouds. Includes Terraform automation and network security best practices.'
languages: ["aws", "terraform", "linux"]
image:
  url: "/images/projects/vpc-peering-project.png"
  alt: "VPC Peering Project - AWS network connectivity and infrastructure"
--- 

This project demonstrates **AWS VPC Peering** implementation for establishing secure private network connectivity between multiple Virtual Private Clouds in AWS.

## 🌐 Features

- **Multi-VPC Architecture**: Connected VPCs in same and different regions
- **Private Connectivity**: Secure communication without public internet
- **Infrastructure as Code**: Complete Terraform automation
- **Route Table Configuration**: Proper routing for cross-VPC traffic
- **Security Groups**: Fine-grained network access control
- **Cost Optimization**: No NAT Gateway or VPN required for internal traffic

## 💡 Technologies Used

- AWS VPC
- VPC Peering
- Terraform
- AWS Route Tables
- Security Groups & NACLs
- AWS EC2
- Linux

## 🚀 Project Structure

```
vpc-peering-project/
├── terraform/
│   ├── main.tf              # Main infrastructure
│   ├── vpc-a.tf             # VPC A configuration
│   ├── vpc-b.tf             # VPC B configuration
│   ├── peering.tf           # VPC Peering connection
│   ├── routes.tf            # Route table configurations
│   ├── security-groups.tf   # Security group rules
│   ├── variables.tf         # Input variables
│   ├── outputs.tf           # Output values
│   └── terraform.tfvars     # Variable values
├── scripts/
│   ├── test-connectivity.sh # Connection testing script
│   └── cleanup.sh           # Resource cleanup
├── docs/
│   ├── architecture.md      # Architecture documentation
│   └── troubleshooting.md   # Common issues & solutions
└── README.md                # Project documentation
```

## 📋 Key Learnings

- Understanding VPC architecture and subnets
- Implementing VPC Peering connections
- Configuring route tables for cross-VPC traffic
- Setting up security groups and NACLs
- Terraform modules and state management
- AWS networking best practices

## 🌐 Demo

👉 [View on GitHub](https://github.com/shilpa1992-git)

## 🎯 Architecture Highlights

1. **VPC A**: Production environment with public and private subnets
2. **VPC B**: Development environment with isolated networking
3. **Peering Connection**: Secure link between both VPCs
4. **Route Tables**: Configured for bidirectional traffic
5. **Security**: Least privilege access controls

## 📚 Documentation

The project includes:

- Architecture diagrams
- Step-by-step setup guide
- Terraform code with comments
- Network topology documentation
- Security best practices

## 🔧 Getting Started

1. Clone the repository
2. Configure AWS credentials
3. Update terraform.tfvars with your values
4. Run `terraform init` and `terraform apply`
5. Test connectivity between VPCs

## 🎓 Skills Demonstrated

- AWS Networking
- VPC Architecture
- Infrastructure as Code (Terraform)
- Network Security
- Cloud Engineering
- DevOps Best Practices

## 💰 Cost Considerations

- VPC Peering has no hourly charges
- Data transfer charges apply for cross-AZ/region traffic
- No NAT Gateway costs for internal communication
- Cost-effective alternative to VPN connections

🚀 *Developed as part of my DevOps learning journey.*
