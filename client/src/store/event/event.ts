import { createReducer } from '@reduxjs/toolkit';
import { IEventTickets } from '../../types';
import { fetchEvent } from '../../api/event';

const initialState: IEventTickets = {
    event: {
      id: '',
      photo: '',
      title: '',
      start_time: '',
      end_time: '',
      description: '',
      director: '',
      actors: ''
    },
    tickets: [],
    isLoading: false,
    isLoaded: false,
};

export const event = createReducer(initialState, builder =>
  builder
    .addCase(fetchEvent.fulfilled, (state, { payload }) => {
      state.tickets.push(...payload.tickets);
      state.event = payload.event;
      state.isLoaded = true;
      state.isLoading = false;
      return state;
    })
    .addCase(fetchEvent.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchEvent.rejected, (state) => {
      state.isLoading = false;
    })
);
