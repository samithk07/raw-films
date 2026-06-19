import { Helmet } from 'react-helmet-async'
import MainLayout from '../layouts/MainLayout'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Contact - RAW FILMS</title>
        <meta name="description" content="Book RAW FILMS for your wedding. Contact us to discuss your cinematic wedding photography and film." />
      </Helmet>
      <div style={{ paddingTop: 80 }}>
        <Contact />
      </div>
    </MainLayout>
  )
}
