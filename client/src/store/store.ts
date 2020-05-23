import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { example } from './example/example';

export const rootReducer = combineReducers({
 example
});

export const initializeStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

const store = initializeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Function => useDispatch<AppDispatch>();

export default store;
