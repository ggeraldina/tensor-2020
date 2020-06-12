import React, { useState, SyntheticEvent } from 'react';
import { fetchBooking } from '../../api/fetchBooking';
import { TextInputField, Button } from 'evergreen-ui';
import BookingList from '../BookingList/BookingList';

const SearchForm: React.SFC = (): JSX.Element => {
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(true);
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
    if (!errorPhone) {
      e.preventDefault();
      fetchBooking({phone_number: +phone}).then((result) => {
        if (result.bookings.length) {
          setResult(result.bookings);
          setIsEmpty(false);
        } else {
          setEmptyResult('Ничего не найдено, проверьте правильность введенного номера телефона');
          setIsEmpty(true);
        }
      });
    }
  }

  /** Валидация для номера телефона и сохранение значения в случае успеха. */
  const validatePhone = (value: string): void => {
    if (value.length < 4) {
        setErrorPhone(true)
    } else {
        setErrorPhone(false);
        setPhone(value);
    }
  };

  return (
    <div className="search-form">
        <div className="container">
            <h1 className="search-form__title">Введите номер телефона для поиска бронирований</h1>
            <form className="search-form__form" onSubmit={searchBooking}>
              <TextInputField 
                  placeholder="8 999 999 99 99" 
                  label=""
                  validationMessage={errorPhone && 'Это поле обязательно для заполнения и должно содержать минимум 4 цифры'}
                  onChange={(e: { target: { value: string }}) => {
                    setPhone(e.target.value);
                    validatePhone(e.target.value);
                  }}
                  width="400px"/>
              <Button type="submit" marginTop={4} marginLeft={15}>Найти</Button>
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
