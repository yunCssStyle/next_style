'use client'

import { createContext, useContext, useMemo } from 'react'

// type LookDetailState = {
//   isLoading: boolean
//   selectColorPallet: ProductColorPallet | null
//   selectItem: number
// }

// const defaultDetailValue = (): LookDetailState => {
//   return {
//     isLoading: true,
//     selectColorPallet: null,
//     selectItem: 2,
//   }
// }

// export const LookDetailContext = createContext({
//   ...defaultDetailValue(),
//   setLookDetailContext: (updates: Partial<ReturnType<typeof defaultDetailValue>>) => {}, // Accepts partial updates
// })

// export const LookDetailProvider = ({ children, initialValues = {} }) => {
//   const [lookDetailContext, setLookDetailContext] = useState({
//     ...defaultDetailValue(),
//     ...initialValues,
//   })
//   const updateContext = (updates) => {
//     setLookDetailContext((prevState) => ({
//       ...prevState,
//       ...updates,
//     }))
//   }

//   return (
//     <LookDetailContext.Provider value={{ ...lookDetailContext, setLookDetailContext: updateContext }}>
//       {children}
//     </LookDetailContext.Provider>
//   )
// }

const defaultValue = () => {
  return {
    ip: '',
  }
}

export const LookContext = createContext(defaultValue())

export const useIp = () => {
  const context = useContext(LookContext)
  if (!context) {
    throw new Error('use must be used within an LookProvider')
  }
  return context.ip
}

export function LookProvider({ ip, children }: { ip: string; children: React.ReactNode }) {
  const value = useMemo(() => ({ ip }), [ip])
  return <LookContext.Provider value={value}>{children}</LookContext.Provider>
}
