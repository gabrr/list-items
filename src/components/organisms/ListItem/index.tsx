import { IColors, IItem } from '@types'
import { Deleteicon, Editicon } from 'components/atoms'
import { AnimatedInputs } from 'components/atoms/AnimatedInputs'
import { useTheme } from 'hooks'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem, updateItem } from 'store/list/actions'
import styled from 'styled-components'

interface Props {
    item: IItem
}

export const ListItem: React.FC<Props> = ({ item: { id, label, isSelected, isEditing }, ...rest }) => {
    const dispatch = useDispatch()
    const [input, setinput] = useState(label)
    const colors = useTheme()

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setinput(e.currentTarget.value)
    }

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.currentTarget.checked
        dispatch(updateItem({ id, label, isSelected: isChecked, isEditing }))
    }

    const handleDeleteItem = () => {
        dispatch(deleteItem(id))
    }

    const handleEditing = () => {
        dispatch(updateItem({ id, label, isSelected, isEditing: true }))
    }

    const handleUpdate = () => {
        dispatch(updateItem({ id, label: input, isSelected, isEditing: false }))
    }
    
    return (
        <Div {...rest} id={id} colors={colors} className={isSelected ? 'selected' : ''}>
            {!isEditing && <input type="checkbox" name="select" id="select" onChange={handleSelect} checked={isSelected} />}

            {isEditing ?
                <AnimatedInputs
                    className="inputs"
                    itemType="text"
                    placeholder="Set a new label"
                    defaultValue={label}
                    onChange={handleInput}
                    value={input}
                    onBlur={handleUpdate}
                    isRequired
                    autoFocus
                /> :
                <p className="label">
                    {label}
                </p>}

            <div className="right">
                <button className="edit" onClick={handleEditing}>
                    <Editicon />
                </button>
                <button className="delete" onClick={handleDeleteItem}>
                    <Deleteicon />
                </button>
            </div>
        </Div>
    )
}

interface StyleProps {
    colors: IColors
}

const Div = styled.div<StyleProps>`
    width: calc(100% - 40px);
    height: 30px;
    background-color: ${({ colors }) => colors.background};
    border: 1px solid ${({ colors }) => colors.inputBorder};
    border-radius: 5px;
    padding: 10px 20px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.selected {
        border: 1px solid ${({ colors }) => colors.backgroundOverBackground};
        background-color: ${({ colors }) => colors.backgroundOverBackground};
    }

    .label {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 10px;
        font-size: 13px;
        color: ${({ colors }) => colors.normal};
    }

    input {
        margin: 0;

        &:hover {
            cursor: pointer;
        }
    }

    .right {
        display: flex;
        justify-content: space-between;

        svg {
            transition: transform 250ms ease-in-out;
            position: relative;

            & path {
                fill: ${({ colors }) => colors.svgNormal};
            }
        }

        button:hover svg {
            transform: rotate(15deg);

            & path {
                fill: ${({ colors }) => colors.svgNormalHover};
            }
        }

        button.delete:hover svg {
            transform: rotate(-15deg);
        }

        button {
            margin-left: 7px;
            border: none;
            border-radius: 100%;
            height: 20px;
            width: 20px;
            background-color: transparent;

            &.delete:hover {
                background-color: ${({ colors }) => colors.negativeHover};
            }

            &:hover {
                background-color: ${({ colors }) => colors.normalHover};
                cursor: pointer;
            }
        }

    }

`