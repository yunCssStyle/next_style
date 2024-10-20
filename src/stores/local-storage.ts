import { v4 as uuidv4 } from 'uuid'
// localStorage
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
export const setLocalStorage = (key: string, value: string | null) => {
  if (value === null) {
    removeLocalStorage(key)
  } else {
    localStorage.setItem(key, value)
  }
}
export const getStyleUser = (): string => {
  let styleUser = getLocalStorage('styleUser')
  if (styleUser === null || styleUser === 'null') {
    try {
      styleUser = uuidv4()
      setLocalStorage('styleUser', styleUser)
    } catch (error) {
      removeLocalStorage('styleUser')
    }
  }
  return styleUser ?? 'null'
}
