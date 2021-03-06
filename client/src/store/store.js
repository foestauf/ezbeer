// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import { loadState, saveState } from './sessionStorage';

const initialState = loadState();
delete initialState.errors;
// const middleware = [thunk];
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     // eslint-disable-next-line no-underscore-dangle
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
