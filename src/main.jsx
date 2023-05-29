import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import App from './App'
import './styles/index.css'
import './styles/global.scss'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
