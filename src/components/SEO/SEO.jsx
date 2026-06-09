import { Helmet } from 'react-helmet-async'
import { seoDefaults } from '../../utils/seoData'

const SEO = ({ title, description, url, image }) => {
  const pageTitle = title || seoDefaults.title
  const pageDescription = description || seoDefaults.description
  const pageUrl = url || seoDefaults.url
  const pageImage = image || seoDefaults.image

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <link rel="canonical" href={pageUrl} />
    </Helmet>
  )
}

export default SEO
