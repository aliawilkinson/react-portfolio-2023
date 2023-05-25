import Header from './components/Header/Header'
import css from './styles/app.module.scss'
import Hero from './components/Hero/Hero'
import Expertise from './components/Expertise/Expertise'
import Experience from './components/Experience/Experience'
import Portfolio from './components/Portfolio/Portfolio'
import Reviews from './components/Reviews/Reviews'

const App = () => {
  return <div className={`bg-primary ${css.container}`}>
    <Header/>
    <Hero/>
    <Expertise/>
    <Experience/>
    <Portfolio/>
    <Reviews/>
  </div>
};

export default App;
