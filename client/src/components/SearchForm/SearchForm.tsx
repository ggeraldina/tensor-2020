import React, { useState, SyntheticEvent } from 'react';
import { fetchBooking } from '../../api/fetchBooking';
import { SearchInput, Button } from 'evergreen-ui';
import BookingList from '../BookingList/BookingList';

const SearchForm: React.SFC = (): JSX.Element => {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState([
    {
      id: '',
      event: {
        id: '',
        title: '',
        start_time: ''
      },
      tickets: [{
        id: '',
        row: 0,
        seat: 0,
        price: 0
      }],
    }
  ]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [emptyResult, setEmptyResult] = useState('Список пуст');

  const searchBooking = (e: SyntheticEvent) => {
    e.preventDefault();
    fetchBooking({phone_number: +phone}).then((result) => {
      if (result.bookings.length) {
        setResult(result.bookings);
        setIsEmpty(false);
      } else {
        setEmptyResult('Ничего не найдено, проверьте правильность введеных даных');
        setIsEmpty(true);
      }
    });
  }

  return (
    <div className="search-form">
        <div className="container">
            <h1 className="search-form__title">Введите номер телефона <br /> для поиска бронирований</h1>
            <form className="search-form__form" onSubmit={searchBooking}>
              <SearchInput 
                  placeholder="8 999 999 99 99" 
                  onChange={(e: { target: { value: string }}) => setPhone(e.target.value)}
                  width="400px"
                  paddingRight={20} />
              <Button type="submit">Найти</Button>
            </form>
            <div className="search-form__result">
              {!isEmpty ? 
                <BookingList bookings={result} phone_number={phone}/>
              : <div className="search-form__empty">{ emptyResult }</div>}
            </div>
        </div>
    </div>  
  );
};

export default SearchForm;
