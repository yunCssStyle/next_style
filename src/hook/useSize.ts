import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'

interface ComponentSize {
  width: number
  height: number
}

function useSize(): [React.RefObject<HTMLDivElement>, ComponentSize, () => void] {
  const [size, setSize] = useState<ComponentSize>({ width: 0, height: 0 })
  const componentRef = useRef<HTMLDivElement>(null)

  const handleResize = () => {
    const { width, height } = componentRef.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    }
    setSize({ width, height })
  }

  useEffect(() => {
    const debouncedTerm = debounce(() => {
      handleResize()
    }, 500)
    if (componentRef.current) {
      handleResize()
    }
    window.addEventListener('resize', debouncedTerm)

    return () => window.removeEventListener('resize', debouncedTerm)
  }, [])

  return [componentRef, size, handleResize]
}

export default useSize
