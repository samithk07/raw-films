import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home         = lazy(() => import('../pages/Home'))
const StoriesPage  = lazy(() => import('../pages/StoriesPage'))
const StoryDetails = lazy(() => import('../pages/StoryDetails'))
const GalleryPage  = lazy(() => import('../pages/GalleryPage'))
const FilmsPage    = lazy(() => import('../pages/FilmsPage'))
const ContactPage  = lazy(() => import('../pages/ContactPage'))
const NotFound     = lazy(() => import('../pages/NotFound'))

function PageLoader() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080808' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.4em', color: 'rgba(201,168,76,.5)' }}>
        RAW FILMS
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/stories"       element={<StoriesPage />} />
        <Route path="/stories/:slug" element={<StoryDetails />} />
        <Route path="/gallery"       element={<GalleryPage />} />
        <Route path="/films"         element={<FilmsPage />} />
        <Route path="/contact"       element={<ContactPage />} />
        <Route path="*"              element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
