import React from "react";
import { workExp } from "../../utils/data";
import css from "./Experience.module.scss";
import { motion } from 'framer-motion';
import { fadeIn, textVariant2, zoomIn } from "../../utils/motion";
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';

const Experience = () => {
  return (
    <motion.section
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.5 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`paddings ${css.wrapper}`}
    >
      <Link to="experience" className="anchor" id="experience" />

      <div className={`innerWidth flexCenter ${css.container}`}>
        <span className="primaryText">Experience</span>

        <div className={`flexCenter ${css.experiences}`}>
          {workExp.map((exp) => (
            <motion.div variants={textVariant2} key={exp.place} className={`flexCenter ${css.exp}`}>
              <div className={css.post}>
                <h1>{exp.place}</h1>
                <p>{exp.tenure}</p>
              </div>
              <div className={css.role}>
                <h1>{exp.role}</h1>
                <div>{Parser(exp.detail)}</div>
              </div>
            </motion.div>
          ))}

          <motion.div variants={zoomIn(1, 1)} className={css.progressbar}>
            <motion.div variants={fadeIn("down", "tween", 2, 1.5)} className={css.line} />
            {workExp.map((exp) => (
              <div key={exp.place}>
                <div className={css.circle} style={{ background: exp.dotColor }} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
