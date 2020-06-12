import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { example } from './example/example';
import { cardList } from './cardList/cardList';
import { event } from './event/event';

export const rootReducer = combineReducers({
  example,
  cardList,
  event,
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
