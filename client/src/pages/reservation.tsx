import React, {useEffect} from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import init from '../store/event/event';
import { useDispatch } from 'react-redux';

const Reservation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init());
    }, [dispatch]);

    return (
       <SearchForm />
    );
}
 
export default Reservation;