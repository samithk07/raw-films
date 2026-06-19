import { useEffect, useRef, useState } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  let mouseX = 0, mouseY = 0
  let ringX = 0, ringY = 0

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()

    const hoverEls = document.querySelectorAll('button, a, [data-cursor="hover"]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true))
      el.addEventListener('mouseleave', () => setIsHovering(false))
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return { cursorRef, ringRef, isHovering }
}
