import React from "react";
import { comments, sliderSettings } from "../../utils/data";
import css from "./Testimonials.module.scss";
import Slider from "react-slick";
import { motion } from 'framer-motion'
import { footerVariants, staggerChildren, textVariant, textVariant2 } from "../../utils/motion";
const Testimonials = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            section className={`paddings ${css.wrapper}`}>

            <a className="anchor" id="Testimonials"></a>

            <motion.div
                variants={footerVariants}
                className={`yPaddings innerWidth ${css.container}`}>


                <div className={`flexCenter ${css.heading}`}>
                    <span className="primaryText">People Talk</span>
                    <p style={{ marginTop: "2rem" }}>
                        I come up with unique solutions for difficult problems
                    </p>
                    <p>
                        Allow me to support you in reaching your goals
                    </p>
                </div>



                <div className={`yPaddings ${css.comments}`}>
                    {/* to use slider , we have to inlcude css in index.html head */}
                    <Slider {...sliderSettings} className={css.slider}>
                        {comments.map((comment, i) => {
                            return (
                                <div className={`flexCenter ${css.comment}`} key={i}>
                                    <img src={comment.img} alt="" />
                                    <p>{comment.comment}</p>
                                    <div className={css.line}></div>
                                    <div className={css.bio}>
                                        <span>{comment.name}</span>
                                        <span>{comment.post}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>


            </motion.div>

        </motion.section>
    );
};

export default Testimonials;