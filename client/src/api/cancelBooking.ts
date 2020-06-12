import axios from 'axios';
import { baseUrl } from './initialCardList';

export const cancelBooking = 
  async () => {
    const response = await axios({
      method: 'POST',
      url: `https://tensor-2020-test.herokuapp.com/api/v1/cancel_booking`,
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({
        phone_number: 88005353535,
        password_to_cancel: "password",
        id: "000000000000000000000007"
      })
    });
    return response.data;
};
