const BASE_URL = 'https://aliawilkinson.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-default.png`

export const seoDefaults = {
  title: 'Alia Wilkinson | Systems Architect & Principal Engineer',
  description:
    'Portfolio of Alia Wilkinson — Principal Engineer specializing in systems architecture, developer leverage, platform engineering, and cloud infrastructure design.',
  url: BASE_URL,
  image: DEFAULT_IMAGE,
}

export const seoData = {
  home: {
    title: 'Alia Wilkinson | Systems Architect & Principal Engineer',
    description:
      'Principal Engineer building systems that create leverage — platform architecture, delivery automation, infrastructure patterns, and developer experience tooling.',
    url: BASE_URL,
    image: DEFAULT_IMAGE,
  },
  about: {
    title: 'About Alia Wilkinson | Principal Engineer & Architect',
    description:
      'AWS Certified Solutions Architect designing platforms, automation, and delivery systems that make engineering organizations fast, safe, and autonomous.',
    url: `${BASE_URL}/about`,
    image: DEFAULT_IMAGE,
  },
  agenticWorkflowApp: {
    title: 'Agentic Workflow App | Alia Wilkinson',
    description:
      'Turning scattered production signals into infrastructure intelligence using AI-driven analysis of git, Jira, and runbook data across production applications.',
    url: `${BASE_URL}/agenticWorkflowApp`,
    image: DEFAULT_IMAGE,
  },
  cognitoIdentityArchitecture: {
    title: 'Cognito Identity Architecture | Alia Wilkinson',
    description:
      'Designing auth architecture with AWS Cognito, Terraform, and enterprise federation for a platform serving 250K external agents in financial services.',
    url: `${BASE_URL}/cognitoIdentityArchitecture`,
    image: DEFAULT_IMAGE,
  },
  almModernization: {
    title: 'ALM Modernization | Alia Wilkinson',
    description:
      'Replacing legacy on-prem systems with event-driven AWS patterns — Lambda, S3, and self-service data platforms for ALM hedging and analytics teams.',
    url: `${BASE_URL}/almModernization`,
    image: DEFAULT_IMAGE,
  },
  releaseofreleases: {
    title: 'Release of Releases | Alia Wilkinson',
    description:
      'Release orchestration that automated 1200+ component deployments using Azure DevOps and PowerShell, cutting multi-hour releases down to predictable runs.',
    url: `${BASE_URL}/releaseofreleases`,
    image: DEFAULT_IMAGE,
  },
  iacPipelineValidation: {
    title: 'IaC Pipeline Validation | Alia Wilkinson',
    description:
      'Building integration test pipelines for Bicep IaC modules — automated testing, semantic versioning, and ACR publishing to keep infrastructure code trustworthy.',
    url: `${BASE_URL}/iacPipelineValidation`,
    image: DEFAULT_IMAGE,
  },
  cmdletCreationTemplate: {
    title: 'PowerShell DevOps Excellence | Alia Wilkinson',
    description:
      'Creating cmdlet templates and training materials to standardize PowerShell practices, empowering DevOps teams with consistent automation patterns.',
    url: `${BASE_URL}/cmdletCreationTemplate`,
    image: DEFAULT_IMAGE,
  },
  amplifyReactMigApp: {
    title: 'Amplify React Migration App | Alia Wilkinson',
    description:
      'Full-stack Amplify React application that cut AWS migration time in half — improving speed, security, and error reduction for healthcare deployments.',
    url: `${BASE_URL}/amplifyReactMigApp`,
    image: DEFAULT_IMAGE,
  },
}
