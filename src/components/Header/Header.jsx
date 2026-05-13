import React, { useRef, useState } from "react"
import css from './Header.module.scss'
import { BiMenuAltRight } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { getMenuStyles, headerVariants } from "../../utils/motion"
import useHeaderShadow from "../../hooks/useHeaderShadow"
import useOutsideAlerter from "../../hooks/useOutsideAlerter"
import { HashLink } from 'react-router-hash-link'
import linkedin from '../../assets/linkedin-svg.svg'
import github from '../../assets/github-mark.svg'

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow();
  const menuRef = useRef(null);

  useOutsideAlerter({ menuRef, setMenuOpened });

  const toggleMenu = () => setMenuOpened((prev) => !prev);

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
        <div className={css.name}>Alia</div>

        <ul
          ref={menuRef}
          style={getMenuStyles(menuOpened)}
          className={`flexCenter ${css.menu}`}
        >
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

        <button
          className={css.menuIcon}
          onClick={toggleMenu}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
          aria-label={menuOpened ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpened}
        >
          <BiMenuAltRight size={30} />
        </button>
      </div>
    </motion.div>
  );
};

export default Header;

