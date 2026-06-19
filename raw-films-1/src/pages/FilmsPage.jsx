import { Helmet } from 'react-helmet-async'
import MainLayout from '../layouts/MainLayout'
import Films from '../components/Films'

export default function FilmsPage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Wedding Films - RAW FILMS</title>
        <meta name="description" content="Watch our cinematic wedding films. Each film is a love letter scored to silence and starlight, crafted for forever." />
      </Helmet>
      <div style={{ paddingTop: 80 }}>
        <Films />
      </div>
    </MainLayout>
  )
}
