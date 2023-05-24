import React from 'react'
import css from './Portfolio.module.scss'
import { motion } from 'framer-motion'
import { staggerChildren, fadeIn, } from "../../utils/motion"

const Portfolio = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}
        >

            <div className={`innerWidth flexCenter ${css.container}`}>
                <div className={css.heading}>
                    <div>
                        <span className='primaryText'>
                            Latest Works
                        </span>
                        <p style={{ marginTop: "10px" }}>
                            Perfect solutions for digital experiences
                        </p>
                    </div>
                    <span className='secondaryText'>
                        Explore More Works
                    </span>

                    <div className={`flexCenter ${css.showCase}`}>
                        <motion.img
                            variants={fadeIn("up", "tween", 0.5, 0.6)}
                            src='showCase1.png'
                            alt='project'
                            className='showImg'
                        />
                        <motion.img
                            variants={fadeIn("up", "tween", 0.7, 0.6)}
                            src='showCase2.png'
                            alt='project'
                            className='showImg'
                        />
                        <motion.img
                            variants={fadeIn("up", "tween", 0.9, 0.6)}
                            src='showCase3.png'
                            alt='project'
                            className='showImg'
                        />
                    </div>
                </div>

            </div>
        </motion.section>
    )
}

export default Portfolio