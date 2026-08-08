import { lazy, Suspense } from 'react'
import Home from './components/Home/Home'
import css from './styles/app.module.scss'
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import InfoPost from './components/InfoPost/InfoPost'
import OtherProjectsList from './components/OtherProjects/OtherProjectsList'
import OtherProjectDetail from './components/OtherProjects/OtherProjectDetail'
import BlogList from './components/Blog/BlogList'
import BlogPost from './components/Blog/BlogPost'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import RouteScroller from './components/RouteScroller/RouteScroller'

const Tarot = lazy(() => import('./components/Tarot/Tarot'))
const ConversationMode = lazy(() => import('./components/Tarot/ConversationMode'))

// Redirect wrapper for /projects/:slug -> /other-projects/:slug
const ProjectSlugRedirect = () => {
  const { slug } = useParams()
  return <Navigate to={`/other-projects/${slug}`} replace />
}

const App = () => {
  const { pathname } = useLocation()
  const hideFooter = pathname === '/tarot' || pathname === '/conversation'

  return (
    <div className={`bg-primary ${css.container}`}>
      <Header />
      <RouteScroller />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hero' element={<Home />} />
        <Route path='/expertise' element={<Home />} />
        <Route path='/case-studies' element={<Home />} />
        <Route path='/other-projects' element={<OtherProjectsList />} />
        <Route path='/other-projects/:slug' element={<OtherProjectDetail />} />
        {/* Redirect old /projects routes for backward compatibility */}
        <Route path='/projects' element={<Navigate to="/other-projects" replace />} />
        <Route path='/projects/:slug' element={<ProjectSlugRedirect />} />
        <Route path='/blog' element={<BlogList />} />
        <Route path='/blog/:slug' element={<BlogPost />} />
        <Route path='/tarot' element={<Suspense fallback={<div style={{ minHeight: '60vh' }} />}><Tarot /></Suspense>} />
        <Route path='/conversation' element={<Suspense fallback={<div style={{ minHeight: '60vh' }} />}><ConversationMode /></Suspense>} />
        <Route path='/testimonials' element={<Home />} />
        <Route path='/experience' element={<Home />} />
        <Route path='/contact' element={<Home />} />
        <Route path='/about' element={<InfoPost post='about' />} />
        <Route path='/releaseofreleases' element={<InfoPost post='releaseofreleases' />} />
        <Route path='/iacPipelineValidation' element={<InfoPost post='iacPipelineValidation' />} />
        <Route path='/amplifyReactMigApp' element={<InfoPost post='amplifyReactMigApp' />} />
        <Route path='/cmdletCreationTemplate' element={<InfoPost post='cmdletCreationTemplate' />} />
        <Route path='/agenticWorkflowApp' element={<InfoPost post='agenticWorkflowApp' />} />
        <Route path='/cognitoIdentityArchitecture' element={<InfoPost post='cognitoIdentityArchitecture' />} />
        <Route path='/almModernization' element={<InfoPost post='almModernization' />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
