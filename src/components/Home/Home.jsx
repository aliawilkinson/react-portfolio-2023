import css from '../../styles/app.module.scss'
import Hero from '../Hero/Hero'
import Expertise from '../Expertise/Expertise'
import Experience from '../Experience/Experience'
import CaseStudies from '../CaseStudies/CaseStudies'
import Testimonials from '../Testimonials/Testimonials'

const Home = () => {
  return (
    <div className={`bg-primary ${css.container}`}>
      <Hero />
      <Expertise />
      <CaseStudies />
      <Testimonials />
      <Experience />
    </div>
  );
};

export default Home;
