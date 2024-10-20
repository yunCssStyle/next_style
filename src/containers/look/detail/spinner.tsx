'use client'

import { CommonSkeleton } from '@/app/ui/skeleton'

export default function DetailSpinner({ optionsSpinner = true, itemsSpinner = true, type = 'detail' }) {
  return (
    <>
      {optionsSpinner && (
        <div className="options">
          <CommonSkeleton width="100%" height="40px" minHeight="40px" borderRadius="10px" />
        </div>
      )}
      <div className="spinner">
        <div className="mainItems">
          {Array.from({ length: 5 }, (_, index) => (
            <CommonSkeleton key={index} width="20%" height="326px" minHeight="100px" borderRadius="10px" />
          ))}
        </div>

        <div className="items">
          {itemsSpinner &&
            Array.from({ length: 5 }, (_, index) => (
              <CommonSkeleton key={index} width="174px" height="315px" minHeight="100px" borderRadius="10px" />
            ))}
        </div>
      </div>
    </>
  )
}
