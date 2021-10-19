import { IItem } from '@types';
import react, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'store/theme/actions';
import { COLORS } from "utils";

export const useTheme = () => {
    const disptach = useDispatch()
    const initialTheme = useSelector(state => state.theme)
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    useEffect(() => {
      const theme = isDarkMode.matches ? 'dark' : 'light'
      disptach(setTheme(theme))
    }, [])

    isDarkMode.addEventListener('change', (e) => {
      const preferedTheme = e.matches ? 'dark' : 'light'
      disptach(setTheme(preferedTheme))
    });
    
    return COLORS[initialTheme as 'dark' | 'light']
}

export const usePageTitle = (title: string) => {
    useEffect(() => {
      if (title) document.title = title 
    }, [title]);
};

export const useListStates = () => {
  const list = useSelector(state => state.list)
  
  const isListEmpty = list.length === 0
  const isAllSelcted = list.length ? list.every(({ isSelected }) => isSelected) : false
  const isAnySelcted = list.length ? list.some(({ isSelected }) => isSelected) : false
  const isAnyEmpty = list.length ? list.some(({ label }) => !label?.trim()) : false

  return {
    isAllSelcted,
    isAnySelcted,
    isAnyEmpty,
    isListEmpty,
  }
}