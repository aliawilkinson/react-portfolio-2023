import React, { useEffect, useRef, useState } from "react"
import css from './Header.module.scss'
import { BiMenuAltRight } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { getMenuStyles, headerVariants } from "../../utils/motion"
import useHeaderShadow from "../../hooks/useHeaderShadow"
import useOutsideAlerter from "../../hooks/useOutsideAlerter"
import { HashLink } from 'react-router-hash-link'
import linkedin from '../../assets/linkedin-svg.svg'
import github from '../../assets/github-mark.svg'

const navLinks = [
  { label: 'Home', to: '/#hero', message: "you're already home :)" },
  { label: 'Expertise', to: '/#expertise', message: "you're already at expertise :)" },
  { label: 'Case Studies', to: '/#CaseStudies', message: "you're already reading the case files :)" },
  { label: 'Testimonials', to: '/#Testimonials', message: "you're already where the nice things are :)" },
  { label: 'Experience', to: '/#experience', message: "you're already in the timeline :)" },
  { label: 'Contact', to: '/#footer', message: "you're already at the signal flare :)" },
  { label: 'About', to: '/about#infoPost', message: "you're already in the lore :)" },
]

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [navNote, setNavNote] = useState('');
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

  const isAlreadyAtTarget = (to) => {
    const targetUrl = new URL(to, window.location.origin);

    if (targetUrl.pathname !== window.location.pathname) {
      return false;
    }

    if (targetUrl.hash === '#hero') {
      return window.scrollY < 80;
    }

    const target = document.querySelector(targetUrl.hash);

    if (!target) {
      return false;
    }

    const targetRect = target.getBoundingClientRect();
    return targetRect.top <= 140 && targetRect.bottom >= -20;
  };

  const handleNavClick = (event, link) => {
    if (isAlreadyAtTarget(link.to)) {
      event.preventDefault();
      closeMenu();
      showAlreadyHereNote(link.message);
      return;
    }

    closeMenu();
  };

  const scrollHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <HashLink
                smooth
                to={link.to}
                onClick={(event) => handleNavClick(event, link)}
                scroll={link.to === '/#hero' ? scrollHome : undefined}
              >
                {link.label}
              </HashLink>
            </li>
          ))}
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

        <div className={`${css.navNote} ${navNote ? css.navNoteVisible : ''}`} role="status" aria-live="polite">
          {navNote}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;

