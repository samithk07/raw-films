import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'

import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import { initLenis } from './utils/animations'

function App() {
  useEffect(() => {
    const lenis = initLenis()
    return () => lenis?.destroy()
  }, [])

  return (
    <>
      <Loader />
     
      <ScrollProgress />
      <AppRoutes />
    </>
  )
}

export default App
