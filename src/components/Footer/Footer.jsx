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
            viewport={{ once: false, amount: 0.25 }}
            className={`paddings ${css.wrapper}`}>


            <motion.div
                variants={footerVariants}
                className={`innerWidth yPaddings flexCenter ${css.container}`}>
                <div className={css.left}>
                    <span className="primaryText">
                        Let's make something <br />
                        amazing together.
                    </span>
                    <span className="primaryText">
                        Start by <a href="mailto:zainkeepscode@gmail.com">saying hi</a>
                    </span>
                </div>

                <div className={css.right}>
                    <div className={css.info}>
                        <span className="secondaryText">Information</span>
                        <p>Made with Love in Sunny California</p>
                    </div>
                    <ul className={css.menu}>
                        <li><a href="#expertise">Services</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#portfolio">Case Studies</a></li>
                        <li><a href="#reviews">Testimonials</a></li>
                    </ul>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Footer;