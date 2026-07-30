import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../../utils/blogPosts'
import css from "./Blog.module.scss"
import { motion } from 'framer-motion'
import { staggerChildren, fadeIn } from '../../utils/motion'
import Parser from 'html-react-parser'

const BlogPost = () => {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <section className={`paddings ${css.wrapper}`}>
        <div className="innerWidth">
          <p>Post not found.</p>
          <Link to="/blog" className={css.backLink}>← Back to blog</Link>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className={`paddings ${css.wrapper}`}
    >
      <div className={`innerWidth ${css.postContent}`}>
        <Link to="/blog" className={css.backLink}>← Back to blog</Link>
        <motion.h1 variants={fadeIn("up", "tween", 0.2, 0.6)}>{post.title}</motion.h1>
        <motion.span variants={fadeIn("up", "tween", 0.3, 0.6)} className={css.date}>{post.date}</motion.span>
        <motion.div variants={fadeIn("up", "tween", 0.4, 0.6)} className={css.body}>
          {Parser(post.post)}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default BlogPost;
