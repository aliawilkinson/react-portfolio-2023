import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import css from "./Footer.module.scss";
import { motion } from 'framer-motion'
const Footer = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper}`}>
            <a className="anchor" id="footer"></a>


            <motion.div
                variants={footerVariants}
                className={`innerWidth yPaddings flexCenter ${css.container}`}>
                <div className={css.left}>
                    <span className="primaryText">
                        Let's make something <br />
                        amazing together.
                    </span>
                    <span className="primaryText">
                        Start by <a href="https://www.linkedin.com/in/aliawilkinson/" target="_blank">saying hi</a>
                    </span>
                </div>

                <div className={css.right}>
                    <div className={css.info}>
                        {/* <span className="secondaryText">Made with Love in Sunny California</span> */}
                        <p className="secondaryText">Made with Love in Sunny California</p>
                    </div>
                    <ul className={css.menu}>
                        <li><a href="#expertise">Expertise</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#CaseStudies">Case Studies</a></li>
                        <li><a href="#Testimonials">Testimonials</a></li>
                    </ul>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Footer;