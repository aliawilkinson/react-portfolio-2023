import { useState } from "react"
import { motion } from "framer-motion"
import css from "./CaseStudies.module.scss"
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion"
import { Link } from 'react-router-dom'
import { caseStudies } from '../../utils/data'

const CaseStudyCard = ({ study }) => {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed || !study.imgSrc) {
    return (
      <div className={css.fallbackCard} style={{ background: study.bg }}>
        <span>{study.alt}</span>
      </div>
    )
  }

  return (
    <img
      src={study.imgSrc}
      alt={study.alt}
      onError={() => setImgFailed(true)}
    />
  )
}

const CaseStudies = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.10 }}
      className={`paddings ${css.wrapper} bg-primary`}
    >
      <span className="anchor" id="CaseStudies" />

      <div className={`innerWidth flexCenter ${css.container}`}>
        <motion.div variants={textVariant(.4)} className={`flexCenter ${css.heading}`}>
          <div>
            <h2 className="primaryText">Case Studies</h2>
            <p className={css.subheading}>Systems I've designed to increase resilience and create leverage</p>
          </div>
        </motion.div>

        <div className={`flexCenter ${css.showCase}`}>
          {caseStudies.map((study, i) => (
            <Link to={`/${study.slug}`} key={study.slug}>
              <motion.div variants={fadeIn("up", "tween", 0.5 + i * 0.15, 0.6)}>
                <CaseStudyCard study={study} />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CaseStudies;
