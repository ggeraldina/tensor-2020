import axios from 'axios';
import { baseUrl } from './initialCardList';

export const cancelBooking = 
  async (params: {phone_number?: string, password_to_cancel: string, id: string}) => {
    const response = await axios({
      method: 'POST',
      url: `${baseUrl}/api/v1/cancel_booking`,
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({
        phone_number: params.phone_number,
        password_to_cancel: params.password_to_cancel,
        id: params.id
      })
    });
    return response.data;
};
