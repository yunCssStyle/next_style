import { useRouter } from 'next/navigation'
import { colorBlack } from '@/constants/theme'
import IconCloseX from '../icons/icon-close-x'
import styles from './modal.module.scss'

export type ModalType = 'default' | 'listBox' | 'popup'

interface ModalProps {
  children: React.ReactNode
  type?: ModalType
  isBgClose?: boolean
  isTopClose?: boolean
  border?: string
  closeEvent?: () => void
}

export default function Modal({
  children,
  type = 'default',
  isBgClose = false,
  isTopClose = true,
  border = '',
  closeEvent,
}: ModalProps) {
  const router = useRouter()

  // 모달 닫기
  const close = () => {
    if (closeEvent) {
      closeEvent()
    }
    router.back()
  }
  // 모달 스타일 구분
  const styleType = (_type: string) => {
    if (_type === 'listBox') {
      return styles.listBox
    }
    if (_type === 'popup') {
      return styles.popup
    }
    return styles.default
  }
  // border 구분
  const borderType = (_border: string) => {
    if (_border === 'listBox') {
      return '0.25rem'
    }
    if (_border !== '') {
      return _border
    }
    return '0.625rem'
  }

  return (
    <div
      className={styles.modal_container}
      role="button"
      tabIndex={0}
      onClick={() => (isBgClose ? close : () => {})}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          return isBgClose ? close : () => {}
        }
        return null
      }}
    >
      <div
        className={`${styles.modal_box} ${styleType(type)}`}
        onClick={isBgClose ? close : () => {}}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            return isBgClose ? close : () => {}
          }
          return null
        }}
        role="button"
        tabIndex={0}
        style={{
          borderRadius: borderType(border),
        }}
      >
        {children}
        {isTopClose && (
          <div
            className={styles.modal_close}
            onClick={close}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                close()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close Modal"
          >
            <IconCloseX width={24} height={24} viewBox="0 0 12 12" stroke={colorBlack} />
          </div>
        )}
      </div>
    </div>
  )
}
