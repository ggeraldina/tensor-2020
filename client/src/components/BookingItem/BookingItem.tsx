import React from 'react';
import { IBooking } from '../../types';
import { Button } from 'evergreen-ui';

const BookingList: React.SFC<IBooking> = (props): JSX.Element => {
  const { event, tickets } = props;

  let fullDate = new Date(event.start_time);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  return (
      <div className="booking-item">
        <h2 className="booking-item__title">Спектакль: "{ event.title }"</h2>
        <div className="booking-item__wrapper">
            <span className="booking-item__date">
                <strong>Дата:</strong> {`${fullDate.getDate()} ${months[fullDate.getMonth()]}`} <br/>
                <strong>Время начала:</strong> {`${fullDate.getHours()}:${fullDate.getMinutes()}0`}
            </span>
            <span className="booking-item__tickets-title"><strong>Билеты</strong></span>
            <ol className="booking-item__tickets">
                {tickets.map(ticket => (
                    <li className="booking-item__ticket" key={ticket.id}>
                        <span className="booking-item__info">Ряд: {ticket.row}</span>
                        <span className="booking-item__info">Место: {ticket.seat}</span>
                        <span className="booking-item__info">Цена: {ticket.price} руб.</span>
                    </li>
                ))}
            </ol>
            <Button className="booking-item__button" type="button">Отменить бронирование</Button>
        </div>
      </div>
  );
};

export default BookingList;
