import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEventList } from '../types';

export const fetchInitialCardList = createAsyncThunk(
  'initialCardList/fetch',
  async () => {
    const response = await axios({
      method: 'GET',
      url: `http://tensor-2020-test.herokuapp.com/api/v1/get_events_list`,
      params: {
        limit: 6,
        offset: 0
      }
    });
    return response.data as IEventList;
  }
);