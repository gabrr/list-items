import { IItem } from '@types';
import store from "store"
import { addItem, updateItem, deleteItem, selectAllItems, deleteMany, unselectAllItems } from 'store/list/actions';

const mock: IItem[] = [{ id: 'one', label: 'heye', isEditing: false, isSelected: false }]

describe('List Tests', () => {
    test('Add an Item', () => {  
        store.dispatch(addItem({ id: 'one', label: 'heye' }))
    
        const list = store.getState().list
    
        expect(list.length).toEqual(1)
    })
        
    test('Update an Item', () => {
        store.dispatch(addItem({ id: 'one', label: 'heye' }))      
        store.dispatch(updateItem({ id: 'one', label: 'updated', isEditing: false, isSelected: false }))
        
        const list = store.getState().list

        expect(list[0]).toEqual({ id: 'one', label: 'updated', isEditing: false, isSelected: false })
    })
    
    
    test('Delete an Item', () => {
        store.dispatch(addItem({ id: 'one', label: 'heye' }))  
        store.dispatch(addItem({ id: 'two', label: 'heye' }))
        store.dispatch(deleteItem('one'))
        
        const list = store.getState().list        
        
        expect(list.length).toEqual(1)
    })

    test('Select All Items', () => {
        store.dispatch(addItem({ id: 'one', label: 'heye' }))  
        store.dispatch(addItem({ id: 'two', label: 'heye' }))
        store.dispatch(addItem({ id: 'three', label: 'heye' }))
        store.dispatch(selectAllItems())
        
        const list = store.getState().list        
        
        expect(list.every(({ isSelected }) => isSelected)).toEqual(true)
    })

    test('Unselect All Items', () => {
        store.dispatch(addItem({ id: 'one', label: 'heye' }))  
        store.dispatch(addItem({ id: 'two', label: 'heye' }))
        store.dispatch(addItem({ id: 'three', label: 'heye' }))
        store.dispatch(unselectAllItems())
        
        const list = store.getState().list        
        
        expect(list.every(({ isSelected }) => !isSelected)).toEqual(true)
    })

    test('Delete Many Items', () => {
        store.dispatch(addItem({ id: 'one', label: 'heye' }))  
        store.dispatch(addItem({ id: 'two', label: 'heye' }))
        store.dispatch(addItem({ id: 'three', label: 'heye' }))
        store.dispatch(deleteMany(['two', 'three']))
        
        const list = store.getState().list        
        
        expect(list.every(({ id }) => !['two', 'three'].includes(id))).toEqual(true)
    })
        
})

