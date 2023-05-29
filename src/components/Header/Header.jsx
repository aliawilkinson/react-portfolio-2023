import React, { useState } from "react"
import css from './Header.module.scss'
import { BiMenuAltRight } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { getMenuStyles, headerVariants } from "../../utils/motion"
import useHeaderShadow from "../../hooks/useHeaderShadow"
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import linkedin from '../../../public/linkedin-svg.svg'
import github from '../../../public/github-mark.svg'


const Header = () => {

    const [menuOpened, setMenuOpened] = useState(false)
    const headerShadow = useHeaderShadow()

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            variants={headerVariants}
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper}`}
            style={{ boxShadow: headerShadow }}
        >

            <div className={`flexCenter innerWidth ${css.container}`}>
                <div className={css.name}>
                    Alia
                </div>

                <ul
                    style={getMenuStyles(menuOpened)}
                    className={`flexCenter ${css.menu}`}>
                    <li><HashLink to='/#hero'>Home</HashLink></li>
                    <li><HashLink smooth to="/#expertise">Expertise</HashLink></li>
                    <li><HashLink smooth to="/#CaseStudies">Case Studies</HashLink></li>
                    <li><HashLink smooth to="/#Testimonials">Testimonials</HashLink></li>
                    <li><HashLink smooth to="/#experience">Experience</HashLink></li>
                    <li><HashLink smooth to="/#footer">Contact</HashLink></li>
                    <li><HashLink smooth to='/about#infoPost'>About</HashLink></li>
                    <li><HashLink smooth to="https://www.linkedin.com/in/aliawilkinson/" target="_blank">LinkedIn 
                    <img style={{'height':'1rem'}} src={linkedin} /></HashLink></li>
                    <li><HashLink smooth to="https://github.com/aliawilkinson" target="_blank">GitHub <img style={{'height':'1rem'}} src={github} /></HashLink></li>
                </ul>

                {/* for medium and small screens */}
                <div className={css.menuIcon}
                    onClick={() => setMenuOpened((prev) => !prev)}
                >
                    <BiMenuAltRight size={30} />
                </div>
            </div>
        </motion.div>
    )
}

export default Header

