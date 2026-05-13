import React from "react"
import { footerVariants, staggerChildren } from "../../utils/motion"
import css from "./Footer.module.scss"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import linkedin from '../../assets/linkedin-svg.svg'
import github from '../../assets/github-mark.svg'
import lagunaBeach from '../../assets/free-photo-of-sunny-laguna-beach-coastline-with-palm-trees.jpeg'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Expertise', to: '/expertise' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
]

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
          <div className={css.postcard}>
            <img src={lagunaBeach} alt="Sunny Laguna Beach coastline with palm trees" />
            <div className={css.postcardOverlay}>
              <span>SoCal based / Remote friendly</span>
              <p>AWS architecture, developer tooling, and a little sunlight in the process.</p>
            </div>
          </div>

          <ul className={css.menu}>
            {footerLinks.map((link) => (
              <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
            ))}
            <li>
              <a href="https://www.linkedin.com/in/aliawilkinson/" target="_blank" rel="noopener noreferrer">
                LinkedIn <img className={css.navIcon} src={linkedin} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a href="https://github.com/aliawilkinson" target="_blank" rel="noopener noreferrer">
                GitHub <img className={css.navIcon} src={github} alt="GitHub" />
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
