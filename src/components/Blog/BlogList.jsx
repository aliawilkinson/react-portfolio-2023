import { motion } from "framer-motion"
import css from "./Blog.module.scss"
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion"
import { Link } from 'react-router-dom'
import { blogPosts } from '../../utils/blogPosts'

const BlogList = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className={`paddings ${css.wrapper}`}
    >
      <div className={`innerWidth ${css.container}`}>
        <motion.h1 variants={textVariant(0.2)} className="primaryText">Blog</motion.h1>
        <motion.p variants={fadeIn("up", "tween", 0.3, 0.6)} className={css.intro}>
          Opinions, guides, and things I keep explaining in Slack.
        </motion.p>

        <div className={css.postList}>
          {blogPosts.map((post, i) => (
            <motion.div key={post.slug} variants={fadeIn("up", "tween", 0.4 + i * 0.1, 0.6)}>
              <Link to={`/blog/${post.slug}`} className={css.postCard}>
                <div className={css.postColor} style={{ background: post.bg }} />
                <div className={css.postInfo}>
                  <h2>{post.title}</h2>
                  <span>{post.date}</span>
                  <p>{post.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BlogList;
