import { IItem } from '@types';
import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, SELECT_ALL, UNSELECT_ALL, DELETE_MANY } from './constants';


export const addItem = ({ id, label = '' }: { id: string, label?: string }) => ({
    type: ADD_ITEM,
    payload: { item: { id, label, isSelected: false, isEditing: true } }
})

export const updateItem = (item: IItem) => ({
    type: UPDATE_ITEM,
    payload: { item }
})

export const deleteItem = (id: string) => ({
    type: REMOVE_ITEM,
    payload: { item: { id } as IItem }
})

export const selectAllItems = () => ({
    type: SELECT_ALL,
    payload: { item: {} as IItem }
})

export const unselectAllItems = () => ({
    type: UNSELECT_ALL,
    payload: { item: {} as IItem }
})

export const deleteMany = (ids: string[]) => ({
    type: DELETE_MANY,
    payload: { item: {} as IItem },
    ids
})