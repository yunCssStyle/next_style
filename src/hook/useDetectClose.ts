import { useEffect, useState, useRef } from 'react'

const useDetectClose = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState)
  const ref = useRef<HTMLButtonElement | HTMLDivElement | null>(null)

  const removeHandler = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      e.preventDefault()
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsOpen(!isOpen)
      }
    }

    if (isOpen) {
      window.addEventListener('click', onClick)
    }

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [isOpen])

  return [isOpen, ref, removeHandler]
}

export default useDetectClose
