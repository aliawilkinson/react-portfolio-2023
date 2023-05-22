import React from 'react'
import css from './Experience.module.scss'
import { motion } from 'framer-motion'
import { staggerChildren, textVariant2, zoomIn, fadeIn } from '../../utils/motion'
import { workExp } from '../../utils/data'

const Experience = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}
        >

            <div className={`flexCenter innerWidth ${css.container}`}>
                <span className="primaryText yPaddings">Work Experience</span>

                <div className={`flexCenter ${css.experiences}`}>
                    {
                        workExp.map((exp, i) => {
                            return (
                                <motion.div className={`flexCenter ${css.oneExp}`}
                                    variants={textVariant2}
                                    key={i}>
                                    <div className={css.post}>
                                    {/* <span><span className={css.circle} style={{ background: exp.dotColor }}></span></span> */}
                                        <h1>{exp.place}</h1>
                                        <p>{exp.tenure}</p>
                                    </div>
                                    <div className={css.role}>
                                        <h1>{exp.role}</h1>
                                        <p>{exp.detail}</p>

                                    </div>
                                </motion.div>
                            )
                        })
                    }
                    <motion.div variants={zoomIn(1, 1)} className={css.progressbar}>
                        <motion.div variants={fadeIn("down", "tween", 2, 1.5)} className={css.line}></motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
// 6D4B8A
// 8897B8
// B8A295
export default Experience