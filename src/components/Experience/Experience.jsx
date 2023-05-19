import React from 'react'
import css from './Experience.module.scss'
import { motion } from 'framer-motion'
import { staggerChildren } from '../../utils/motion'
import { workExp } from '../../utils/data'

const Experience = () => {
    return (
        <motion.section
            variants={staggerChildren}
            // initial='hidden'
            whileInView='show'
            viewport={{ once: false, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}
        >

            <div className={`flexCenter innerWidth ${css.container}`}>
                <span className="primaryText yPaddings">Work Experience</span>

                <div className={`flexCenter ${css.experiences}`}>
                    {
                        workExp.map((exp, i) => {
                            return (
                            <div className={`flexCenter ${css.exp}`} key={i}>
                                <div className={css.post}>
                                    <h1 className={exp.place}></h1>
                                    <h1 className={exp.tenure}></h1>
                                </div>
                                <div className={css.role}>

                                    <h1 className={exp.role}></h1>
                                    <h1 className={exp.detail}></h1>

                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </motion.section>
    )
}

export default Experience