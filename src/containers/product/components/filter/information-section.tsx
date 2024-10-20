'use client'

import Button from '@/components/button/button'
import { styled } from 'styled-components'

const StyledInformationSection = styled.div`
  margin-bottom: 0.625rem;
`
const StyledInformationSectionBox = styled.div`
  margin-top: 0.625rem;
  display: flex;
  flex-flow: wrap;
  gap: 0.625rem;
`

interface InformationSectionProps {
  title: string
  description: string[]
}

export default function InformationSection({ title, description }: InformationSectionProps) {
  return (
    <StyledInformationSection>
      <p className="f_12 f_bold c_black">{title}</p>
      <StyledInformationSectionBox>
        {description.map((desc) => (
          <Button
            key={desc}
            size="mini"
            theme="tag"
            paddingLR="0.5rem"
            borderRadius="100px"
            noCursor
            marginReset
            type="label"
          >
            {desc}
          </Button>
        ))}
      </StyledInformationSectionBox>
    </StyledInformationSection>
  )
}
