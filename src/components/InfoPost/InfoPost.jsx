import React from "react";
import { motion } from "framer-motion";
import css from "./InfoPost.module.scss";
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion";

const InfoPost = () => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper}`}>

        </motion.section>
    );
};

export default InfoPost;