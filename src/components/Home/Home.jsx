import css from '../../styles/app.module.scss'
import Hero from '../Hero/Hero'
import Expertise from '../Expertise/Expertise'
import Experience from '../Experience/Experience'
import CaseStudies from '../CaseStudies/CaseStudies'
import Testimonials from '../Testimonials/Testimonials'
import SEO from '../SEO/SEO'
import { seoData } from '../../utils/seoData'

const Home = () => {
  return (
    <div className={`bg-primary ${css.container}`}>
      <SEO
        title={seoData.home.title}
        description={seoData.home.description}
        url={seoData.home.url}
        image={seoData.home.image}
      />
      <Hero />
      <Expertise />
      <CaseStudies />
      <Testimonials />
      <Experience />
    </div>
  );
};

export default Home;
