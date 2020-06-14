import { createReducer } from '@reduxjs/toolkit';
import { fetchInitialCardList } from '../../api/initialCardList';
import { IEventList } from '../../types';
import { fetchCardList } from '../../api/cardList';

const initialState: IEventList = {
  events_list: [],
  hasmore: false,
  isLoading: true,
  isLoaded: false,
  placeholders: 6
};

export const cardList = createReducer(initialState, builder =>
  builder
    .addCase(fetchInitialCardList.fulfilled, (state, { payload }) => {
      state.events_list = payload.events_list;
      state.hasmore = payload.hasmore;
      state.placeholders = state.events_list.length;
      state.isLoading = false;
      state.isLoaded = true;
      return state;
    })
    .addCase(fetchInitialCardList.pending, (state) => {
      state.isLoading = true;
      return state;
    })
    .addCase(fetchInitialCardList.rejected, (state) => {
      state.isLoading = false;
      return state;
    })
    .addCase(fetchCardList.fulfilled, (state, { payload }) => {
      state.events_list.push(...payload.events_list);
      state.hasmore = payload.hasmore;
      state.placeholders = payload.events_list.length;
      state.isLoading = false;
      state.isLoaded = true;
      return state;
    })
    .addCase(fetchCardList.pending, (state) => {
      state.isLoading = true;
      return state;
    })
    .addCase(fetchCardList.rejected, (state) => {
      state.isLoading = false;
      return state;
    })
);
