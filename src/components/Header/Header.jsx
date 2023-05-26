import React, { useState } from "react"
import css from './Header.module.scss'
import { BiMenuAltRight } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { getMenuStyles, headerVariants } from "../../utils/motion"
import useHeaderShadow from "../../hooks/useHeaderShadow"

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
                    <li><a href="#expertise">Expertise</a></li>
                    <li><a href="#CaseStudies">Case Studies</a></li>
                    <li><a href="#Testimonials">Testimonials</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#footer">Contact</a></li>
                    <li><a href="https://www.linkedin.com/in/aliawilkinson/" target="_blank">LinkedIn</a></li>
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

