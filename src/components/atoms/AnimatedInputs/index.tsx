import React, { HTMLAttributes } from 'react'
import { IColors } from '@types'
import styled from 'styled-components'
import { useTheme } from 'hooks'

interface Props extends HTMLAttributes<HTMLInputElement>{
    error?: string
    value: string
    isRequired?: boolean
    placeholder: string
    autoFocus?: boolean
}

export const AnimatedInputs: React.FC<Props> = ({
    id,
    placeholder,
    itemType,
    error,
    onChange,
    value,
    isRequired,
    autoFocus,
    ...rest
}) => {
    const colors = useTheme()

    return (
        <Div colors={colors} {...rest}>
            <input
                autoFocus={autoFocus}
                type={itemType}
                placeholder={placeholder}
                required={isRequired}
                value={value || rest.defaultValue}
                onChange={onChange}
            />
            {error &&
                <p className="error_message">
                    {error}
                </p>
            }
        </Div>
    )
}

interface StyleProps {
    colors: IColors
}

const Div = styled.div<StyleProps>`
    width: 100%;
    height: 30px;
    position: relative;


    label {
        color: ${({ colors }) => colors.normal};
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    input {
        color: ${({ colors }) => colors.normal};
        height: 100%;
        width: calc(100% - 20px);
        background-color: ${({ colors }) => colors.background};
        border: 1px solid ${({ colors }) => colors.inputBorder};
        border-radius: 5px;
        padding: 0 10px;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px ${({ colors }) => colors.background} inset !important;
        -webkit-text-fill-color: ${({ colors }) => colors.normal} !important;
    }

    p.error_message {
        margin: 5px 0;
        font-size: 11px;
        color: ${({ colors }) => colors.alertOnBackground};
        line-height: 14px;
    }

`