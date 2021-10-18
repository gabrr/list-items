import { useTheme } from 'hooks';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'routes';
import store from 'store';
import { COLORS } from 'utils';


const App: React.FC<any> = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  isDarkMode.addEventListener('change', (e) => {
    const preferedTheme = e.matches ? 'dark' : 'light'
    document?.bgColor && (document.bgColor = COLORS[preferedTheme].background)
  });

  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
