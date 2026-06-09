import React from 'react'
import { projectExperience, whatIHelpWith } from '../../utils/data'
import css from './Expertise.module.scss'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, textVariant } from '../../utils/motion.js'
import { calculateYearDifference } from '../../utils/data'

const metrics = [
    {
        value: '1200+',
        label: 'components managed across delivery systems',
    },
    {
        value: '10+',
        label: 'teams enabled through platform & standards work',
    },
]

const Expertise = () => {
    return (
        <section className={css.wrapper}>
            <a className="anchor" id="expertise"></a>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.10 }}
                className={`paddings yPaddings innerWidth ${css.container}`}>


                <motion.div
                    variants={textVariant(0.5)}
                    className={css.intro}>
                    <span className={css.eyebrow}>Systems &amp; leverage</span>
                    <span className='primaryText'>What I Build</span>
                    {whatIHelpWith.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </motion.div>

                <div className={css.dashboard}>
                    <div className={css.dashboardBar}>
                        <span>Capability Map</span>
                        <div aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className={css.capabilities}>
                        {
                            projectExperience.map((exp, i) => {
                                return <motion.div variants={fadeIn("up", "tween", (i + 1) * 0.16, 1)} className={css.exp} key={exp.name}>
                                    <div className={css.expMarker} style={{ background: exp.bg }}>
                                        <span></span>
                                    </div>
                                    <div>
                                        <span>{exp.name}</span>
                                        <span>{calculateYearDifference(exp.date_started)} years deep</span>
                                    </div>
                                </motion.div>
                            })
                        }
                    </div>

                    <div className={css.stats}>
                        {metrics.map((metric) => (
                            <div className={css.stat} key={metric.label}>
                                <span>{metric.value}</span>
                                <span>{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className={css.signalPanel}>
                        <span>Current signal</span>
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Expertise
