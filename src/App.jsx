import Header from './components/Header/Header'
import css from './styles/app.module.scss'
import Hero from './components/Hero/Hero'
import Expertise from './components/Expertise/Expertise'
import Experience from './components/Experience/Experience'
import CaseStudies from './components/CaseStudies/CaseStudies'
import Testimonials from './components/Testimonials/Testimonials'
import Footer from './components/Footer/Footer'

const App = () => {
  return <div className={`bg-primary ${css.container}`}>
    <Header/>
    <Hero/>
    <Expertise/>
    <CaseStudies/>
    <Testimonials/>
    <Experience/>
    <Footer/>
  </div>
};

export default App;
