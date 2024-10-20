import { styled } from 'styled-components'
import Image from 'next/image'

const StyledSnackBar = styled.div`
  width: 100%;
  height: 113px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 13.5px;
`
const StyledAvatar = styled.div`
  width: 79px;
  height: 79px;
  position: relative;
`
const StyledContent = styled.div`
  padding: 1rem;
  background: var(--color-white);
  border-radius: 0.625rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  flex: 1;
  h5 {
    margin: 0;
    font-size: 16px;
    color: var(--color-point);
    margin-bottom: 0.25rem;
  }
  p {
    color: var(--color-text-black);
    font-size: 14px;
    font-weight: 300;
  }
`
interface SnackBarProps {
  title: string
  content: string
  image: string | null
}
export default function SnackBar({ title, content, image }: SnackBarProps) {
  return (
    <StyledSnackBar>
      <StyledAvatar>
        <Image
          src={image ?? '/images/avatar/guide.png'}
          alt="Avatar"
          sizes="89px"
          fill
          priority
          quality={85}
          style={{ objectFit: 'cover', borderRadius: '89px' }}
        />
      </StyledAvatar>
      <StyledContent>
        {title !== '' && <h5>{title}</h5>}
        {content !== '' && <p>{content}</p>}
      </StyledContent>
    </StyledSnackBar>
  )
}
