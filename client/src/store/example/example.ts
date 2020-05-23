import { createReducer } from '@reduxjs/toolkit';
import { TExample } from '../../types';
import { fetchExample } from '../../api/example';

const initialState: TExample = {
  message: ''
};

export const example = createReducer(initialState, builder =>
  builder
    .addCase(fetchExample.fulfilled, (state, { payload }) => {
      state.message = payload.message;
      return state;
    })
);
