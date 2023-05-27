import React from "react"
import { motion } from "framer-motion"
import css from "./InfoPost.module.scss"
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion"
import { content } from "../../utils/posts"
import Parser from 'html-react-parser'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const InfoPost = ({ post }) => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`paddings ${css.wrapper} infoPost`}>
            <Header />
            <h1>{content[post].title}</h1>
            <img src={content[post].imgSrc} />
            {Parser(content[post].post)}
            <Footer/>
        </motion.section>
    )
}

export default InfoPost