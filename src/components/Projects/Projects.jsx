import { useState } from "react"
import { motion } from "framer-motion"
import css from "./Projects.module.scss"
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion"
import { Link } from 'react-router-dom'
import { projects } from '../../utils/data'

const ProjectCard = ({ project }) => {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed || !project.imgSrc) {
    return (
      <div className={css.fallbackCard} style={{ background: project.bg }}>
        <span className={css.fallbackTitle}>{project.title}</span>
        <span className={css.fallbackSub}>{project.subtitle}</span>
      </div>
    )
  }

  return (
    <img
      src={project.imgSrc}
      alt={project.title}
      onError={() => setImgFailed(true)}
    />
  )
}

const Projects = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.10 }}
      className={`paddings ${css.wrapper}`}
    >
      <span className="anchor" id="projects" />

      <div className={`innerWidth flexCenter ${css.container}`}>
        <motion.div variants={textVariant(.4)} className={`flexCenter ${css.heading}`}>
          <div>
            <h2 className="primaryText">Projects</h2>
            <p className={css.subheading}>Other things I build, create, and ship, just for fun :)</p>
          </div>
        </motion.div>

        <div className={css.showCase}>
          {projects.map((project, i) => (
            <Link to={`/projects/${project.slug}`} key={project.slug}>
              <motion.div variants={fadeIn("up", "tween", 0.5 + i * 0.15, 0.6)} className={css.cardWrap}>
                <ProjectCard project={project} />
                <div className={css.cardLabel}>
                  <span>{project.title}</span>
                  <span>{project.subtitle}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
