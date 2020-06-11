import { createReducer } from '@reduxjs/toolkit';
import { fetchInitialCardList } from '../../api/initialCardList';
import { IEventList } from '../../types';
import { fetchCardList } from '../../api/cardList';

const initialState: IEventList = {
  events_list: [],
  hasmore: false
};

export const cardList = createReducer(initialState, builder =>
  builder
    .addCase(fetchInitialCardList.fulfilled, (state, { payload }) => {
      state.events_list = payload.events_list;
      state.hasmore = payload.hasmore;
      return state;
    })
    .addCase(fetchCardList.fulfilled, (state, { payload }) => {
      state.events_list.push(...payload.events_list);
      state.hasmore = payload.hasmore;
      return state;
    })
);
