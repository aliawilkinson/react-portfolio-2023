import React from "react";
import { workExp } from "../../utils/data";
import css from "./Experience.module.scss";
import { motion } from 'framer-motion'
import { fadeIn, slideIn, staggerChildren, textVariant2, zoomIn } from "../../utils/motion";
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import Resume from "../Resume/Resume";

const Experience = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className={`paddings ${css.wrapper}`}
        >
            <Link to="experience" className="anchor" id="experience" />

            <div className={`innerWidth flexCenter ${css.container}`}>
                {/* heading */}
                <span className="primaryText yPaddings">Experience</span>
                {/* <Resume /> */}
                <div className={`flexCenter ${css.experiences}`}>
                    {workExp.map((exp, i) => {
                        return (
                            <motion.div variants={textVariant2} key={i} className={`flexCenter ${css.exp}`}>
                                <div className={css.post}>
                                    <h1>{exp.place}</h1>
                                    <p>{exp.tenure}</p>
                                </div>
                                <div className={css.role}>
                                    <h1>{exp.role}</h1>
                                    <div>{Parser(exp.detail)}</div>
                                </div>
                            </motion.div>
                        );
                    })}

                    <motion.div variants={zoomIn(1, 1)} className={css.progressbar}>
                        <motion.div variants={fadeIn("down", "tween", 2, 1.5)} className={css.line}></motion.div>
                        <div><div className={css.circle} style={{ background: "#6D4B8A" }}></div></div>
                        <div><div className={css.circle} style={{ background: "#8897B8" }}></div></div>
                        <div><div className={css.circle} style={{ background: "#B8A295" }}></div></div>
                        <div><div className={css.circle} style={{ background: "#EEC048" }}></div></div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Experience;
