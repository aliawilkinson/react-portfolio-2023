import Home from './components/Home/Home'
import css from './styles/app.module.scss'
import { Routes, Route, useNavigate } from 'react-router-dom';
import InfoPost from './components/InfoPost/InfoPost'

const App = () => {
  return <div className={`bg-primary ${css.container}`}>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<InfoPost post='about'/>}></Route>
      <Route path='/about' element={<InfoPost post='about'/>}></Route>
      <Route path='/about' element={<InfoPost post='about'/>}></Route>
    </Routes>
  </div>
};

export default App;
