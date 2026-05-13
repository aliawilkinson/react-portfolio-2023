import React from "react"
import { footerVariants, staggerChildren } from "../../utils/motion"
import css from "./Footer.module.scss"
import { motion } from 'framer-motion'
import { HashLink } from 'react-router-hash-link'
import linkedin from '../../assets/linkedin-svg.svg'
import github from '../../assets/github-mark.svg'

const Footer = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.10 }}
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="footer"></a>

      <motion.div
        variants={footerVariants}
        className={`innerWidth yPaddings flexCenter ${css.container}`}
      >
        <div className={css.left}>
          <span className="primaryText">
            Let's make something <br />
            amazing together.
          </span>
          <span className="primaryText">
            Start by <a href="https://www.linkedin.com/in/aliawilkinson/" target="_blank" rel="noopener noreferrer">saying hi</a>
          </span>
        </div>

        <div className={css.right}>
          <div className={css.info}>
            <p className="secondaryText">Made with Love in Sunny California</p>
          </div>
          <ul className={css.menu}>
            <li><HashLink to='/#hero'>Home</HashLink></li>
            <li><HashLink smooth to="/#expertise">Expertise</HashLink></li>
            <li><HashLink smooth to="/#CaseStudies">Case Studies</HashLink></li>
            <li><HashLink smooth to="/#Testimonials">Testimonials</HashLink></li>
            <li><HashLink smooth to="/#experience">Experience</HashLink></li>
            <li><HashLink smooth to="/#footer">Contact</HashLink></li>
            <li><HashLink smooth to='/about#infoPost'>About</HashLink></li>
            <li>
              <HashLink smooth to="https://www.linkedin.com/in/aliawilkinson/" target="_blank" rel="noopener noreferrer">
                LinkedIn <img className={css.navIcon} src={linkedin} alt="LinkedIn" />
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="https://github.com/aliawilkinson" target="_blank" rel="noopener noreferrer">
                GitHub <img className={css.navIcon} src={github} alt="GitHub" />
              </HashLink>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;