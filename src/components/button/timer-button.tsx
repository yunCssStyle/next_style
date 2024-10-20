'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useScopedI18n } from '@/locales/client'
import Button from './button'

interface TimerButtonProps {
  start_Timer: boolean
  endTimer: boolean
  disabled: boolean
  theme: boolean
  handleSendEmail: () => void
  handleReset: () => void
}

export default function TimerButton({
  start_Timer,
  endTimer,
  disabled,
  theme,
  handleSendEmail,
  handleReset,
}: TimerButtonProps) {
  const sign = useScopedI18n('sign')
  const [startTimer, setStartTimer] = useState<boolean>(false)
  const handleStartTimer = () => {
    handleSendEmail()
  }
  useEffect(() => {
    if (start_Timer) {
      setStartTimer(true)
    }
  }, [start_Timer])
  // 타이머 부분
  const currentTime = dayjs()
  dayjs.extend(duration)
  // const futureTime = currentTime.add(3, 'minute')
  const futureTime = currentTime.add(180, 'second')
  const [timer, setTimer] = useState<number>(180)
  useEffect(() => {
    if (startTimer) {
      const Counter = setInterval(() => {
        const now = dayjs()
        const gap = dayjs.duration(futureTime.diff(now))
        if (gap.get('second') < 0 || endTimer) {
          setStartTimer(false)
          setTimer(180)
          handleReset()
          return () => clearInterval(Counter)
        }
        return setTimer(gap.get('minute') * 60 + gap.get('second'))
      }, 1000)
      return () => clearInterval(Counter)
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTimer && !endTimer])
  const timeFormat = (time: number) => {
    const m = (Math.floor(time / 60) < 0 ? 0 : Math.floor(time / 60)).toString()
    let s = (time % 60 < 0 ? 0 : time % 60).toString()
    if (s.length === 1) s = `0${s}`
    return `${m}:${s}`
  }
  return startTimer && !endTimer ? (
    <Button size="cerMedium" disabled theme="secondary" onClick={() => {}}>
      {timeFormat(timer)}
    </Button>
  ) : (
    <Button
      size="cerMedium"
      disabled={disabled}
      theme={theme ? 'primary' : 'secondary'}
      onClick={handleStartTimer}
      borderRadius="3px"
    >
      {sign('form.send-email')}
    </Button>
  )
}
