import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEventTickets } from '../types';
import { baseUrl } from './initialCardList';

export const fetchEvent = createAsyncThunk(
  'event/fetch',
  async (params: { id: string }) => {
    const response = await axios({
      method: 'GET',
      url: `https://tensor-2020-test.herokuapp.com/api/v1/get_event`,
      params: {
        id: params.id
      }
    });
    return response.data as IEventTickets;
  }
);
