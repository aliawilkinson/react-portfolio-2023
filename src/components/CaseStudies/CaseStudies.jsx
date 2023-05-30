import React from "react"
import { motion } from "framer-motion"
import css from "./CaseStudies.module.scss"
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion"
import { Link } from 'react-router-dom'
import Resume from '../Resume/Resume'

const CaseStudies = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper} bg-primary`}>

            <Link to="CaseStudies" className="anchor" id="CaseStudies" />

            <div className={`innerWidth flexCenter ${css.container}`}>


                <motion.div variants={textVariant(.4)} className={`flexCenter ${css.heading}`}>
                    <div>
                        <span className="primaryText">Case Studies</span>
                        <p style={{ marginTop: "10px" }}>Efficient solutions for digital experiences</p>
                    </div>
                    {/* <span className="secondaryText">Explore More Works</span> */}
                </motion.div>


                <div className={`flexCenter ${css.showCase}`}>
                    <Link to='/cmdletCreationTemplate' target="_blank">
                        <motion.img variants={fadeIn("up", "tween", .5, .6)} src="./infoposts/cmdletautomation.png" alt="project" />
                    </Link>
                    <Link to='/releaseofreleases' target="_blank">
                        <motion.img variants={fadeIn("up", "tween", .7, .6)} src="./infoposts/ror.png" alt="project" />
                    </Link>
                    <Link to='/iacPipelineValidation' target="_blank">
                        <motion.img variants={fadeIn("up", "tween", .7, .6)} src="./infoposts/iac-pipeline-test.png" alt="project" />
                    </Link>
                    <Link to='/amplifyReactMigApp' target="_blank">
                        <motion.img variants={fadeIn("up", "tween", .7, .6)} src="./infoposts/mig-app.png" alt="project" />
                    </Link>
                </div>
            </div>
        </motion.section>
    )
}

export default CaseStudies