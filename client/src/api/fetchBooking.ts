import axios from 'axios';
import { IBookingList } from '../types';

export const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';

export const fetchBooking = async (params: { phone_number: number }) => {
  const response = await axios({
    method: 'GET',
    url: `https://tensor-2020-test.herokuapp.com/api/v1/get_bookings_list`,
    params: {
      phone_number: params.phone_number,
    }
  });
  return response.data as IBookingList;
};
