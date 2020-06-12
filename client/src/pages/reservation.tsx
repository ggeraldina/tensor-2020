import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { cancelBooking } from '../api/cancelBooking';
import { useSelector } from '../helpers/useTypedSelector';
import { useDispatch } from 'react-redux';
 
const Reservation = () => {
    return (
       <SearchForm />
    );
}
 
export default Reservation;