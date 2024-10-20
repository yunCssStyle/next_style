import styles from './scroll.module.scss'

interface ScrollProps {
  children: React.ReactNode
}
export default function Scroll({ children }: ScrollProps) {
  return (
    <div className={styles.container}>
      <div className={styles.scroll_box}>{children}</div>
    </div>
  )
}
