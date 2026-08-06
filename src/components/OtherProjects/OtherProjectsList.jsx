import { useState } from "react"
import { motion } from "framer-motion"
import css from "./OtherProjects.module.scss"
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion"
import { Link } from 'react-router-dom'
import { projects } from '../../utils/data'

// Category display order
const CATEGORY_ORDER = ['Apps', 'Music', 'Art', 'Photography', 'Writing', 'Other']

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
      className={css.cardImage}
      src={project.imgSrc}
      alt={project.title}
      onError={() => setImgFailed(true)}
    />
  )
}

const OtherProjectsList = () => {
  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(project)
    return acc
  }, {})

  // Get categories in display order, filtering out empty ones
  const orderedCategories = CATEGORY_ORDER.filter(cat => groupedProjects[cat]?.length > 0)

  // Get the link for a project - either externalUrl or the detail page
  const getProjectLink = (project) => {
    return project.externalUrl || `/other-projects/${project.slug}`
  }

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className={`paddings ${css.wrapper}`}
    >
      <div className={`innerWidth ${css.container}`}>
        <motion.h1 variants={textVariant(0.2)} className="primaryText">Projects</motion.h1>
        <motion.p variants={fadeIn("up", "tween", 0.3, 0.6)} className={css.intro}>
          Things I build, create, and ship for fun — music, art, and more.
        </motion.p>

        {orderedCategories.map((category, catIndex) => (
          <motion.div 
            key={category} 
            variants={fadeIn("up", "tween", 0.4 + catIndex * 0.1, 0.6)}
            className={css.categorySection}
          >
            <h2 className={css.categoryHeading}>{category}</h2>
            <div className={css.projectGrid}>
              {groupedProjects[category].map((project, i) => (
                <motion.div key={project.slug} variants={fadeIn("up", "tween", 0.5 + i * 0.1, 0.6)}>
                  <Link to={getProjectLink(project)} className={css.cardWrap}>
                    <ProjectCard project={project} />
                    <div className={css.cardLabel}>
                      <span>{project.title}</span>
                      <span>{project.subtitle}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default OtherProjectsList
