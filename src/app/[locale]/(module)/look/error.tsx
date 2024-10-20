'use client'

import { styled } from 'styled-components'
import Image from 'next/image'
import Button from '@/components/button/button'
import IconCloseXThin from '@/components/icons/icon-close-x-thin'
import postMessageWeb from '@/utils/iframe-utils'
import { colorBlack } from '@/constants/theme'

const StyledError = styled.div`
  width: 100%;
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  position: relative;
  & > button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: var(--error-main-container-level);
    position: relative;
  }
`
export default function LookError({ reset }: { reset: () => void }) {
  return (
    <StyledError>
      <Button theme="none" size="smallF" paddingLR="0px" onClick={() => postMessageWeb('close', '')}>
        <IconCloseXThin width={24} height={24} viewBox="0 0 12 12" stroke={colorBlack} />
      </Button>
      <div className="inner">
        <div style={{ width: '100px', height: '100px', position: 'relative' }}>
          <Image
            src="/images/avatar/guide.png"
            alt="Avatar"
            sizes="100px"
            fill
            priority
            quality={85}
            style={{ objectFit: 'cover', borderRadius: '100px' }}
          />
        </div>
        <h1 className="c_black f_18 f_bold">스타일 추천 에러가 발생 하였습니다.</h1>
        <br />
        <br />
        <Button size="medium" theme="primary" borderRadius="3px" onClick={() => reset()}>
          다시 호출하기
        </Button>
      </div>
    </StyledError>
  )
}
