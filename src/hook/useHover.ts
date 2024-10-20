import { useCallback, useEffect, useRef, useState } from 'react'

const useHover = () => {
  const [state, setState] = useState<boolean>(false)
  const ref = useRef<null | HTMLDivElement>(null)

  const handleMouseOver = useCallback(() => setState(true), [])
  const handleMouseOut = useCallback(() => setState(false), [])

  useEffect(() => {
    const element = ref.current
    if (element) {
      element.addEventListener('mouseover', handleMouseOver)
      element.addEventListener('mouseout', handleMouseOut)

      // useEffect에서 이벤트를 등록할 때는
      // 꼭 정리(clean-up)를 해줘야한다.
      return () => {
        element.removeEventListener('mouseover', handleMouseOver)
        element.removeEventListener('mouseout', handleMouseOut)
      }
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, state]
}

export default useHover
