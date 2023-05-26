import React from 'react'
import css from './Hero.module.scss'
import { calculateYearDifference } from '../../utils/data'
import { motion } from 'framer-motion'
import { staggerChildren, fadeIn, } from "../../utils/motion"

const Hero = () => {
    return (
        <section className={`paddings ${css.wrapper}`}>
            <motion.div
                variants={staggerChildren}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.025 }}

                className={`innerWidth ${css.container}`}>

                <div className={css.upperElements}>
                    <motion.span 
                    variants={fadeIn("right", "tween", 0.2, 1)}
                    className='primaryText'>
                        Hey There, <br />
                        I'm Alia.
                    </motion.span>
                    <motion.span
                    variants={fadeIn("left", "tween", 0.2, 1)}
                    className='secondaryText'>
                        I come up with novel solutions <br />
                        for real world problems using software, <br />
                        and I love what I do.
                    </motion.span>
                </div>

                <motion.div 
                variants={fadeIn("up", "tween", 0.3, 1)}
                className={css.person}>
                    <img src="./rock-portrait.jpg" alt="" />
                </motion.div>

                <div className={css.lowerElements}>
                    <div className={css.experience}>
                        <div className="primaryText">{calculateYearDifference()}</div>
                        <div className="secondaryText">
                            <div>
                                Years
                            </div>
                            <div>
                                Experience
                            </div>
                        </div>
                    </div>
                    <div className={css.certificate}>
                        <img src='./aws-sol-arch.png' alt="" />
                        <span>CERTIFIED AWS SOLUTIONS ARCHITECT </span>
                        <span>SOFTWARE ENGINEER</span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero