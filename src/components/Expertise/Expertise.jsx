import React from 'react'
import { projectExperience, whatIHelpWith } from '../../utils/data'
import css from './Expertise.module.scss'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, textVariant } from '../../utils/motion.js'

const metrics = [
    {
        value: '1267+',
        label: 'components deployed and managed',
    },
    {
        value: '267%',
        label: 'uptime lift for customer platforms',
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
                    <span className={css.eyebrow}>Operations console</span>
                    <span className='primaryText'>Expertise</span>
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
                                        <span>{exp.years} years deep</span>
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
