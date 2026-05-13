import React from "react"
import { motion } from "framer-motion"
import css from "./CaseStudies.module.scss"
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion"
import { Link } from 'react-router-dom'

const CaseStudies = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.10 }}
      className={`paddings ${css.wrapper} bg-primary`}
    >
      <Link to="CaseStudies" className="anchor" id="CaseStudies" />

      <div className={`innerWidth flexCenter ${css.container}`}>
        <motion.div variants={textVariant(.4)} className={`flexCenter ${css.heading}`}>
          <div>
            <span className="primaryText">Case Studies</span>
            <p className={css.subheading}>Efficient solutions for digital experiences</p>
          </div>
        </motion.div>

        <div className={`flexCenter ${css.showCase}`}>
          <Link to='/cmdletCreationTemplate' target="_blank">
            <motion.img
              variants={fadeIn("up", "tween", .5, .6)}
              src="./infoposts/cmdletautomation.png"
              alt="Empowering DevOps Excellence: PowerShell cmdlet automation"
            />
          </Link>
          <Link to='/releaseofreleases' target="_blank">
            <motion.img
              variants={fadeIn("up", "tween", .7, .6)}
              src="./infoposts/ror.png"
              alt="Release of Releases: release orchestration through automation"
            />
          </Link>
          <Link to='/iacPipelineValidation' target="_blank">
            <motion.img
              variants={fadeIn("up", "tween", .7, .6)}
              src="./infoposts/iac-pipeline-test.png"
              alt="IaC Pipeline Validation: who tests the testers"
            />
          </Link>
          <Link to='/amplifyReactMigApp' target="_blank">
            <motion.img
              variants={fadeIn("up", "tween", .7, .6)}
              src="./infoposts/mig-app.png"
              alt="Transforming app migrations with Amplify React"
            />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default CaseStudies;