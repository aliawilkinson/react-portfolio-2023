import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { projects } from '../../utils/data'
import css from './OtherProjectDetail.module.scss'
import { motion } from 'framer-motion'
import { staggerChildren, fadeIn } from '../../utils/motion'
import { analytics, ANALYTICS_EVENTS } from '../../utils/analytics'
import SoundCloudPlayer from '../MusicPlayer/SoundCloudPlayer'

const OtherProjectDetail = () => {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  useEffect(() => {
    if (project?.soundcloudUrl) {
      analytics.trackEvent(ANALYTICS_EVENTS.MUSIC_PAGE_VIEWED, { project: project.title })
    }
  }, [project])

  if (!project) {
    return (
      <section className={`paddings ${css.wrapper}`}>
        <div className="innerWidth">
          <p>Project not found.</p>
          <Link to="/other-projects" className={css.backLink}>← Back to Projects</Link>
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
        <Link to="/other-projects" className={css.backLink}>← Back to Projects</Link>

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
          <motion.div variants={fadeIn("up", "tween", 0.5, 0.6)}>
            <SoundCloudPlayer isOnMusicPage={true} />
          </motion.div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <motion.div variants={fadeIn("up", "tween", 0.55, 0.6)} className={css.gallery}>
            <h2>Gallery</h2>
            <div className={css.galleryGrid}>
              {project.gallery.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`${project.title} - ${index + 1}`} />
              ))}
            </div>
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

export default OtherProjectDetail
