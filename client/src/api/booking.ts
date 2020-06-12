import axios from 'axios';
import { IBookingResult } from '../types';
import { baseUrl } from './initialCardList';

export const fetchBooking = 
  async (params: {phone_number: string, password_to_cancel: string, event: string, tickets: {id: string}[]}) => {
    const response = await axios({
      method: 'POST',
      url: `${baseUrl}/api/v1/add_booking`,
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({
        phone_number: params.phone_number,
        password_to_cancel: params.password_to_cancel,
        event: params.event,
        tickets: params.tickets
      })
    });
    return response.data as IBookingResult;
};
