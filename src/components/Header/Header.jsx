import React, { useEffect, useRef, useState } from "react"
import css from './Header.module.scss'
import { BiMenuAltRight } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { getMenuStyles, headerVariants } from "../../utils/motion"
import useHeaderShadow from "../../hooks/useHeaderShadow"
import useOutsideAlerter from "../../hooks/useOutsideAlerter"
import { Link, useLocation } from 'react-router-dom'
import linkedin from '../../assets/linkedin-svg.svg'
import github from '../../assets/github-mark.svg'

const navLinks = [
  { label: 'Home', to: '/', targetId: 'hero', message: "you're already home :)" },
  { label: 'Expertise', to: '/expertise', targetId: 'expertise', message: "you're already at expertise :)" },
  { label: 'Case Studies', to: '/case-studies', targetId: 'CaseStudies', message: "you're already reading the case files :)" },
  { label: 'Testimonials', to: '/testimonials', targetId: 'Testimonials', message: "you're already where the nice things are :)" },
  { label: 'Experience', to: '/experience', targetId: 'experience', message: "you're already in the timeline :)" },
  { label: 'Contact', to: '/contact', targetId: 'footer', message: "you're already at the signal flare :)" },
  { label: 'About', to: '/about', targetId: 'infoPost', message: "you're already in the lore :)" },
]

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [navNote, setNavNote] = useState('');
  const location = useLocation();
  const headerShadow = useHeaderShadow();
  const menuRef = useRef(null);
  const noteTimerRef = useRef(null);

  useOutsideAlerter({ menuRef, setMenuOpened });

  const toggleMenu = () => setMenuOpened((prev) => !prev);
  const closeMenu = () => setMenuOpened(false);

  useEffect(() => {
    return () => clearTimeout(noteTimerRef.current);
  }, []);

  const showAlreadyHereNote = (message) => {
    setNavNote(message);
    clearTimeout(noteTimerRef.current);
    noteTimerRef.current = setTimeout(() => setNavNote(''), 2600);
  };

  const isAlreadyAtTarget = (link) => {
    if (link.to !== location.pathname) {
      return false;
    }

    if (link.targetId === 'hero') {
      return window.scrollY < 80;
    }

    const target = document.getElementById(link.targetId);

    if (!target) {
      return false;
    }

    const targetRect = target.getBoundingClientRect();
    return targetRect.top <= 140 && targetRect.bottom >= -20;
  };

  const handleNavClick = (event, link) => {
    if (isAlreadyAtTarget(link)) {
      event.preventDefault();
      closeMenu();
      showAlreadyHereNote(link.message);
      return;
    }

    closeMenu();
  };

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
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={(event) => handleNavClick(event, link)}
              >
                {link.label}
              </Link>
            </li>
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

        <button
          className={css.menuIcon}
          onClick={toggleMenu}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
          aria-label={menuOpened ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpened}
        >
          <BiMenuAltRight size={30} />
        </button>

        <div className={`${css.navNote} ${navNote ? css.navNoteVisible : ''}`} role="status" aria-live="polite">
          {navNote}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;

