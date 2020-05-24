import { createReducer } from '@reduxjs/toolkit';
import { TCardList } from '../../types';
import { fetchCardList } from '../../api/cardList';

const initialState: TCardList = {
  events_list: [],
  hasMore: false
};

export const cardList = createReducer(initialState, builder =>
  builder
    .addCase(fetchCardList.fulfilled, (state, { payload }) => {
      state.events_list.push(...payload.events_list);
      state.hasMore = payload.hasMore;
      return state;
    })
);
