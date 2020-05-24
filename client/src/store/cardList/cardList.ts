import { createReducer } from '@reduxjs/toolkit';
import { TCardList } from '../../types';
import { fetchCardList } from '../../api/cardList';

const initialState: TCardList = {
  events_list: [],
  hasmore: false
};

export const cardList = createReducer(initialState, builder =>
  builder
    .addCase(fetchCardList.fulfilled, (state, { payload }) => {
      state.events_list.push(...payload.events_list);
      state.hasmore = payload.hasmore;
      return state;
    })
);
