import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TExample } from '../types';

export const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:1234';

export const fetchExample = createAsyncThunk(
  'example/fetch',
  async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/example/`,
    });
    return response.data as TExample;
  }
);
