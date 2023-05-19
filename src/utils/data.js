import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CiMobile1 } from "react-icons/ci";
import { MdWorkspacesOutline } from "react-icons/md";
export const projectExperience = [
  {
    name: "Website Design",
    projects: 76,
    icon: HiOutlineDesktopComputer,
    bg: "#286F6C",
  },
  {
    name: "Mobile App Design",
    projects: 63,
    icon: CiMobile1,
    bg: "#EEC048",
  },
  {
    name: "Brand Identity",
    projects: 47,
    icon: MdWorkspacesOutline,
    bg: "#F26440",
  },
];

export const whatIHelpWith = [
  `Have a system that needs optimizing or a business problem that could be solved with 
  software? You're in luck! 

  I have a wealth of experience troubleshooting networking, infrastructure, apps, 
  and security in multiple environments, including on-prem VMware VMs, Azure, 
  and AWS. I've deployed over 1,000 three-tier+ applications in and out of 
  containers in Enterprise environments. I came to DevOps from the App Dev route initially
  by deploying my own applications in containers. Since then I've worked with some of the
  most brilliant Network and Infrastructure engineers, teaming up to solve some of 
  Enterprise's toughest problems.
  
  Let's work together to find a solution to the problem
  you're eager to solve. I look forward to hearing from you.`,
];

export const workExp = [
  {
    place: "Amazon Web Services (AWS) - remote",
    tenure: "Nov 2022 - Present",
    role: "DevOps Architect Consultant",
    detail:
      `Professional Services Consulting for AWS, Certified Architect
      Built an Amplify React application to help operations engineers migrate services and business apps faster with fewer errors.
      Educated the team on how to develop and deploy web applications in a cost-effective, secure, and efficient manner.
      Built automated CI/CD pipelines in CodeDeploy.
      Created AWS's Cost Optimization rubrics and training programs for Cloud.
      Revamped AWS's Container training program for containers on AWS.
      Received positive customer feedback from several engineers.
      `,
  },
  {
    place: "loanDepot LLC",
    tenure: "Jan 2020 - Nov 2022",
    role: "Senior DevOps Engineer",
    detail:
      `Managed 1200 components and 800+ both on-prem (f5, VMWare, a closet in Foothill Ranch) and Azure (VMs and SaaS/PaaS).
      Promoted from Mid to Senior Engineer in 2021.
      Utilized PowerShell automation to orchestrate all on-prem releases, with release configurations managed in a custom CMDB built on ELK stack.
      Designed version control systems for disaster recovery and a hotfix environment, implementing semantic Git versioning for bicep modules stored in the Azure Container Registry.
      Built LD's first dockerized build pipeline to build and release a Chrome extension.
      Developed approximately 75% of training material, mentored mid and junior engineers, and conducted PowerShell proficiency interviews for new hires.
      Conducted application troubleshooting in Dynatrace, Kibana, and traditional diagnostic methods.
      `,
  },
  {
    place: "COFEBE Inc",
    tenure: "Nov 2018 - Dec 2019",
    role: "Software Engineer",
    detail:
      `Promoted from Software Engineer to Team Lead on data projects.
      Built a data pipeline and data lake using backward-compatible code with Python (2.7 and 3.x), AWS Redshift, AWS Athena, AWS CodeDeploy, Luigi, etc.
      Wrote QA test scripts in Bash for multiple pipelines and unit tests for all code delivered in Python.
      Created SQL transform scripts for PostgreSQL.
      Organized and directed internal talent, working closely with clients to execute requirements.
      Collaborated with an internal team using PHP 7.1 and Python 3.7 to develop a web application that mocks APIs for front-end developers.
      `,
  },
  {
    place: "A Show For A Change",
    tenure: "Oct 2018 - Mar 2019",
    role: "Full Stack Developer",
    detail:
      `Developed ReactJS front end with Webpack for the front-end team.
      Designed database structure and endpoints using LAMP stack and deployed on AWS.
      Responsible for SCRUM/Agile ceremonies.      
      `,
  },
];

export const comments = [
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people2.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people1.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people2.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people1.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people2.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people1.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people2.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people1.png",
  },
  {
    name: "Anamika Sandula",
    post: "Creative Manager",
    comment:
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: "./people2.png",
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
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
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
