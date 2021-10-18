import type { IColors } from '@types'
import { pulsing, rotating } from 'animations'
import { useTheme } from 'hooks'
import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends HTMLAttributes<HTMLButtonElement>{
    color: 'negative' | 'primary'
    isLoading?: boolean
    isDisabled?: boolean
}

export const Button: React.FC<Props> = ({ color, children, isLoading, isDisabled, ...rest }) => {
    const colors = useTheme()

    return (
        <CustomButton isLoading={isLoading} colors={colors} color={color} disabled={isDisabled} {...rest}>
            {children}
        </CustomButton>
    )
}

interface StyleProps {
    colors: IColors
    color: Props['color']
    isLoading: boolean | undefined
}

const CustomButton = styled.button<StyleProps>`
    background-color: ${({ colors, color }) => color === 'negative' ? colors.buttonNegativeBg : colors.buttonPrimaryBg};
    padding: 10px 25px;
    color: ${({ colors }) => colors.buttonText};
    border: none;
    border-radius: 5px;
    transition: opacity 200ms ease-in-out;
    position: relative;
    overflow: hidden;

    &:disabled {
        opacity: 0.4;
    }

    &:not(&:disabled):hover {
        cursor: pointer;
        opacity: 0.8;
    }

    &::after {
        content: 'Loading...';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${({ colors, color }) => color === 'negative' ? colors.buttonNegativeBg : colors.buttonPrimaryBg};
        top: 0;
        left: 0;
        animation: ${pulsing} 300ms infinite alternate ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: ${({ isLoading }) => isLoading ? '1' : '0'};
        transition: 200ms ease-in-out;
        font-size: 11px;
    }
`