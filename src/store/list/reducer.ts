import { IItem } from "@types";
import { ADD_ITEM, DELETE_MANY, REMOVE_ITEM, SELECT_ALL, UNSELECT_ALL, UPDATE_ITEM } from "./constants";

const INITIAL_STATE: IItem[] = []

interface IAction {
    type: string,
    payload: { item: IItem }
    ids?: string[]
}

export const listReducer = (state = INITIAL_STATE, action: IAction) => {

    switch(action.type) {
        case ADD_ITEM:
            return [...state, action.payload.item]

        case UPDATE_ITEM:
            const id = action.payload.item.id
            const newState = state.map(item => (item.id === id) ? action.payload.item : item)
            return newState

        case REMOVE_ITEM:
            const idToRemove = action.payload.item.id
            const stateWithItemRemoved = state.filter(item => item.id !== idToRemove)
            return stateWithItemRemoved

        case SELECT_ALL:
            const itemsToSelect = state.map(({ isSelected, ...rest }) => ({ ...rest, isSelected: true }))
            return itemsToSelect

        case UNSELECT_ALL:
            const itemsTounSelect = state.map(({ isSelected, ...rest }) => ({ ...rest, isSelected: false }))
            return itemsTounSelect

        case DELETE_MANY:
            const allIds = action.ids
            const stateWithItemsRemoved = state.filter(item => !allIds?.includes(item.id))
            return stateWithItemsRemoved

        default:
            return state
    }
}