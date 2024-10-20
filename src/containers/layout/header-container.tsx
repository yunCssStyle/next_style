import React from 'react'

interface HeaderContainerProps {
  title: React.ReactNode
  center?: React.ReactNode
  right: React.ReactNode
}

export default function HeaderContainer({ title, center = null, right }: HeaderContainerProps) {
  return (
    <div className="home_top_inner">
      {title}
      {center}
      {right}
    </div>
  )
}
