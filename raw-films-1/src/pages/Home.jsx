import { Helmet } from 'react-helmet-async'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Hero'
import Stories from '../components/Stories'
import Gallery from '../components/Gallery'
import Films from '../components/Films'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Instagram from '../components/Instagram'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <MainLayout>
      <Helmet>
        <title>RAW FILMS - Cinematic Wedding Photography and Filmmaking</title>
        <meta name="description" content="RAW FILMS - Crafting timeless love stories through cinema and photography. Based in Kerala, available worldwide." />
      </Helmet>
      <Hero />
      <Stories />
      <Gallery />
      <Films />
      <About />
      <Testimonials />
      <Instagram />
      <Contact />
    </MainLayout>
  )
}
