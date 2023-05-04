import Header from './components/Header/Header'
import css from './styles/app.module.scss'
import Hero from './components/hero/hero'

const App = () => {
  return <div className={`bg-primary ${css.container}`}>
    <Header/>
    <Hero/>
  </div>
};

export default App;
