import React from "react";
import { motion } from "framer-motion";
import css from "./InfoPost.module.scss";
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion";
import { content } from "../../utils/posts";
import Parser from 'html-react-parser';

const InfoPost = ({ post }) => {
    content.post.title
    content.post.imgSrc
    content.post.post
    // "releaseofreleases": {
    //     "title": "Release of Releases - Release Orchestration through Automation",
    //     "imgSrc": "./infoposts/ror.png",
    //     "post": `

    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper}`}>
            <h1>{content.post.title}</h1>
            <img src={content.post.imgSrc} />
            {Parser(content.post.post)}

        </motion.section>
    );
};

export default InfoPost;