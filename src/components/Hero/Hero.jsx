import React from 'react'
import css from './Hero.module.scss'
import { calculateYearDifference } from '../../utils/data'
import { motion } from 'framer-motion'
import { staggerChildren, fadeIn } from "../../utils/motion"

const Hero = () => {
    return (
        <section className={`paddings ${css.wrapper}`}>
            <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.025 }}
                className={`innerWidth ${css.container}`}>
                <span className="anchor" id="hero" />

                {/* top-left: headline */}
                <motion.div
                    variants={fadeIn("right", "tween", 0.2, 1)}
                    className={css.headline}>
                    <span className='primaryText'>
                        I'm Alia. <br />
                        I design systems <br />
                        that create leverage.
                    </span>
                </motion.div>

                {/* center: portrait — spans both grid rows on desktop */}
                <motion.div
                    variants={fadeIn("up", "tween", 0.3, 1)}
                    className={css.person}>
                    <img src="./rock-portrait.jpg" alt="Alia Wilkinson" />
                </motion.div>

                {/* top-right: tagline */}
                <motion.div
                    variants={fadeIn("left", "tween", 0.2, 1)}
                    className={css.tagline}>
                    <span className='secondaryText'>
                        Systems Architect for Developer Leverage. <br />
                        I build platforms, delivery systems, and automation <br />
                        that prevent failure and compound engineering velocity. <br />
                        Remote from SoCal.
                    </span>
                </motion.div>

                {/* bottom-left: years experience */}
                <motion.div
                    variants={fadeIn("right", "tween", 0.4, 1)}
                    className={css.experience}>
                    <div className="primaryText">{calculateYearDifference()}</div>
                    <div className="secondaryText">
                        <div>Years</div>
                        <div>Experience</div>
                    </div>
                </motion.div>

                {/* bottom-right: cert badge */}
                <motion.div
                    variants={fadeIn("left", "tween", 0.4, 1)}
                    className={css.certificate}>
                    <img src='./aws-sol-arch.png' alt="AWS Solutions Architect badge" />
                    <span>AWS SOLUTIONS ARCHITECT</span>
                    <span>SYSTEMS ARCHITECTURE &amp; DEVELOPER LEVERAGE</span>
                </motion.div>

            </motion.div>
        </section>
    )
}

export default Hero
