import { createReducer } from '@reduxjs/toolkit';
import { TCardList } from '../../types';
import { fetchCardList } from '../../api/cardList';

const initialState: TCardList = {
  items: [],
  hasMore: false
};

export const cardList = createReducer(initialState, builder =>
  builder
    .addCase(fetchCardList.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.hasMore = payload.hasMore;
      return state;
    })
);
