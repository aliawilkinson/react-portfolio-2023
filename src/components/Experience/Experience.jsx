import { workExp } from "../../utils/data";
import css from "./Experience.module.scss";
import { motion } from 'framer-motion';
import { fadeIn, textVariant2, zoomIn } from "../../utils/motion";
import Parser from 'html-react-parser';

const Experience = () => {
  return (
    <motion.section
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.5 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`paddings ${css.wrapper}`}
    >
      <span className="anchor" id="experience" />

      <div className={`innerWidth flexCenter ${css.container}`}>
        <span className="primaryText yPaddings">Experience</span>

        <div className={css.experiences}>

          {/* the vertical dashed line — one element, full height, sits behind all dots */}
          <motion.div variants={zoomIn(1, 1)} className={css.lineTrack}>
            <motion.div variants={fadeIn("down", "tween", 2, 1.5)} className={css.line} />
          </motion.div>

          {workExp.map((exp) => (
            <motion.div
              variants={textVariant2}
              key={`${exp.place}-${exp.role}-${exp.tenure}`}
              className={css.exp}
              style={{ "--accent": exp.dotColor }}
            >
              {/* left: company + tenure */}
              <div className={css.post}>
                <h1>{exp.place}</h1>
                <p>{exp.tenure}</p>
              </div>

              {/* center: dot — lives in the row, always aligned */}
              <div className={css.dotCol}>
                <div className={css.circle} />
              </div>

              {/* right: role + detail */}
              <div className={css.role}>
                <h1>{exp.role}</h1>
                <div>{Parser(exp.detail)}</div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
