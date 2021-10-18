import React, { HTMLAttributes, useEffect } from 'react'
import type { IItem } from '@types'
import styled from 'styled-components'
import { ListItem } from 'components/organisms'
import { useListStates } from 'hooks'
import { useDispatch } from 'react-redux'
import { addItem } from 'store/list/actions'

interface Props extends HTMLAttributes<HTMLDivElement> {
    items?: IItem[]
}

export const ItemsList: React.FC<Props> = ({ items, ...rest }) => {
    const { isListEmpty } = useListStates()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isListEmpty) dispatch(addItem({ id: items?.length + 'id', label: 'This is a draft, you can edit it by clicking on the edit icon.' }))
    }, [isListEmpty])

    return (
        <Div {...rest}>
            {items?.map((item, index) => {
                return <ListItem item={item} key={index + 'list_item'} />
            })}
        </Div>
    )
}


const Div = styled.div`
    

`