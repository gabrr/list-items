import React, { FormEvent, useState } from 'react'
import styled from "styled-components";
import { useTheme } from 'hooks'
import type { IColors } from '@types';
import { useHistory } from 'react-router';
import { Button, TitleText } from 'components/atoms';
import { AnimatedInputs } from 'components/atoms/AnimatedInputs';
import { isInputValid, INPUT_ERRORS } from 'utils';
import { pageIn } from 'animations';

export const SignIn = () => {
    const colors = useTheme()
    const history = useHistory()
    const [form, setform] = useState({ email: '', password: '' })
    const [errors, seterrors] = useState({ email: '', password: '' })
    const [isLoading, setisLoading] = useState(false)

    const signIn = (e: FormEvent) => {
        e.preventDefault()
        setisLoading(true)

        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (errors.email || errors.password) reject(Error('Access Denied!'))
            }, 2000)

            setTimeout(() => {
                resolve('Access granted!')
            }, 2000)

        })
        .then((res) => {
            history.push('/')
            setisLoading(false)
        })
        .catch(error => {
            console.error(error)
            setisLoading(false)
        })
    }

    const handleInputs = (e: FormEvent<HTMLInputElement>, name: 'email' | 'password') => {
        const value = e.currentTarget.value

        if (!isInputValid({ type: name, value })) {
            seterrors(prev => ({ ...prev, [name]: INPUT_ERRORS[name] }))
            setform({ ...form, [name]: value })
            return
        }
        
        seterrors(prev => ({ ...prev, [name]: '' }))
        setform({ ...form, [name]: value })
    }

    return (
        <Div colors={colors}>
            <TitleText text="Sign In" className="title" />

            <form onSubmit={signIn}>
                <AnimatedInputs
                    className="inputs"
                    itemType="email"
                    placeholder="Email"
                    onChange={(e) => handleInputs(e, 'email')}
                    value={form.email}
                    error={errors.email}
                    isRequired
                />
                <AnimatedInputs
                    className="inputs"
                    itemType="password"
                    onChange={(e) => handleInputs(e, 'password')}
                    value={form.password}
                    error={errors.password}
                    isRequired
                    placeholder="Password"
                />
                
                <Button
                    color="primary"
                    itemType="submit"
                    isLoading={isLoading}
                >
                    Enter
                </Button>
            </form>


        </Div>
    )
}

interface StyleProps {
    colors: IColors
}

const Div = styled.div<StyleProps>`
    height: 100vh;
    width: 100%;
    animation: ${pageIn} 300ms ease-in-out;
    background-color: ${({ colors }) => colors.background};

    .title {
        text-align: center;
        padding-top: 20vh;
        font-size: 19px;
    }

    form {
        width: 26vw;
        max-width: 280px;
        margin: 10vh auto;
        text-align: center;

        @media(max-width: 800px) {
            width: 80%;
        }
    }

    button {
        margin-top: 50px;
    }

    .inputs {
        margin-top: 30px;

        .error_message {
            text-align: left;
            padding-left: 5px;
        }
    }
`