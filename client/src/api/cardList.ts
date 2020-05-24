import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCardList } from '../types';

export const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:5000';

export const fetchCardList = createAsyncThunk(
  'cardList/fetch',
  async (params: {limit: number, offset: number}) => {
    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/api/v1/get_events_list`,
      params: {
        limit: params.limit,
        offset: params.offset
      }
    });
    return response.data as TCardList;
  }
);
