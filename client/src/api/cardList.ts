import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCardList } from '../types';

export const fetchCardList = createAsyncThunk(
  'cardList/fetch',
  async (params: {limit: number, offset: number}) => {
    const response = await axios({
      method: 'GET',
      url: `/api/v1/get_events_list`,
      params: {
        limit: params.limit,
        offset: params.offset
      }
    });
    return response.data as TCardList;
  }
);
