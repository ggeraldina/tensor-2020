import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEventList } from '../types';

export const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
console.log("baseUrl ", baseUrl)

export const fetchCardList = createAsyncThunk(
  'cardList/fetch',
  async (params: { limit: number, offset: number }) => {
    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/api/v1/get_events_list`,
      params: {
        limit: params.limit,
        offset: params.offset
      }
    });
    return response.data as IEventList;
  }
);
