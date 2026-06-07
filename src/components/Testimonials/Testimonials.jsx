import React, { useEffect, useState } from "react";
import { comments, sliderSettings } from "../../utils/data";
import css from "./Testimonials.module.scss";
import SliderLib from "react-slick";
import { motion } from 'framer-motion';
import { footerVariants, staggerChildren } from "../../utils/motion";

// react-slick is a CJS module — Vite wraps it so the component sits at .default
const Slider = SliderLib.default ?? SliderLib;

const getViewportSliderSettings = () => {
  if (typeof window === "undefined") {
    return { slidesToShow: 3, slidesToScroll: 1, infinite: false };
  }

  if (window.innerWidth <= 640) {
    return { slidesToShow: 1, slidesToScroll: 1, infinite: true };
  }

  if (window.innerWidth <= 1024) {
    return { slidesToShow: 2, slidesToScroll: 2, infinite: true };
  }

  return { slidesToShow: 3, slidesToScroll: 1, infinite: false };
};

const Testimonials = () => {
  const [viewportSliderSettings, setViewportSliderSettings] = useState(
    getViewportSliderSettings
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportSliderSettings(getViewportSliderSettings());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.10 }}
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="Testimonials"></a>

      <motion.div
        variants={footerVariants}
        className={`yPaddings innerWidth ${css.container}`}
      >
        <div className={`flexCenter ${css.heading}`}>
          <span className="primaryText">People Talk</span>
          <p className={css.subheading}>
            Cross-functional technical leadership, from people who have seen it up close
          </p>
          <p>
            Let's make a little magic and build something resilient together
          </p>
        </div>

        <div className={`yPaddings ${css.comments}`}>
          <Slider {...sliderSettings} {...viewportSliderSettings} className={css.slider}>
            {comments.map((comment, i) => (
              <div className={`flexCenter ${css.comment}`} key={comment.name}>
                <img src={comment.img} alt={comment.name} />
                <p>{comment.comment}</p>
                <div className={css.line}></div>
                <div className={css.bio}>
                  <span>{comment.name}</span>
                  <span>{comment.post}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;
