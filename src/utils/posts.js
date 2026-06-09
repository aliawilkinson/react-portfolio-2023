// posts for case studies and about in html format

export const content = {
    "releaseofreleases": {
        "title": "Release of Releases - Release Orchestration through Automation",
        "imgSrc": "./infoposts/ror.png",
        "post": `
    <h2>Situation:</h2>
    <p>As a Senior DevOps Lead Engineer, I enhanced the release management process for both cloud and on-premises deployments at loanDepot. The existing system lacked efficiency due to manual error-prone processes. It had significant dependencies that caused delays and errors. My goal was to create a customer orchestration solution using Azure DevOps, pipelines, and PowerShell to streamline the release process and ensure proper dependency management. Spoiler alert: we went from 26 teams manually deploying their products to full automation for over 1200+ components and releases that went until 4 or 6:30 am to releases that ended a little after midnight, on average. I love giving people their time back.</p>

    <h2>Task:</h2>
    <p>I began by analyzing the existing release management process and identifying the key pain points. I realized that there was a lack of pipeline automation among projects that had dependencies on other projects involved in the deployment, leading to miscommunications and delays, downtime and race conditions. The dependencies between different components were not properly tracked, resulting in frequent conflicts during releases.</p>

    <h2>Action:</h2>
    <p>To address these challenges, I designed and implemented a comprehensive release orchestration system using Azure DevOps, pipelines, additions to the company's bespoke CMDB, and custom PowerShell for orchestration with Windows Task Manager to ensure proper dependency handling between on-prem and cloud components. These were my tactics:</p>

    <ul>
    <h3><strong>Planning and Design:</strong></h3> <li>I collaborated with cross-functional teams, including developers, testers, and operations, to understand their requirements and establish a clear roadmap for the project. We defined the desired workflow, identified the critical dependencies, and outlined the necessary stages for both cloud and on-premises deployments.</li>
    <h3><li><strong>Azure DevOps Setup:</strong></h3> I configured Azure DevOps to support the new release orchestration process. This involved creating a dedicated project, setting up repositories, and configuring pipelines for different deployment environments.</li>
    <h3><li><strong>Dependency Mapping:</strong></h3> Using Azure DevOps, I developed a dependency mapping system that allowed teams to define and track dependencies between different components using the company's pre-existing custom CMDB. This information was stored in a centralized repository and served as the foundation for orchestrating the release process in the correct order.</li>
    <h3><li><strong>Pipeline Creation:</strong></h3> Leveraging Azure Pipelines, I created a series of automated release pipelines tailored to the specific requirements of each component using PowerShell automation and cleansed data from the CMDB. These pipelines included stages for building, testing, and deploying the software artifacts. To ensure proper dependency management, I integrated the dependency mapping system with the pipelines, enabling the release orchestration process to execute in the correct order.</li>
    <h3><li><strong>PowerShell Scripting:</strong></h3> To facilitate the customization of the release process, I developed a PowerShell script called "Release of Releases" that allowed teams to define their specific deployment requirements and execute them seamlessly within the pipelines. This script orchestrated the deployment, removing human error and increasing the speed of the process by 3 or 4 hours on average. The DevTools front end created in Angular enabled teams to add their app settings and deploy the applications and infrastructure components in the desired sequence through automation, further enhancing the dependency management capabilities.</li>
    </ul>

    <h2>Result:</h2>
    <p>By implementing the customer orchestration solution for cloud and on-premises releases using Azure DevOps, pipelines, and PowerShell, I achieved the following outcomes:</p>

    <ul>
    <h3><strong>Streamlined Release Process:</strong></h3> <li>The new release orchestration system significantly improved the coordination and communication among teams, eliminating delays and reducing the risk of conflicts during deployments. No more struggling to resolve side effect errors during a live deployment, no more deployment collisions for on-prem components deployed on the same servers, and no more 4 or 6 am releases.</li>
    <h3><strong>Enhanced Dependency Management:</strong></h3> <li>The dependency mapping system and the integration with the pipelines ensured that releases occurred in the correct order, minimizing errors and maximizing the overall efficiency of the process.</li>
    <h3><strong>Increased Deployment Flexibility:</strong></h3> <li>The PowerShell scripts provided teams with the ability to customize their deployment requirements, enabling them to adapt the release process to their specific needs without sacrificing the standardized orchestration framework.</li>
    <h3><strong>Improved Time-to-Market:</strong></h3> <li>The efficient release management process enabled faster deployments, allowing the company to deliver new features and updates to customers more quickly, enhancing their overall experience.</li>
    </ul>

    <p>By leveraging Azure DevOps, pipelines, and PowerShell, I successfully designed and implemented a customer orchestration solution for cloud and on-premises releases. This solution streamlined the release process, improved dependency management, increased deployment flexibility, and ultimately contributed to improved time-to-market for the organization.</p>
    `
    },

    "iacPipelineValidation": {
        "title": "Who Tests the Testers - IaC Pipeline Validation",
        "imgSrc": "./infoposts/iac-pipeline-test.png",
        "post": `
    <h2>Situation:</h2>
    <p>As a team, we decided to set up a system where multiple teams could contribute to and use modules using Bicep modules (the Azure version of Terraform IaC, which we also used). Very quickly the trustworthiness of code added to this repo became questionable, breaking deployments due to untested modules being tested, approved, and merged. Seeing this as an issue that could bloom into a long-term headache, I rushed to create a pipeline that tested the modules before they were merged to ensure efficacy of what we had in our repo.</p>

    <h2>Task:</h2>
    <p>I established a pipeline in ADO for code merging that would ensure the quality and reliability of the IaC Bicep modules through integration tests and tracking. This involved writing Bicep modules as components for different Azure services, enabling teams to leverage them seamlessly. Additionally, I aimed to implement state tracking for test results and versioning for the published Bicep modules within the ACR.</p>

    <h2>Action:</h2>
    <p>To accomplish these objectives, I followed the following steps:</p>

    <ul>
    <li><strong>Bicep Module Development:</strong> I wrote a significant number of Bicep modules as reusable components for different Azure services. These modules served as building blocks that could be easily pulled and integrated by various operations and development teams across the organization. By adopting the DRY principle using Terragrunt's tried and tested method of scaffolding modules, I ensured consistency, reduced redundancy, and facilitated code maintenance.</li>
    <li><strong>Pipeline Creation:</strong> I designed and implemented a pipeline in ADO to validate the efficacy of the Bicep modules. This pipeline encompassed multiple stages, including linting, unit testing, integration testing, and security scanning. Each stage aimed to identify potential issues and validate the modules' integrity and functionality. As one might imagine, integration testing is time-consuming.</li>
    <li><strong>Automated Publishing:</strong> Once the Bicep modules successfully passed all tests, I implemented an automated process to publish them to the ACR. The pipeline utilized semantic versioning (semver) to tag and store the published modules, ensuring traceability and easy retrieval for consuming teams.</li>
    <li><strong>State Tracking:</strong> To keep track of the test results and maintain the state of the modules post-commit, I utilized Azure resource group tagging. By associating tags with the resource groups, I stored the state information as JSON strings, enabling easy decoding and retrieval for modules that depended on those specific resource groups.</li>
    </ul>

    <h2>Result:</h2>
    <p>The efforts invested in writing Bicep modules, establishing a robust pipeline, and implementing effective state tracking yielded the following outcomes:</p>

    <ul>
    <li><strong>Efficient Module Development:</strong> The creation of numerous reusable Bicep modules as components significantly streamlined the workflows of operations and development teams. By providing a standardized structure and utilizing the Terragrunt format, I ensured consistency and accelerated development cycles.</li>
    <li><strong>Reliable Testing and Validation:</strong> The pipeline in ADO effectively tested the Bicep modules, including linting, unit testing, integration testing, and security scanning. This comprehensive approach improved the quality and reliability of the modules, reducing the risk of deployment issues and enhancing overall system stability.</li>
    <li><strong>Automated Publishing and Versioning:</strong> The pipeline automatically published the tested Bicep modules to the ACR, allowing multiple teams to pull down the modules based on their specific requirements. By leveraging semantic versioning, teams could easily manage and track module versions, ensuring smooth and controlled deployments.</li>
    <li><strong>Enhanced State Tracking:</strong> Utilizing Azure resource group tagging and storing the state as JSON strings provided a convenient and reliable way to track the test results and maintain the state of the modules. This approach ensured transparency and simplified the identification of dependencies and potential issues.</li>
    </ul>

    <p>In conclusion, as a Senior DevOps Engineer, I successfully developed a pipeline in ADO to validate the efficacy of IaC Bicep modules before their automatic publication to the ACR. Additionally, I wrote numerous Bicep modules as reusable components and kept the structure consistent throughout the organization, following Gruntwork's Terragrunt format. Through these efforts, I enhanced the efficiency of module development, improved testing and validation processes, automated publishing and versioning, and implemented effective state tracking. The outcome was a more reliable and streamlined infrastructure deployment process for the entire company.</p>
    `
    },

    "cmdletCreationTemplate": {
        "title": "Empowering DevOps Excellence: Training and Guardrails for Those New to Powershell",
        "imgSrc": "./infoposts/cmdletautomation.png",
        "post": `
    <h2>Situation:</h2>
    <p>As a Senior DevOps Engineer, I observed inconsistent PowerShell practices within my team,
    hindering our efficiency and reliability in managing distributed systems and internal operations.
    Recognizing the need for a standardized approach, I embarked on a mission to revolutionize our PowerShell conventions.</p>

    <h2>Task:</h2>
    <p>I took the initiative to create cmdlets and templates that would not only teach but also
    reinforce good PowerShell conventions. By leveraging my expertise in distributed systems and
    internal operations, I aimed to establish code best practices that would elevate our DevOps processes.</p>

    <h2>Action:</h2>
    <p>1. Recognizing the Need for Consistency:</p>
    <ul>
    <li>I identified the challenges caused by inconsistent PowerShell practices and realized the
    importance of establishing uniformity within our team.</li>
    </ul>

    <p>2. Creating Educational and Reinforcement Tools:</p>
    <ul>
    <li>I developed a set of cmdlets and templates that simplified complex tasks and served as practical examples of best practices.</li>
    <li>These tools not only taught our team members but also provided a tangible framework to follow in their daily work.</li>
    </ul>

    <p>3. Collaborative Approach to Code Best Practices:</p>
    <ul>
    <li>I fostered collaboration within the team to determine the code best practices that would align
    with our distributed systems and internal operations.</li>
    <li>By involving everyone in the decision-making process, we ensured ownership and tailored the
    conventions to our specific needs.</li>
    </ul>

    <p>4. Streamlining Operations with Custom Templates:</p>
    <ul>
    <li>In addition to cmdlets, I created customized templates that provided a structured starting point for our scripts.</li>
    <li>These templates reduced errors, encouraged adherence to best practices, and streamlined our operations.</li>
    </ul>

    <p>5. Continuous Learning and Improvement:</p>
    <ul>
    <li>I organized regular knowledge-sharing sessions and workshops to keep the team updated on emerging PowerShell practices.</li>
    <li>We embraced a culture of continuous learning, enabling us to constantly improve our conventions and stay ahead in the DevOps landscape.</li>
    </ul>

    <h2>Result:</h2>
    <ul>
    <li>Improved efficiency and reliability in managing our distributed systems and internal operations.</li>
    <li>Enhanced understanding and adoption of best practices through educational cmdlets and templates.</li>
    <li>Fostered a collaborative environment where everyone had a stake in defining and implementing the code best practices.</li>
    <li>Streamlined operations and reduced errors by utilizing custom templates.</li>
    <li>Cultivated a culture of continuous learning, enabling us to stay at the forefront of DevOps excellence.</li>
    </ul>

    <h2>Conclusion:</h2>
    <p>Through my efforts as a Senior DevOps Engineer, I successfully revolutionized our PowerShell conventions.
    By creating educational cmdlets, custom templates, and fostering collaboration, we achieved a new level of
    consistency, efficiency, and reliability in managing our distributed systems and internal operations. Our
    dedication to continuous learning and improvement ensures that we remain at the forefront of DevOps excellence.</p>
    `
    },

    "amplifyReactMigApp": {
        "title": "Transforming App Migrations with Amplify React",
        "imgSrc": "./infoposts/mig-app.png",
        "post": `
    <h2>Situation:</h2>
    <p>As a Senior DevOps Architect at a major healthcare company, I recognized the need to streamline
    and enhance the migration process for deploying products to AWS Service Catalog. The existing manual
    approach was time-consuming and prone to errors, hampering speed and efficiency in our operations.</p>

    <h2>Task:</h2>
    <p>I took the initiative to create an Amplify React full stack application that would revolutionize the
    migration process for our engineers. My goal was to improve speed, efficiency, and security while
    reducing errors, ultimately cutting the time spent on migrations in half.</p>

    <h2>Action:</h2>
    <p>1. Assessing the Challenges:</p>
    <ul>
    <li>I closely examined the existing migration process and identified its pain points, including the manual
    nature, time-consuming tasks, and the potential for errors.</li>
    <li>Understanding the significance of security in the healthcare industry, I prioritized the need to ensure
    a secure and swift migration process.</li>
    </ul>

    <p>2. Designing the Amplify React Application:</p>
    <ul>
    <li>I architected an Amplify React application that would serve as a comprehensive tool for the migration engineers.</li>
    <li>The application incorporated front-end user interfaces, back-end services, and seamless integration with AWS Service Catalog.</li>
    </ul>

    <p>3. Enhancing Speed and Efficiency:</p>
    <ul>
    <li>By leveraging the power of Amplify and React, I created intuitive user interfaces that simplified the migration tasks.</li>
    <li>The application automated repetitive processes, reducing manual efforts and minimizing the time required for migrations.</li>
    </ul>

    <p>4. Ensuring Security and Error Reduction:</p>
    <ul>
    <li>I implemented stringent security measures within the application, adhering to industry best practices and compliance standards.</li>
    <li>The application incorporated validation checks and error handling mechanisms to prevent and minimize migration errors.</li>
    </ul>

    <p>5. Collaborating with Migration Engineers:</p>
    <ul>
    <li>I actively engaged with the migration engineers to gather their feedback and understand their specific needs and pain points.</li>
    <li>Through collaborative iterations and feedback loops, I fine-tuned the application to address their requirements effectively.</li>
    </ul>

    <h2>Result:</h2>
    <ul>
    <li>Significant improvement in speed and efficiency, with the time spent on migrations reduced by half.</li>
    <li>Enhanced security measures, ensuring the secure deployment of products to AWS Service Catalog.</li>
    <li>Drastic reduction in errors, thanks to the application's validation checks and error handling mechanisms.</li>
    </ul>

    <h2>Positive Reviews:</h2>
    <ul>
    <li><strong>Business Stakeholder:</strong> "The Amplify React application developed by our Senior DevOps Architect
    revolutionized our migration process. It saved us valuable time and resources while ensuring secure and swift
    deployments to AWS Service Catalog."</li>
    <li><strong>Lead Engineer:</strong> "The new application has been a game-changer. It simplifies the migration tasks, reduces
    errors, and boosts our productivity. The integration with AWS CloudFormation templates and CI/CD CodeDeploy
    pipelines has made our deployments more efficient and streamlined."</li>
    </ul>

    <h2>Conclusion:</h2>
    <p>As a Senior DevOps Architect, the creation of an Amplify React application revolutionized the migration process
    for our major healthcare company. By improving speed, efficiency, security, and error reduction, we cut the time
    spent on migrations in half. The success of this project demonstrates the power of innovation and collaboration
    in driving positive change within our organization.</p>
    `
    },

    "agenticWorkflowApp": {
        "title": "Agentic Workflow App: Turning Scattered Production Signals into Infrastructure Intelligence",
        "imgSrc": "./infoposts/agentic-workflow.png",
        "post": `
    <h2>Situation:</h2>
    <p>At WFG Digital, production applications were scattered across repositories with no centralized way to understand what existed, who owned it, how it was deployed, or what its release history looked like. Runbooks lived in wikis nobody maintained. Jira tracked work but not systems. Git history contained truth but nobody was reading it systematically. Teams were making decisions - architecture, staffing, priority - without a clear map of the landscape they were working in.</p>

    <h2>Task:</h2>
    <p>I needed to build a system that could identify, catalog, and analyze WFG production applications by combining signals from multiple sources - git repositories, Jira release data, and runbook documentation - into a single navigable interface. The goal wasn't just a dashboard. It was infrastructure intelligence: a system that surfaces ownership, deployment patterns, risk indicators, and relationship data that teams can act on.</p>

    <h2>Action:</h2>
    <ul>
    <li><strong>Agentic Architecture:</strong> Designed the app as an agentic workflow - AI-driven analysis pipelines that ingest git metadata, parse Jira tickets for release context, and cross-reference runbook data to build a composite picture of each application's state, ownership, and operational patterns.</li>
    <li><strong>Git Analysis Engine:</strong> Built automated analysis of repository structure, commit patterns, contributor graphs, and deployment artifact relationships to identify active vs. dormant applications, ownership concentration, and architectural patterns.</li>
    <li><strong>Jira Integration:</strong> Connected release and delivery data from Jira to map deployment cadence, incident frequency, and team velocity per application - turning project management data into operational intelligence.</li>
    <li><strong>Self-Service Interface:</strong> Built an internal web application that lets teams explore the production landscape, understand dependencies, and make informed decisions without needing to ask someone who "just knows."</li>
    </ul>

    <h2>Result:</h2>
    <ul>
    <li><strong>Visibility:</strong> For the first time, teams could see the full landscape of production applications - what exists, who owns it, how often it deploys, and where the risks concentrate.</li>
    <li><strong>Decision Quality:</strong> Architecture and staffing decisions became data-informed rather than tribal-knowledge-dependent.</li>
    <li><strong>Leverage Pattern:</strong> The app embodies the core principle: build a system once that continuously generates intelligence, rather than relying on people to manually track and communicate state.</li>
    </ul>

    <p>This project represents the kind of work I find most valuable - turning scattered technical signals into something teams can use to understand ownership, risk, dependencies, and next steps. The system does the work so people don't have to.</p>

    <h2>The App</h2>
    <img src="./infoposts/agentic-repo-screenshot.jpg" alt="Agentic Workflow App screenshot showing repository analysis interface" style="width:100%; border-radius:12px; margin:1rem 0;" />
    `
    },

    "cognitoIdentityArchitecture": {
        "title": "Cognito + Enterprise Identity: Auth Architecture for 250K External Agents",
        "imgSrc": "./infoposts/cognito-identity.png",
        "post": `
    <h2>Situation:</h2>
    <p>WFG Digital Portal needed a secure, scalable authentication system to serve approximately 250,000 external agents. The platform required enterprise identity integration - connecting Cognito to existing corporate identity providers while maintaining the security posture, session management, and access patterns appropriate for a financial services platform with external users at scale.</p>

    <h2>Task:</h2>
    <p>Design and implement the full authentication architecture: Cognito configuration, enterprise identity provider integration, IAM policies, API Gateway authorization, Terraform infrastructure, and the auth flow patterns that would serve as the foundation for the portal. This wasn't just "set up Cognito" - it was designing the identity layer for a platform where getting auth wrong means regulatory risk, user friction, and security exposure at scale.</p>

    <h2>Action:</h2>
    <ul>
    <li><strong>Architecture Design:</strong> Designed the complete auth flow - user pools, identity pools, enterprise federation, token management, session handling, and the integration points between Cognito, API Gateway, and downstream services.</li>
    <li><strong>Terraform Implementation:</strong> Built the entire identity infrastructure as code - Cognito user pools, app clients, identity providers, IAM roles and policies, API Gateway authorizers - all reproducible, auditable, and environment-promotable.</li>
    <li><strong>IAM & API Gateway:</strong> Designed fine-grained IAM policies and API Gateway authorization patterns that enforce least-privilege access while keeping the developer experience clean for teams building on top of the platform.</li>
    <li><strong>Enterprise Federation:</strong> Integrated with corporate identity providers to enable SSO flows while maintaining the Cognito-native patterns that external agents would authenticate through.</li>
    <li><strong>Security Posture:</strong> Designed MFA flows, token rotation, session management, and account recovery patterns appropriate for financial services compliance requirements.</li>
    </ul>

    <h2>Result:</h2>
    <ul>
    <li><strong>Scale-Ready Auth:</strong> A production identity system serving ~250K external agents with enterprise-grade security, built entirely in Terraform and designed to be maintained by the team long after initial implementation.</li>
    <li><strong>Developer Leverage:</strong> Teams building features on the portal inherit a well-designed auth layer - they don't need to think about identity, tokens, or authorization patterns because the platform handles it correctly by default.</li>
    <li><strong>Compliance Foundation:</strong> The architecture satisfies financial services security requirements by design, not by afterthought - audit trails, session controls, and access patterns are baked into the infrastructure layer.</li>
    </ul>

    <p>Cloud Archiecture is one of those systems where getting it right early creates enormous leverage - every team building on the platform benefits from decisions made once at the foundation layer. Getting it wrong creates compounding technical debt and security risk. This project was about getting it right.</p>
    `
    },

    "almModernization": {
        "title": "ALM Modernization: Replacing Legacy Systems with Event-Driven AWS Patterns",
        "imgSrc": "./infoposts/alm-modernization.png",
        "post": `
    <h2>Situation:</h2>
    <p>Transamerica's ALM (Asset Liability Management) hedging systems ran on legacy on-premises and EC2-based workflows - batch-oriented, manually triggered, operationally expensive, and fragile. The modeling teams depended on Windows Service systems for data processing and email-based reporting for finance, risk, and executive stakeholders. When something broke, recovery was manual and tribal-knowledge-dependent. The systems worked, but they didn't scale, didn't self-heal, and didn't give teams the operational visibility they needed.</p>

    <h2>Task:</h2>
    <p>Lead the modernization of ALM hedging systems - replace legacy workflows with AWS-native patterns that improve reliability, reduce operational overhead, and create a foundation that modeling teams can build on rather than work around. Simultaneously, replace the manual email-based reporting system with a centralized, self-service data platform.</p>

    <h2>Action:</h2>
    <ul>
    <li><strong>Event-Driven Architecture:</strong> Designed and implemented replacements for legacy batch workflows using Lambda, S3, and event-driven pipeline patterns - moving from "someone runs this manually" to "the system reacts to data arriving."</li>
    <li><strong>Data Pipeline Design:</strong> Redesigned data ingestion and processing pipelines for high-volume financial, market, and policy data - improving throughput, reliability, and observability across the pipeline stages.</li>
    <li><strong>Self-Service Data Platform:</strong> Replaced manual email-based reporting with a centralized data platform that finance, risk, and executive stakeholders could query directly - removing the dependency on someone generating and sending reports manually.</li>
    <li><strong>Web Application POC:</strong> Built a web application proof-of-concept to replace existing Windows Service systems, demonstrating that the same processing could be handled by modern, maintainable, observable services rather than opaque background processes.</li>
    <li><strong>Standards & Frameworks:</strong> Created reusable Python API + React frameworks with Engineering Excellence to standardize internal application development across modeling teams - so the modernization pattern could be repeated without re-inventing it each time.</li>
    <li><strong>AI-Assisted Development:</strong> Introduced agentic AI workflows (Amazon Q, Kiro) to ALM developers, improving productivity and establishing patterns for AI-assisted development that teams adopted independently.</li>
    </ul>

    <h2>Result:</h2>
    <ul>
    <li><strong>Operational Improvement:</strong> Reduced operational overhead by replacing manual, batch-oriented workflows with event-driven systems that self-trigger, self-monitor, and surface failures automatically rather than silently.</li>
    <li><strong>Stakeholder Self-Service:</strong> Finance, risk, and executive stakeholders gained direct access to the data they needed without waiting for someone to generate and email a report - decisions happen faster when data access doesn't have a human bottleneck.</li>
    <li><strong>Repeatable Patterns:</strong> The frameworks and standards built during this work became the default for new internal applications - each new project starts further ahead because the foundation patterns already exist.</li>
    <li><strong>Developer Productivity:</strong> AI-assisted development patterns improved how teams write and review code, with adoption spreading organically beyond the initial ALM teams.</li>
    </ul>

    <p>This project exemplifies the transition from "systems that work when someone watches them" to "systems that work because they're designed to." The goal was never just to migrate to AWS - it was to build the kind of infrastructure that makes the next team's job easier, not harder.</p>
    `
    },

    "about": {
        "title": "About Alia",
        "imgSrc": "./infoposts/alia-digital-nomad-portrait.jpeg",
        "post": `
    <p>Hi, I'm Alia.</p>

    <p>I'm a Systems Architect for Developer Leverage - a Southern California-based Principal Engineer, AWS Certified Solutions Architect, and the person teams bring in to design systems that compound engineering velocity. I design the platforms, automation, and delivery systems that make engineering organizations fast, safe, and autonomous.</p>

    <p>My work focuses on the infrastructure layer that most teams struggle to get right: release orchestration, self-service platforms, CI/CD architecture, IaC frameworks, developer environment tooling, and the systems that turn tribal knowledge into codified, repeatable patterns. I design systems that scale teams - architecture that makes the next person's job easier by default.</p>

    <p>At Transamerica, I set technical direction for WFG Digital as Principal Engineer - Developer Experience & Platform. I design AWS architecture patterns, Terraform standards, infrastructure testing approaches, and internal tooling that teams adopt because it makes their work easier, not because they're told to. Before that, I shaped ALM modernization, cloud data architecture, and engineering standards across hedging and analytics business units.</p>

    <p>At AWS Professional Services, I consulted on cloud migration architecture, cost optimization, and delivery system design for enterprise clients. At loanDepot, I led release engineering through pandemic-era hypergrowth - automating the orchestration of 1200+ components, cutting multi-hour release windows down to predictable, dependency-aware automated deployments, and building the custom CMDB that mapped ownership and deployable relationships across the org.</p>

    <p>The through-line in my career is always the same question: what system can I build now that creates leverage for the next team? I'm drawn to the work that sits between code, infrastructure, process, and people - where a good answer has to be understandable, repeatable, secure, and practical enough for teams to trust after the architect leaves the room.</p>

    <p>Currently, I'm exploring the intersection of AI-augmented developer workflows, agentic tooling, and platform engineering - building toward systems that don't just automate tasks but actively increase resilience and surface the next right action.</p>

    <p>I grew up near the border in Southern California and spent years teaching English in Colombia. Those experiences shaped how I lead: assume intelligence, explain clearly, make room for questions, and help people build confidence through useful structure rather than authority.</p>

    <p>Outside of engineering, I'm drawn to travel, anthropology, architecture, art, and the emotional atmosphere of places. I feel most alive exploring unfamiliar cities, wandering museums, or discovering the details that make cultures feel real. That curiosity shows up in my engineering too - I want to understand why systems were built the way they were before I redesign them.</p>

    <p>If you're building a team or platform where strong systems design matters upfront - not after the first outage - I'd like to talk.</p>
    `
    }
}
