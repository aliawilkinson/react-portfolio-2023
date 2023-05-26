import React from 'react'
import { projectExperience, whatIHelpWith } from '../../utils/data'
import css from './Expertise.module.scss'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, textVariant } from '../../utils/motion.js'

const Expertise = () => {
    return (
        <section className={css.wrapper}>
            <a className="anchor" id="expertise"></a>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.10 }}
                className={`paddings yPaddings innerWidth flexCenter ${css.container}`}>


                {/* left side */}
                <div className={css.leftSide}>
                    {
                        projectExperience.map((exp, i) => {
                            return <motion.div variants={fadeIn("right", "tween", (i + 1) * 0.2, 1)} className={css.exp} key={i}>
                                <div style={{ background: exp.bg }} className="flexCenter">
                                    {/* <exp.icon size={25} color="white"/> */}
                                </div>
                                <div>
                                    <span>{exp.name}</span>
                                    <span className='secondaryText'>{exp.years} Years Experience</span>
                                </div>
                            </motion.div>
                        })
                    }
                </div>


                {/* right */}
                <motion.div
                    variants={textVariant(0.5)}
                    className={css.rightSide}>

                    <span className='primaryText'>Expertise</span>
                    {whatIHelpWith.map((paragraph, i) => <span className='secondaryText' key={i}>{paragraph}</span>)}


                    <div className={`flexCenter ${css.stats}`}>
                        <div className={`flexCenter ${css.stat}`}>
                            <span className='primaryText'>1267+</span>
                            <span className='secondaryText'>Components Deployed and Managed</span>
                        </div>
                        <div className={`flexCenter ${css.stat}`}>
                            <span className='primaryText'>267%</span>
                            <span className='secondaryText'>Increased up time for customer platforms</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Expertise