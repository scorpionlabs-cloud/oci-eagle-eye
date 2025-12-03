// src/ociResources.js

export const regions = [
  {
    name: "ap-singapore-1",
    status: "Healthy",
    activeResources: 42,
    criticalIncidents: 0,
    costToday: 215.4
  },
  {
    name: "ap-mumbai-1",
    status: "Degraded",
    activeResources: 31,
    criticalIncidents: 1,
    costToday: 187.9
  },
  {
    name: "eu-frankfurt-1",
    status: "Healthy",
    activeResources: 27,
    criticalIncidents: 0,
    costToday: 163.2
  },
  {
    name: "us-phoenix-1",
    status: "Read-only",
    activeResources: 12,
    criticalIncidents: 0,
    costToday: 74.8
  }
];

export const resources = [
  {
    id: "oke-prod-01",
    type: "OKE Cluster",
    service: "Container Engine for Kubernetes",
    compartment: "prod-compartment",
    region: "ap-singapore-1",
    lifecycle: "Active",
    nodes: 12,
    cpuOcp: 63,
    memoryOcp: 54
  },
  {
    id: "oke-dev-01",
    type: "OKE Cluster",
    service: "Container Engine for Kubernetes",
    compartment: "dev-compartment",
    region: "ap-mumbai-1",
    lifecycle: "Active",
    nodes: 5,
    cpuOcp: 34,
    memoryOcp: 29
  },
  {
    id: "vm-bastion-01",
    type: "Compute Instance",
    service: "Compute",
    compartment: "shared-services",
    region: "ap-singapore-1",
    lifecycle: "Running",
    shape: "VM.Standard3.Flex",
    cpuOcp: 12,
    memoryOcp: 9
  },
  {
    id: "vm-payments-api-01",
    type: "Compute Instance",
    service: "Compute",
    compartment: "prod-compartment",
    region: "ap-mumbai-1",
    lifecycle: "Running",
    shape: "VM.Standard.E5.Flex",
    cpuOcp: 71,
    memoryOcp: 64
  },
  {
    id: "adb-payments",
    type: "Autonomous Database",
    service: "Autonomous Database",
    compartment: "prod-compartment",
    region: "ap-singapore-1",
    lifecycle: "Available",
    cpuOcp: 49,
    memoryOcp: 41
  },
  {
    id: "adb-sandbox",
    type: "Autonomous Database",
    service: "Autonomous Database",
    compartment: "dev-compartment",
    region: "eu-frankfurt-1",
    lifecycle: "Stopped",
    cpuOcp: 0,
    memoryOcp: 0
  },
  {
    id: "lb-frontend",
    type: "Load Balancer",
    service: "Load Balancer",
    compartment: "prod-compartment",
    region: "ap-singapore-1",
    lifecycle: "Active",
    cpuOcp: 15,
    memoryOcp: 22
  },
  {
    id: "os-prod-bucket",
    type: "Object Storage Bucket",
    service: "Object Storage",
    compartment: "prod-compartment",
    region: "ap-singapore-1",
    lifecycle: "Active",
    sizeTb: 4.2
  },
  {
    id: "fn-img-resize",
    type: "Functions Application",
    service: "Functions",
    compartment: "shared-services",
    region: "eu-frankfurt-1",
    lifecycle: "Active",
    cpuOcp: 8,
    memoryOcp: 12
  },
  {
    id: "vcn-hub-prod",
    type: "VCN",
    service: "Networking",
    compartment: "network-core",
    region: "us-phoenix-1",
    lifecycle: "Active"
  }
];

export const compartments = [
  {
    name: "prod-compartment",
    description: "Production workloads: payments, frontend, OKE clusters.",
    owner: "Platform Team",
    environment: "Production",
    tag: "mission-critical"
  },
  {
    name: "dev-compartment",
    description: "Developer sandboxes, feature branches, test OKE clusters.",
    owner: "Dev Experience",
    environment: "Non-production",
    tag: "sandbox"
  },
  {
    name: "shared-services",
    description: "Bastion, jump hosts, shared functions and tooling.",
    owner: "SRE",
    environment: "Shared",
    tag: "shared-core"
  },
  {
    name: "network-core",
    description: "Hub-and-spoke networking, VCNS, DR circuits.",
    owner: "Network Team",
    environment: "Shared",
    tag: "network-hub"
  }
];
