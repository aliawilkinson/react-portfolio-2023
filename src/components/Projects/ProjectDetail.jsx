import { useParams, Link } from 'react-router-dom'
import { projects } from '../../utils/data'
import css from './ProjectDetail.module.scss'
import { motion } from 'framer-motion'
import { staggerChildren, fadeIn } from '../../utils/motion'

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <section className={`paddings ${css.wrapper}`}>
        <div className="innerWidth">
          <p>Project not found.</p>
          <Link to="/" className={css.backLink}>← Back to home</Link>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className={`paddings ${css.wrapper}`}
    >
      <div className={`innerWidth ${css.container}`}>
        <Link to="/" className={css.backLink}>← Back</Link>

        <motion.h1 variants={fadeIn("up", "tween", 0.2, 0.6)} className={css.title}>
          {project.title}
        </motion.h1>
        <motion.p variants={fadeIn("up", "tween", 0.3, 0.6)} className={css.subtitle}>
          {project.subtitle}
        </motion.p>
        <motion.p variants={fadeIn("up", "tween", 0.4, 0.6)} className={css.description}>
          {project.description}
        </motion.p>

        {project.soundcloudUrl && (
          <motion.div variants={fadeIn("up", "tween", 0.5, 0.6)} className={css.player}>
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(project.soundcloudUrl)}&color=%236D4B8A&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
              title={`${project.title} - SoundCloud Player`}
            />
          </motion.div>
        )}

        {project.links && project.links.length > 0 && (
          <motion.div variants={fadeIn("up", "tween", 0.6, 0.6)} className={css.links}>
            <h2>Listen on</h2>
            <div className={css.linkGrid}>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.platformLink}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default ProjectDetail;
