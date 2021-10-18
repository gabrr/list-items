import type { IColors } from '@types'
import { useTheme } from 'hooks'
import React, { HTMLAttributes, ReactChild, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

interface Props extends HTMLAttributes<HTMLHeadElement>{
    text: string
}

export const TitleText: React.FC<Props> = ({ text, ...rest }) => {
    const colors = useTheme()

    return (
        <P colors={colors} {...rest}>
            {text}
        </P>
    )
}

interface StyleProps {
    colors: IColors
}

const P = styled.h1<StyleProps>`
    margin: 0;
    color: ${({ colors }) => colors.normal};
`