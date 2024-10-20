'use client'

import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

export const SnakbarContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    width: 362px;
  }
  .Toastify__toast {
    border-radius: 0.625rem;
    padding: 0.5rem;
  }
  .Toastify__toast-body {
    padding: 0;
  }
  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }

  .Toastify__toast--info {
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast--success {
    background: rgba(48, 173, 120, 0.8);
  }

  .Toastify__toast--error {
    background: rgba(224, 72, 82, 0.8);
  }
`
export const SnakbarContainerTop = ''
