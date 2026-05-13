import React from "react";
import { comments, sliderSettings } from "../../utils/data";
import css from "./Testimonials.module.scss";
import SliderLib from "react-slick";
import { motion } from 'framer-motion';
import { footerVariants, staggerChildren } from "../../utils/motion";

// react-slick is a CJS module — Vite wraps it so the component sits at .default
const Slider = SliderLib.default ?? SliderLib;

const Testimonials = () => {
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
            I come up with unique solutions for difficult problems
          </p>
          <p>
            Allow me to support you in reaching your goals
          </p>
        </div>

        <div className={`yPaddings ${css.comments}`}>
          <Slider {...sliderSettings} className={css.slider}>
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