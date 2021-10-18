import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { themeReducer } from "store/theme/reducer";
import { listReducer } from "store/list/reducer";

// reducers
const reducers = combineReducers({
    theme: themeReducer,
    list: listReducer
})

export type AppState = ReturnType<typeof reducers>;

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))