import { colorPoint, colorTransparent } from '@/constants/theme'
import { styled } from 'styled-components'

// 디폴트 상품 카드
export const StyledDefaultCard = styled.div`
  padding: 1rem;
  background-color: var(--color-white);
  border-radius: 4px;
  & + & {
    margin-top: 0.75rem;
  }
`
// 상품 카드 관련
interface StyledProductCardProps {
  $cursor: string
}
interface StyledProductCardInnerProps {
  $select: boolean
}
export const StyledProductCard = styled.div<StyledProductCardProps>`
  /* 공통 */
  width: 104px;
  height: 136px;
  cursor: ${({ $cursor }) => $cursor};
  position: relative;
  display: flex;
  flex-direction: column;
`
export const StyledProductCardInner = styled.div<StyledProductCardInnerProps>`
  padding: 8px 12px;
  width: 80px;
  height: 88px;
  background-color: ${({ $select }) => ($select ? 'var(--color-point-select)' : 'var(--color-white)')};
  border-radius: 4px;
  border: 1.5px solid ${({ $select }) => ($select ? colorPoint : colorTransparent)};
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(241, 240, 247, 0.45);
`
export const StyledProductCardWish = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  z-index: 1;
`
export const StyledProductCardActive = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 10px;
  height: 10px;
  z-index: 1;
  border-radius: 100%;
`

export const StyledProductCardEdit = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  z-index: 1;
`
export const StyledProductCardTitle = styled.div`
  flex: 1;
  font-size: 10px;
  padding: 7px;
  color: var(--color-black);
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: center;
`
// 룩북 그룹 내 한개의 스타일 카드
export const StyledLookBookDetailCard = styled.div`
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow:
    0px 10px 22px 0px rgba(184, 184, 184, 0.1),
    0px 41px 41px 0px rgba(184, 184, 184, 0.09),
    0px 92px 55px 0px rgba(184, 184, 184, 0.05),
    0px 163px 65px 0px rgba(184, 184, 184, 0.01),
    0px 254px 71px 0px rgba(184, 184, 184, 0);
  .sd-box {
    background-color: var(--color-white);
    border-radius: 0.25rem;
    /* height: 519px; */
    display: flex;
    flex-direction: column;
    .sd-header {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--color-grey);
      padding: 0.5rem;
      box-sizing: border-box;
      flex-direction: row;
      .sd-header-title {
        flex: 1;
        min-width: 0;
      }
    }
    .sd-body {
      width: 100%;
      flex: 1;
      border-bottom: 1px solid var(--color-grey);
      display: flex;
      flex-direction: row;
      .sd-body-img {
        width: 134px;
        position: relative;
      }
      .sd-body-contents {
        flex: 1;
        min-width: 0;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        .label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-black);
          margin-bottom: 0.5rem;
        }
        .memo {
          width: 100%;
          height: 100%;
          min-height: 101px;
          font-weight: 500;
          font-size: 0.75rem;
          line-height: 0.875rem;
          background-color: var(--color-grey);
          border: 1px solid var(--color-grey);
          border-radius: 3px;
          padding-top: 1rem;
          padding-bottom: 1rem;
          padding-left: 1rem;
          padding-right: 1rem;
          color: var(--color-black);
          box-sizing: border-box;
        }
      }
    }
    .sd-footer {
      width: 100%;
      height: auto;
      /* margin: 0.5rem; */
    }
  }
`
// 룩북 그룹 카드
export const StyledStyleLookBookCard = styled.div`
  width: 100%;
  min-height: 202px;
  height: auto;
  display: flex;
  flex-direction: row;
  border-radius: 0.25rem;
  box-sizing: border-box;
  position: relative;
  box-shadow:
    0px 1px 2px 0px rgba(204, 204, 204, 0.05),
    0px 4px 4px 0px rgba(204, 204, 204, 0.04),
    0px 9px 6px 0px rgba(204, 204, 204, 0.02),
    0px 17px 7px 0px rgba(204, 204, 204, 0.01),
    0px 26px 7px 0px rgba(204, 204, 204, 0);
  .left_box {
    width: 141px;
    min-width: 141px;
    height: 100%;
    background-color: var(--color-point-select);
    .image_box {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
  .right_box {
    width: 100%;
    min-width: 0;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: var(--color-white);
    .right_innter_box {
      width: 100%;
      height: 100%;
      padding: 1rem 0.25rem 1.25rem 1.25rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .top_icon_box {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .title {
        margin-bottom: 0.5rem;
        padding-right: 1rem;
        h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0;
        }
      }
      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .type {
          font-size: 0.625rem;
          width: 40px;
          color: var(--color-black);
        }
        .value {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          .grid {
            width: 100%;
            display: inline-flex;
            gap: 0.25rem;
          }
        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        .col {
          display: flex;
          flex-direction: column;
          .type {
            p {
              font-size: 0.625rem;
              color: var(--color-black);
              margin: 0;
            }
          }
          .value {
            p {
              color: var(--color-black);
              font-size: 0.75rem;
              font-weight: 500;
              margin: 0;
            }
          }
        }
      }
    }
  }
`
// 스타일 생성 -> 상품 지정 하는 곳 시작
// 큰 컨테이너
export const StyledStyleSelectProduct = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
// 이미지 영역
export const StyledImageWrap = styled.div`
  width: 66px;
  height: 82px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-f5f5f5);
  border-radius: 0.25rem;
`
// 상품 정보 영역
export const StyledProductInfo = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
// 상품 코드
export const StyledProdCode = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-484848);
`
// 상품 카테고리
export const StyledCategory = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-272727);
  margin-top: 0.375rem;
`
// 컬러 및 패턴 컨테이너
export const StyledColorPattern = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  margin-top: 0.375rem;
`
// 컬러 영역
export const StyledColor = styled.div`
  flex: 1;
  height: 20px;
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--color-white);
  border-radius: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`
// 패턴 영역
export const StyledPattern = styled.div`
  flex: 1;
  height: 20px;
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--color-8a8a8a);
  border-radius: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-8a8a8a);
`
// 스타일 생성 -> 상품 지정 하는 곳 끝

// 스타일 룩북 공유 카드 부분
export const StyledSharedLookBookCard = styled.div`
  width: 80%;
  background-color: var(--color-white);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
`
interface StyledManagerCardProps {
  $isBorder: boolean
}
export const StyledManagerCard = styled.div<StyledManagerCardProps>`
  width: 100%;
  position: relative;
  border: ${({ $isBorder }) => ($isBorder ? '1px solid var(--color-grey)' : 'none')};
  border-radius: 0.5rem;
  cursor: pointer;
  .style_manager_styles {
    text-align: center;
    font-weight: 400;
    font-size: 0.875rem;
    padding-top: 1.6rem;
    color: var(--color-black);
    span {
      font-weight: 700;
      color: var(--color-text-black);
    }
  }
  .style_manager_colors {
    position: absolute;
    left: 1rem;
    bottom: 17px;
    .color_container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }
`
