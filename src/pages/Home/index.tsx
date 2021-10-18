import React from 'react'
import type { IColors } from '@types'
import styled from 'styled-components'
import { useListStates, useTheme } from 'hooks'
import { TitleText } from 'components/atoms'
import { Button } from 'components/atoms'
import { ItemsList } from 'components/organisms'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, deleteMany, selectAllItems, unselectAllItems } from 'store/list/actions'
import { pageIn } from 'animations'

export const Home = () => {
    const colors = useTheme()
    const dispatch = useDispatch()
    const list = useSelector(state => state.list)
    const { isAllSelcted, isAnyEmpty, isAnySelcted } = useListStates()
    

    const handleAddItem = () => {
        const newId = list.length + 'id'
        !isAnyEmpty && dispatch(addItem({ id: newId }))
    }

    const handleSelectAll = () => {
        isAllSelcted ? dispatch(unselectAllItems()) : dispatch(selectAllItems())
    }

    const handleDeleteAllSelected = () => {
        const ids = list.filter(({ isSelected }) => isSelected).map(({ id }) => id)
        dispatch(deleteMany(ids))
    }

    return (
        <Div colors={colors}>
            <TitleText className="title" text="Item List" />

            <div className="container">
                <Button color="primary" onClick={handleSelectAll}>
                    {isAllSelcted ? 'Unselect All' : "Select All"}
                </Button>

                <ItemsList
                    className="items_list"
                    items={list}
                />

                <div className="row">
                    <Button color="primary" isDisabled={isAnyEmpty} onClick={handleAddItem}>
                        Add Item
                    </Button>
                    {isAnySelcted && <Button color="negative" onClick={handleDeleteAllSelected}>
                        Delete Selected Items
                    </Button>}
                </div>

            </div>

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
        padding-top: 5vh;
        font-size: 19px;
    }


    .container {
        width: 45vw;
        margin: 30px auto;
        max-width: 430px;

        @media(max-width: 800px) {
            width: 95%;
        }

        .row {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
        }
    }
    .items_list {
        margin-top: 20px;
        width: 100%;
    }
`