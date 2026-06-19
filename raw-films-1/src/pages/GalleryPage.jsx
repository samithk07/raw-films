import { Helmet } from 'react-helmet-async'
import MainLayout from '../layouts/MainLayout'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Gallery - RAW FILMS</title>
        <meta name="description" content="Browse our wedding photography portfolio. Cinematic stills from weddings across India and around the world." />
      </Helmet>
      <div style={{ paddingTop: 80 }}>
        <Gallery />
      </div>
    </MainLayout>
  )
}
