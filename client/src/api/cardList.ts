import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEventList } from '../types';

export const fetchCardList = createAsyncThunk(
  'cardList/fetch',
  async (params: {limit: number, offset: number}) => {
    const response = await axios({
      method: 'GET',
      url: `https://tensor-2020.herokuapp.com/api/v1/get_events_list`,
      params: {
        limit: params.limit,
        offset: params.offset
      }
    });
    return response.data as IEventList;
  }
);
