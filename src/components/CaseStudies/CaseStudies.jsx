import React from "react";
import { motion } from "framer-motion";
import css from "./CaseStudies.module.scss";
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion";
const CaseStudies = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper}`}>

            <a className="anchor" id="CaseStudies"></a>

            <div className={`innerWidth flexCenter ${css.container}`}>


                <motion.div variants={textVariant(.4)} className={`flexCenter ${css.heading}`}>
                    <div>
                        <span className="primaryText">Case Studies</span>
                        <p style={{ marginTop: "10px" }}>Efficient solutions for digital experiences</p>
                    </div>
                    {/* <span className="secondaryText">Explore More Works</span> */}
                </motion.div>


                <div className={`flexCenter ${css.showCase}`}>
                    <motion.img variants={fadeIn("up", "tween", .5, .6)} src="./infoposts/cmdletautomation.png" alt="project" />
                    <motion.img variants={fadeIn("up", "tween", .7, .6)} src="./infoposts/ror.png" alt="project" />
                    <motion.img variants={fadeIn("up", "tween", .7, .6)} src="./infoposts/iac-pipeline-test.png" alt="project" />
                    <motion.img variants={fadeIn("up", "tween", .7, .6)} src="./infoposts/mig-app.png" alt="project" />
                </div>
            </div>
        </motion.section>
    );
};

export default CaseStudies;