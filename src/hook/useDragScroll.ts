import React from 'react'

const useDragScroll = () => {
  const [node, setNode] = React.useState<HTMLElement | null>(null)

  const ref = React.useCallback((nodeEle: React.SetStateAction<HTMLElement | null>) => {
    setNode(nodeEle)
  }, [])

  const updateCursor = (ele: HTMLElement) => {
    const element = ele
    element.style.cursor = 'grabbing'
    element.style.userSelect = 'none'
  }

  const resetCursor = (ele: HTMLElement) => {
    const element = ele
    element.style.cursor = 'grab'
    element.style.removeProperty('user-select')
  }

  const handleMouseDown = React.useCallback(
    (e: MouseEvent) => {
      if (!node) {
        return
      }
      const startPos = {
        left: node.scrollLeft,
        x: e.clientX,
      }

      const handleMouseMove = (event: MouseEvent) => {
        const dx = event.clientX - startPos.x
        node.scrollLeft = startPos.left - dx
        updateCursor(node)
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        resetCursor(node)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [node],
  )

  React.useEffect(() => {
    if (!node) {
      return
    }
    node.addEventListener('mousedown', handleMouseDown)
    // 하단 에러 void 라 리턴 하지 말라는건 알겠는데 clean code 를 위해 void 를 리턴하고 싶다.
    // eslint-disable-next-line consistent-return
    return () => {
      console.log('clean mousedown')
      node.removeEventListener('mousedown', handleMouseDown)
    }
  }, [node])

  return [ref]
}
export default useDragScroll
