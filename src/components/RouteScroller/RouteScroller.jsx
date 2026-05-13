import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const routeTargets = {
  '/': 'hero',
  '/hero': 'hero',
  '/expertise': 'expertise',
  '/case-studies': 'CaseStudies',
  '/testimonials': 'Testimonials',
  '/experience': 'experience',
  '/contact': 'footer',
  '/about': 'infoPost',
}

const RouteScroller = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const targetId = routeTargets[pathname]

    window.requestAnimationFrame(() => {
      if (!targetId || targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [pathname])

  return null
}

export default RouteScroller
