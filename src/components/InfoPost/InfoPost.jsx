import React from "react"
import { motion } from "framer-motion"
import css from "./InfoPost.module.scss"
import { fadeIn, staggerChildren, textVariant, textVariant2 } from "../../utils/motion"
import { content } from "../../utils/posts"
import Parser from 'html-react-parser'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import CaseStudies from "../CaseStudies/CaseStudies"
import { Link } from 'react-router-dom'

const InfoPost = ({ post }) => {
    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.10 }}
            className={`${css.wrapper}`}>
            <Header />
            <div className={`innerWidth ${css.container}`}>
                <Link to="infoPost" className="anchor" id="infoPost" />
                <h1 className="post-title">{content[post].title}</h1>
                <div className="post-image">
                    <img src={content[post].imgSrc} />
                </div>
                <div className="post-content">
                    {Parser(content[post].post)}
                </div>
            </div>
            <CaseStudies/>
            <Footer />
        </motion.section>
    )
}

export default InfoPost