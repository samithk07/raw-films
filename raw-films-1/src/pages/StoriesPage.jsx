import { Helmet } from 'react-helmet-async'
import MainLayout from '../layouts/MainLayout'
import Stories from '../components/Stories'

export default function StoriesPage() {
  return (
    <MainLayout>
      <Helmet><title>Love Stories - RAW FILMS</title></Helmet>
      <div style={{ paddingTop: 80 }}>
        <Stories />
      </div>
    </MainLayout>
  )
}
