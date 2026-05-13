import Home from './components/Home/Home'
import css from './styles/app.module.scss'
import { Routes, Route } from 'react-router-dom'
import InfoPost from './components/InfoPost/InfoPost'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import RouteScroller from './components/RouteScroller/RouteScroller'

const App = () => {
  return (
    <div className={`bg-primary ${css.container}`}>
      <Header />
      <RouteScroller />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hero' element={<Home />} />
        <Route path='/expertise' element={<Home />} />
        <Route path='/case-studies' element={<Home />} />
        <Route path='/testimonials' element={<Home />} />
        <Route path='/experience' element={<Home />} />
        <Route path='/contact' element={<Home />} />
        <Route path='/about' element={<InfoPost post='about' />} />
        <Route path='/releaseofreleases' element={<InfoPost post='releaseofreleases' />} />
        <Route path='/iacPipelineValidation' element={<InfoPost post='iacPipelineValidation' />} />
        <Route path='/amplifyReactMigApp' element={<InfoPost post='amplifyReactMigApp' />} />
        <Route path='/cmdletCreationTemplate' element={<InfoPost post='cmdletCreationTemplate' />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
