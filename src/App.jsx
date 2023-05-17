import Header from './components/Header/Header'
import css from './styles/app.module.scss'
import Hero from './components/Hero/Hero'
import Expertise from './components/Expertise/Expertise'

const App = () => {
  return <div className={`bg-primary ${css.container}`}>
    <Header/>
    <Hero/>
    {/* <Expertise/> */}
  </div>
};

export default App;
