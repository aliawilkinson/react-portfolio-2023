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
    name: "Platform & Infrastructure Architecture",
    date_started: "November 1, 2018",
    bg: "#6D4B8A",
  },
  {
    name: "Delivery Systems & CI/CD",
    date_started: "January 15, 2019",
    bg: "#8897B8",
  },
  {
    name: "Developer Experience & Enablement",
    date_started: "June 1, 2018",
    bg: "#C83C63",
  },
  {
    name: "Full Stack Product Development",
    date_started: "March 1, 2016",
    bg: "#B8A295",
  },
  {
    name: "Technical Leadership & Coordination",
    date_started: "November 1, 2018",
    bg: "#4A90A4",
  },
];

export const whatIHelpWith = [
  `I build the systems that engineering teams use to ship. Platform architecture, delivery pipelines, internal tooling, engineering standards — I design the infrastructure layer that makes teams faster, more reliable, and less dependent on tribal knowledge.`,
  `I get pulled into high-complexity situations where systems, delivery, or coordination are breaking down. My work sits at the intersection of cloud architecture, CI/CD reliability, developer experience, and technical leadership. I set direction, mentor engineers, unblock teams, and build leverage that compounds.`,
  `Currently a Principal Engineer at Transamerica, setting technical direction across platform engineering, infrastructure patterns, and developer enablement for WFG Digital. Previously shaped ALM modernization, data platform architecture, and engineering standards across multiple business units.`,
];

export const workExp = [
  {
    place: "Transamerica",
    tenure: "April 2026 - Present",
    role: "Principal Engineer — Developer Experience & Platform",
    detail:
      `<ul>
        <li>Setting technical direction for WFG Digital: platform architecture, infrastructure patterns, delivery systems, and engineering standards across teams.</li>
        <li>Built an internal metadata platform that maps repositories, ownership, Jira delivery context, and application settings across the organization — turning scattered knowledge into navigable infrastructure.</li>
        <li>Design AWS architecture patterns, Terraform standards, infrastructure testing approaches, reusable application frameworks, and cost-aware cloud practices that teams actually adopt.</li>
        <li>Lead technical direction presentations, engineering trainings, Agile process design, CI/CD troubleshooting, and production incident coordination.</li>
        <li>Python, Bash, Groovy, Jenkins, AWS, Azure, Terraform, FastAPI, React, Jira automation.</li>
      </ul>`,
    dotColor: '#B8A295'
  },
  {
    place: "Transamerica",
    tenure: "June 2024 - April 2026",
    role: "Principal Engineer — ALM Platform & Modernization",
    detail:
      `<ul>
        <li>Shaped ALM modernization through architecture review, platform design, production troubleshooting, and cross-team technical coordination across hedging and analytics systems.</li>
        <li>Designed secure AWS data flows, cloud migration strategies, EMR lifecycle planning, and cross-account data replication patterns for financial modeling workloads.</li>
        <li>Built reusable engineering standards: Python API frameworks (FastAPI), React patterns, auth/logging conventions, CI/CD templates, and dependency maintenance strategies adopted across modeling teams.</li>
        <li>Partnered across CI/CD, infrastructure, modeling, and platform teams on delivery reliability, secrets management, testing standards, and pipeline architecture.</li>
        <li>Python, Bash, Groovy, Jenkins, AWS, Azure, Terraform, FastAPI, React.</li>
      </ul>`,
    dotColor: '#8897B8'
  },
  {
    place: "Cube Software",
    tenure: "Sept 2023 - June 2024",
    role: "Senior Backend Engineer — FP&A Platform",
    detail:
      `<ul>
        <li>Built backend APIs for ETL integration and data connectivity on a Financial Planning & Analysis platform.</li>
        <li>Delivered full-stack edit-connection functionality end to end.</li>
      </ul>`,
    dotColor: '#B8A295'
  },
  {
    place: "Source 70 / AWS Professional Services",
    tenure: "June 2023 - Sept 2023",
    role: "Principal DevOps Architect",
    detail:
      `<ul>
        <li>AWS Professional Services consulting — architecture, cost optimization, and delivery enablement for enterprise clients.</li>
        <li>Built a React migration application on Amplify that reduced human error and accelerated service migrations for operations teams.</li>
        <li>Created cost optimization rubrics, container training programs, and CI/CD pipeline patterns in CodeDeploy.</li>
        <li>Repeatedly cited in customer feedback for training quality, pipeline efficiency, and documentation clarity.</li>
      </ul>`,
    dotColor: '#C83C63'
  },
  {
    place: "Amazon Web Services (AWS)",
    tenure: "Nov 2022 - June 2023",
    role: "DevOps Architect — Professional Services",
    detail:
      `<ul>
        <li>Consulting engagement focused on cloud migration architecture, developer enablement, and delivery system design.</li>
        <li>Built migration tooling, automated CI/CD pipelines, and training programs that scaled across multiple client engagements.</li>
        <li>Designed cost-aware deployment patterns and container orchestration strategies for enterprise workloads.</li>
      </ul>`,
    dotColor: '#6D4B8A'
  },
  {
    place: "loanDepot LLC",
    tenure: "Jan 2020 - Nov 2022",
    role: "Senior DevOps Engineer → Release Systems Lead",
    detail:
      `<ul>
        <li>Led release engineering through pandemic-era hypergrowth — kept delivery velocity steady as the engineering org roughly doubled in size.</li>
        <li>Managed 1200+ components and 800+ products across on-prem (F5, VMWare) and Azure (VMs, SaaS/PaaS), building a custom CMDB on ELK to track deployment metadata and component relationships.</li>
        <li>Automated release orchestration and configuration workflows that became the team's operating standard.</li>
        <li>Designed version control strategies for disaster recovery, built LD's first containerized build pipeline, and implemented semantic versioning for Bicep modules in Azure Container Registry.</li>
        <li>Developed ~75% of team training material, mentored junior/mid engineers, and conducted technical interviews.</li>
        <li>Promoted from Mid to Senior in 2021 based on delivery impact and leadership contributions.</li>
      </ul>`,
    dotColor: '#8897B8'
  },
  {
    place: "COFEBE Inc",
    tenure: "Nov 2018 - Dec 2019",
    role: "Software Engineer → Team Lead",
    detail:
      `<ul>
        <li>Promoted from engineer to team lead on data platform projects within the first year.</li>
        <li>Built data pipelines and a data lake on AWS (Redshift, Athena, CodeDeploy, Luigi) with backward-compatible Python (2.7/3.x) supporting legacy and modern consumers.</li>
        <li>Wrote QA test suites in Bash, unit tests in Python, and SQL transform scripts for PostgreSQL ETL workflows.</li>
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
