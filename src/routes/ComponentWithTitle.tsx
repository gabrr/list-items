import { usePageTitle } from 'hooks'
import React from 'react'

interface Props {
    title: string
    component: React.FC<any>
}

export const ComponentWithTitle: React.FC<Props> = ({ title, component: Component, ...rest }) => {
    usePageTitle(title)
    return <Component {...{ ...rest }} />
}
