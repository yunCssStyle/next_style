import { useEffect, useRef } from 'react'

export default function useWheel() {
  const ref = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e) => {
      if (ref.current) {
        ref.current.scrollLeft += e.deltaY
      }
    }

    if (ref.current) {
      ref.current.addEventListener('wheel', handleWheel)
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  return [ref]
}
