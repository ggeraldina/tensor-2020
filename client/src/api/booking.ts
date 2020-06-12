import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IBookingResult } from '../types';

export const fetchBooking = 
  async (params: {phone_number: string, password_to_cancel: string, event: string, tickets: {id: string}[]}) => {
    const data = JSON.stringify({
      phone_number: params.phone_number,
      password_to_cancel: params.password_to_cancel,
      event: params.event,
      tickets: params.event
    });
    const response = await axios({
      method: 'POST',
      url: `/api/v1/add_booking`,
      params: data
    });
    return response.data as IBookingResult;
};
