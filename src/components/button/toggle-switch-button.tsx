'use client'

import React from 'react'
import { styled } from 'styled-components'

const themeIcon = {
  default: '24px',
  icons: '26px',
}
const themeH = {
  default: '32px',
  icons: '30px',
}
const themeW = {
  default: '64px',
  icons: '66.75px',
}
const shdow = {
  default: 'none',
  icons: 'inset 4px 3px 6px 0px var(--color-black-15)',
}
interface StyledToggleContainerProps {
  theme: 'default' | 'icons'
}
const StyledToggleContainer = styled.div<StyledToggleContainerProps>`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: ${(props) => themeW[props.theme]};
    height: ${(props) => themeH[props.theme]};
    border-radius: ${(props) => (props.theme === 'default' ? '1rem' : '50px')};
    background-color: ${(props) => (props.theme === 'default' ? 'var(--color-grey)' : 'var(--color-fff7f7)')};
    box-shadow: ${(props) => shdow[props.theme]};
  }
  > .toggle--checked {
    background-color: ${(props) => (props.theme === 'default' ? 'var(--color-point)' : 'var(--color-efefef)')};
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: ${(props) => (props.theme === 'default' ? '4px' : '0')};
    left: ${(props) => (props.theme === 'default' ? '4px' : '2px')};
    width: ${(props) => themeIcon[props.theme]};
    height: ${(props) => themeIcon[props.theme]};
    border-radius: 50%;
    background-color: ${(props) => (props.theme === 'default' ? 'var(--color-placeholder-grey)' : 'transparent')};
    transition: 0.5s;
    &.toggle--checked {
      background-color: ${(props) => (props.theme === 'default' ? 'var(--color-white)' : 'transparent')};
    }
  }
  .toggle-icons {
    top: 2.37px;
    transition: 0.5s;
    filter: grayscale(0%);
    &.toggle--checked {
      filter: grayscale(100%);
      transition: 0.5s;
    }
  }
  .toggle-text {
    font-size: 0.75rem;
    font-weight: 500;
    position: absolute;
    top: 8px;
    right: 12px;
    background-color: transparent;
    color: var(--color-591a1a);
    transition: 0.5s;
    &.toggle--checked {
      left: 12px;
      right: auto;
      color: var(--color-text-black);
      transition: 0.5s;
      opacity: 0.5;
    }
  }
  .toggle--checked {
    left: ${(props) => (props.theme === 'default' ? '36px' : '39px')};
    transition: 0.5s;
  }
`
interface ToggleSwitchButtonProps {
  value: boolean
  icons?: React.ReactNode
  theme?: 'default' | 'icons'
  onChange: (value: boolean) => void
}
export default function ToggleSwitchButton({ value, icons, theme = 'default', onChange }: ToggleSwitchButtonProps) {
  const toggleHandler = () => {
    onChange(!value)
  }
  return (
    <StyledToggleContainer onClick={toggleHandler} theme={theme}>
      <div className={`toggle-container ${value ? 'toggle--checked' : null}`} />
      {icons !== undefined ? (
        <div className={`toggle-circle toggle-icons ${value ? 'toggle--checked' : null}`}>{icons}</div>
      ) : (
        <div className={`toggle-circle ${value ? 'toggle--checked' : null}`} />
      )}
      {icons !== undefined && (
        <div className={`toggle-text ${value ? 'toggle--checked' : null}`}>{value ? '모노' : '전체'}</div>
      )}
    </StyledToggleContainer>
  )
}
