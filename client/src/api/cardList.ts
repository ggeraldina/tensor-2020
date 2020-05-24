import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCardList } from '../types';

export const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:1234';

export const fetchCardList = createAsyncThunk(
  'cardList/fetch',
  async (params: {limit: number, offset: number}) => {
    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/get_list_events/`,
      params: {
        limit: params.limit,
        offset: params.offset
      }
    });
    return response.data as TCardList;
  }
);
