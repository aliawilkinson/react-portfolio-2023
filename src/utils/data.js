export function calculateYearDifference(startDateInput = 'October 1, 2015') {
  const startDate = new Date(startDateInput);
  const today = new Date();
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

  const differenceInMilliseconds = today - startDate;
  const differenceInYears = differenceInMilliseconds / millisecondsPerYear;

  return differenceInYears.toFixed(1);
}


export const projectExperience = [
  {
    name: "Systems Architecture & Failure Prevention",
    date_started: "November 1, 2018",
    bg: "#6D4B8A",
  },
  {
    name: "Delivery Automation & Release Engineering",
    date_started: "January 15, 2019",
    bg: "#8897B8",
  },
  {
    name: "Developer Experience & Internal Platforms",
    date_started: "June 1, 2018",
    bg: "#C83C63",
  },
  {
    name: "Infrastructure as Code & Cloud Design",
    date_started: "March 1, 2016",
    bg: "#B8A295",
  },
  {
    name: "AI-Augmented Tooling & Agentic Workflows",
    date_started: "January 1, 2024",
    bg: "#4A90A4",
  },
];

export const whatIHelpWith = [
  `I design systems that prevent failure and create leverage. Identity architecture, delivery automation, infrastructure patterns, and internal tooling — built so engineering teams ship faster without firefighting. The goal is always the same: make the system do the work so engineers can focus on what matters.`,
  `My work sits at the intersection of cloud architecture, release engineering, developer experience, and AI-augmented workflows. I don't get called in to fix what's broken — I design what hasn't been built yet. Auth systems for platforms serving hundreds of thousands of users, agentic tools that surface production intelligence, CI/CD gates that make engineering hygiene automatic, and the connective tissue that turns an engineering org from reactive to compounding.`,
  `Currently a Principal Engineer at Transamerica / WFG Digital, operating across architecture and implementation on high-stakes platform work. Previously designed release orchestration systems, cloud migration architecture, and internal platforms at AWS Professional Services, loanDepot, and COFEBE.`,
];

export const workExp = [
  {
    place: "Transamerica / WFG Digital",
    tenure: "April 2026 - Present",
    role: "Principal Engineer — Systems Architecture & Developer Leverage",
    detail:
      `<ul>
        <li>Recruited into WFG to raise the level of architecture, platform, and delivery on high-stakes work requiring real technical depth — operating as Principal Engineer across architecture and implementation.</li>
        <li>Drove Cognito + enterprise identity integration for WFG Digital Portal: Terraform, IAM, API Gateway, and auth flow design for a platform serving ~250K external agents.</li>
        <li>Built an agentic workflow app that identifies and analyzes production apps using git analysis combined with Jira release and runbook data — turning scattered signals into navigable infrastructure intelligence.</li>
        <li>Designing developer workflow tooling: testing suites, versioning strategies, branch protections, CI/CD gates, and configuration management apps that make engineering hygiene automatic rather than heroic.</li>
        <li>Step in across architecture, infrastructure, and delivery gaps to unblock teams, make decisions in motion, and keep work moving when ownership is fragmented or systems are stuck.</li>
        <li>Built internal apps, repeatable web app patterns, and authentication tooling that teams adopt as standard — designing leverage that compounds across the org.</li>
        <li>Python, Terraform, AWS (Cognito, API Gateway, IAM), React, Jira automation, agentic AI tooling.</li>
      </ul>`,
    dotColor: '#B8A295'
  },
  {
    place: "Transamerica / ALM",
    tenure: "June 2024 - April 2026",
    role: "Principal Engineer — ALM Modernization & Architecture",
    detail:
      `<ul>
        <li>Led modernization of ALM hedging systems, replacing legacy on-prem/EC2 workflows with AWS-native patterns (Lambda, S3, event-driven pipelines) — improving reliability and reducing operational overhead.</li>
        <li>Designed and improved data ingestion and processing pipelines for high-volume financial, market, and policy data serving risk, finance, and executive stakeholders.</li>
        <li>Acted as architect for web applications and data infrastructure — built a web application POC to replace existing Windows Service systems and replaced manual email-based reporting with a centralized, self-service data platform.</li>
        <li>Created reusable Python API + React frameworks with Engineering Excellence to standardize internal application development across modeling teams.</li>
        <li>Unblocked teams on Terraform, CI/CD, and infrastructure issues; established repeatable deployment and development patterns that reduced dependency on tribal knowledge.</li>
        <li>Taught and set up ALM developers with AI agentic workflows (Amazon Q, Kiro) — introduced AI-assisted development patterns that improved developer productivity across the org.</li>
        <li>Contributed architecture direction for cloud migration, resiliency, and technical debt reduction across ALM and Finance systems.</li>
        <li>Python, AWS (Lambda, S3, EMR), Terraform, FastAPI, React, Jenkins, AI/agentic tooling.</li>
      </ul>`,
    dotColor: '#8897B8'
  },
  {
    place: "Cube Software",
    tenure: "Sept 2023 - June 2024",
    role: "Senior Software Engineer — FP&A Platform",
    detail:
      `<ul>
        <li>Built APIs to integrate with third-party ETL systems, enabling data ingestion and downstream processing for financial planning and analytics (FP&A) systems.</li>
        <li>Developed backend and full-stack functionality for managing connections to external data sources.</li>
        <li>Led regular architectural design conversations that shaped how the team approached building, structuring, and scaling systems.</li>
        <li>Collaborated closely with a core group of engineers on systems design with a focus on how systems should be structured for long-term scalability.</li>
      </ul>`,
    dotColor: '#B8A295'
  },
  {
    place: "Source 70 Consulting",
    tenure: "June 2023 - Sept 2023",
    role: "DevSecOps Architect — AWS & Azure Government Cloud",
    detail:
      `<ul>
        <li>Built DevSecOps pipelines focused on automation, security, and cost optimization across AWS and Azure Government Cloud for compliant, reliable deployments.</li>
        <li>Developed ETL data pipelines on AWS GovCloud for secure utility data ingestion and processing.</li>
        <li>Implemented Infrastructure as Code (Terraform, Bicep, ARM, AWS CDK in Python) to create reproducible, maintainable environments.</li>
        <li>Applied cost optimization at the infrastructure and code level to reduce operational overhead for business-critical systems.</li>
        <li>Co-developed and presented a NASPI seminar on storing synchrophasor data in the cloud — explored architecture patterns for high-frequency, time-series data in distributed cloud environments.</li>
      </ul>`,
    dotColor: '#C83C63'
  },
  {
    place: "Amazon Web Services (AWS)",
    tenure: "Nov 2022 - June 2023",
    role: "DevOps Architect — Professional Services",
    detail:
      `<ul>
        <li>Provided Professional Services consulting for AWS customers — designed solutions for business problems using AWS services, automation, and architecture patterns focused on scalability, security, and cost efficiency.</li>
        <li>Built an Amplify + React application that helped operations engineers migrate services more reliably with fewer errors — eliminating manual toil from the migration process.</li>
        <li>Created a Cost Optimization Blueprint to help companies save money during a downturn — architecture-level decisions, not just resource trimming.</li>
        <li>Modernized internal training for AWS consultants: container SME training, cost optimization practices, and patterns for building secure, cost-effective web applications.</li>
        <li>Improved application reliability and uptime through better architecture patterns and operational practices.</li>
      </ul>`,
    dotColor: '#6D4B8A'
  },
  {
    place: "loanDepot LLC",
    tenure: "Feb 2021 - Nov 2022",
    role: "Senior DevOps Engineer — Lead",
    detail:
      `<ul>
        <li>Built and maintained DevOps pipelines across a large Azure environment supporting hundreds of projects and thousands of deployable components.</li>
        <li>Automated on-prem batch release processes across teams — standardized deployments and reduced manual error through orchestration design.</li>
        <li>Automated and managed thousands of releases in Azure DevOps using YAML pipelines, significantly improving deployment speed and reliability.</li>
        <li>Built a full enterprise-grade Terraform module suite for infrastructure provisioning, later re-implementing it in Bicep to support Azure-specific preview features and improve development velocity.</li>
        <li>Owned and maintained a custom internal configuration database supporting deployment coordination and system state across the org.</li>
        <li>Designed and implemented the company's technical interview process end-to-end — evaluation standards, interview structure, and hiring criteria for the DevOps team.</li>
        <li>Created ~75% of internal training materials, improving onboarding and standardizing engineering practices across the team.</li>
        <li>Identified gaps in tooling and workflows, built automation and systems around them, and turned those into repeatable practices adopted by other engineers.</li>
        <li>Served as on-call escalation point — ran releases and debugged production issues in real time with development teams.</li>
      </ul>`,
    dotColor: '#8897B8'
  },
  {
    place: "loanDepot LLC",
    tenure: "Jan 2020 - Feb 2021",
    role: "DevOps Engineer",
    detail:
      `<ul>
        <li>Hired from COFEBE contract — ramped into release engineering and pipeline automation across a large .NET/Azure environment.</li>
        <li>Automated the on-prem release process for batch releases, laying the groundwork for the orchestration system later scaled as Senior/Lead.</li>
        <li>Created CI/CD pipelines for builds, releases, and environment promotion using Azure DevOps and PowerShell.</li>
        <li>Built Terraform templates for deployments to Azure, establishing early IaC patterns the team later standardized on.</li>
        <li>Monitored and troubleshot production systems using ELK and Dynatrace during outages.</li>
        <li>Created ~50% of interviewing material and documented difficult-to-track legacy processes for future use.</li>
        <li>Promoted to Senior DevOps Engineer — Lead in Feb 2021 based on delivery impact and systems thinking.</li>
      </ul>`,
    dotColor: '#8897B8'
  },
  {
    place: "COFEBE Inc",
    tenure: "Nov 2018 - Dec 2019",
    role: "Software Engineer → Team Lead — Data Platform",
    detail:
      `<ul>
        <li>Promoted from engineer to team lead on data platform projects within the first year.</li>
        <li>Designed data pipelines and a data lake architecture on AWS (Redshift, Athena, CodeDeploy, Luigi) with backward-compatible Python (2.7/3.x) supporting legacy and modern consumers.</li>
        <li>Built QA test suites and ETL validation patterns that caught failures before production rather than after.</li>
        <li>Directed internal talent and coordinated directly with clients on requirements, delivery, and technical tradeoffs.</li>
      </ul>`,
    dotColor: '#B8A295'
  },
  {
    place: "A Show For A Change",
    tenure: "Oct 2018 - Mar 2019",
    role: "Full Stack Developer",
    detail:
      `<ul>
        <li>Built React front end with Webpack, designed database structure and REST endpoints on LAMP stack, deployed on AWS.</li>
        <li>Ran SCRUM ceremonies and coordinated delivery across a distributed team.</li>
      </ul>`,
    dotColor: '#C83C63'
  },
  {
    place: "Sunghost Industries",
    tenure: "Oct 2015 - Oct 2018",
    role: "Software Engineer — Web & Analytics",
    detail:
      `<ul>
        <li>Built websites, SEO systems, and GIS analysis tooling for small business clients. First professional engineering role — learned to ship end to end.</li>
      </ul>`,
    dotColor: '#C83C63'
  },
];


export const comments = [
  {
    name: "Brian Carpio",
    post: "Sr. Leader Focused On Cloud Engineering & Cloud Native Application Architecture",
    comment:
      "As Alia's team lead, I was impressed by her passion for technology, learning, and collaboration. She demonstrated an exceptional level of dedication to her work and was always willing to go the extra mile to ensure that the team delivered high-quality work on time. What truly sets Alia apart is her natural leadership abilities. From day one, it was evident that she had a knack for leadership and was able to inspire and motivate those around her. Her positive attitude, strong work ethic, and excellent communication skills made her a true asset to the team.",
    img: "./brian.jfif",
  },
  {
    name: "James Bailey",
    post: "Senior Software Architect at COFEBE Inc.",
    comment:
      "Alia is a motivated individual and quick to learn. She's friendly, outgoing, a great team player, and eager to learn new things. She was great to work with.",
    img: "./james_bailey.jfif",
  },
  {
    name: "James York",
    post: "Sr Cloud DevOps Engineer",
    comment:
      "Alia is one of the most brilliant engineers I have worked alongside with in my career. She can jump into any issue and pick it up like she's been working on it for years. Her knowledge on things like Azure DevOps, PowerShell, Terraform, and best practices to ensure security and repeatability were crucial to the team. Not only was she an awesome coworker professionally with her skillset, but she also was always so positive when jumping into firefighting issues. Frequently she made herself available to assist on issues when it was not required of her. I know she would make an excellent addition to any team she finds herself on.",
    img: "./james_york.jfif",
  },
  {
    name: "Patricia Chin",
    post: "Senior DevOps Engineer",
    comment:
      "Alia has led many key efforts and saw them through with much success. Some of these efforts include the migration and removal of an entire datacenter, as well as transforming/migrating of Terraform projects to Bicep. She is an amazing team player, and works well with others. Alia makes sure to keep any new processes documented, and communicates well both inside and outside the team. She is great at finding out why things are requested and figuring out the best solution for a problem. ",
    img: "./patricia.jfif",
  },
  {
    name: "Joel Bennet",
    post: "Senior DevOps Architect",
    comment:
      "When I met Alia, she had a well-deserved reputation as the expert on git and scrum, in addition to a mastery of the scripting and IaC tools and languages that made her one of the team's preferred interviewers. Her technical expertise, desire to do things well, and not settle for merely functional, and her willingness to hear out a contrary view, and rationally discuss alternative solutions also make her one of the team's favorite pairing partners.",
    img: "./joel.jfif",
  },
  {
    name: "Yaritza Cuevas",
    post: "Senior Software Engineer",
    comment:
      "It was such a pleasure to work with Alia. Her problem solving skills proved handy on many occasions while working together. She is friendly and very self motivated. She’s got a great work ethic and quick to solve problems that require immediate attention. A great addition to any team.",
    img: "./yari.jfif",
  },
  {
    name: "Stephen Berens",
    post: "Senior DevOps Engineer",
    comment:
      "Alia Wilkinson is an exceptional talent. She consistently produces exceptional work, and does so regardless of whether she’s tackling a project solo or with a team. She demonstrates mastery of seemingly any technology she works with and her contributions to both the team and teams work product are invaluable. Beyond her obvious expertise, she routinely augments the team knowledge base with detailed documentation, ensuring her progress is available to everyone and, further, is never hesitant to provide direct instruction where appropriate. She fundamentally enriches any team she is a member of by dependably delivering phenomenal solutions to any issue she addresses and continually investing in the team’s ongoing development. Working with Alia is both a privilege and a pleasure.",
    img: "./stephen.jfif",
  },
  {
    name: "Marc Foster",
    post: "Senior DevOps Engineer",
    comment:
      "I have worked with Alia on several occasions and have always been impressed with her ability to quickly identify and solve problems. She has a deep understanding of operational issues and is always willing to share her knowledge with others. She is the perfect person to have on any team, as she is always willing to jump in and help out wherever needed.",
    img: "./marc.jfif",
  },
  {
    name: "Jesse Porter",
    post: "Vice President, DevOps Engineering",
    comment:
      "Alia radiates calm and quiet competence every day. She is a top performer on my team. She consistently gives 100 percent effort to the team and plays a significant role in complex devops engineering work. She's willing to jump into any situation and provide technical expertise, whether it's a minor hiccup or an all-hands-on-deck emergency. She has formidable powershell, infrastructure, and automation skills that she leverages on the daily, and she's always excited to learn new tools and technologies",
    img: "./jesse_logo.png",
  },
];

export const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  touchMove: true,
  useCSS: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
