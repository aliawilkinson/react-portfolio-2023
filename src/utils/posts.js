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

    "about": {
        "title": "About Alia",
        "imgSrc": "./infoposts/alia-digital-nomad-portrait.jpeg",
        "post": `
    <p>Hi, I'm Alia.</p>

    <p>I'm a Southern California-based Principal Software Engineer, AWS Certified Solutions Architect, systems thinker, artist, and educator. I work remotely with distributed teams on AWS infrastructure architecture, Terraform, developer experience, CI/CD, testing standards, automation, and the connective tissue between applications, platforms, and delivery process.</p>

    <p>At Transamerica, I was on ALM Hypercare from June 2024 to April 2026, working across hedging modernization, secure AWS data flows, reusable Python API and React standards, architecture review, CI/CD troubleshooting, testing standards, and production support. In April 2026, I started as Principal Engineer - Developer Experience on the WFG team, where my work now includes infrastructure architecture, Terraform patterns, DACA presentations, Jira administration and automation, Agile training, cost-aware cloud practices, and cross-functional technical direction.</p>

    <p>Recently, I built an internal app that analyzes repositories and Jira tickets to map applications across the organization. It carries forward a pattern I learned at loanDepot, where I helped lead DevOps engineers through rapid pandemic-era growth by automating releases, standardizing app configuration, and working on a custom metadata/configuration database that tracked products, components, settings, and deployable relationships in one place.</p>

    <p>That is the kind of work I like most: turning scattered technical signals into something teams can use to understand ownership, risk, dependencies, and next steps. I am also unusually comfortable in high-pressure situations, which makes me useful in production support, architecture review, release coordination, and the sort of troubleshooting sessions where everyone needs the room to get calmer and more precise.</p>

    <p>I grew up near the border in Southern California and spent years teaching English in Colombia after earning my TEFL certification. Those experiences shaped the way I lead: assume intelligence, explain clearly, make room for questions, and help people build confidence through useful structure.</p>

    <p>I'm deeply drawn to travel, anthropology, architecture, history, art, music, and the emotional atmosphere of places. I feel most alive exploring unfamiliar cities, wandering museums for hours, sitting in beautiful natural landscapes, or discovering the strange little details that make cultures feel alive. I'm endlessly curious about why people build the worlds they build.</p>

    <p>Technically, my background spans full-stack engineering, DevOps, cloud architecture, automation, SRE, distributed systems, CI/CD, and infrastructure design across both cloud and hybrid environments. I like work that sits between code, infrastructure, process, and people: the kind where a good answer has to be understandable, repeatable, secure, and practical enough for teams to keep using after the meeting ends.</p>

    <p>I document thoroughly, test thoughtfully, and look for the small design choices that make a platform easier to trust. Whether I'm reviewing Terraform, shaping app code standards, writing training material, architecting infrastructure, or jumping into an incident call, my goal is steady: make the next right action visible.</p>

    <p>Outside of engineering, I'm building creative and entrepreneurial projects focused on beauty, storytelling, wellness, and self-reinvention. I like technical rigor with a little color in it: clean systems, good taste, practical outcomes, and just enough eccentricity to keep the work alive.</p>

    <p>I believe good leadership is a mix of standards and steadiness: tell the truth, make the path visible, give people useful tools, and help the team leave things better than they found them.</p>

    <p>If you'd like to collaborate, build something useful, or untangle a complex system with someone who enjoys the work, I'd love to hear from you.</p>
    `
    }
}
