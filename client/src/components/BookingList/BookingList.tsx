import React, {useState, useEffect} from 'react';
import { IBookingList } from '../../types';
import BookingItem from '../BookingItem/BookingItem';

const BookingList: React.SFC<IBookingList> = (props): JSX.Element => {
  const { bookings, phone_number } = props;
  const [id, setId] = useState('');
  const [list, setList] = useState(bookings);

  const findDeletedItem = (value: string) => {
    setId(value);
  };

  useEffect(() => { 
    const newList = bookings.filter((item) => item.id !== id);

    bookings.map((booking, index) => {
      if (id === booking.id) {
        bookings.splice(index, 1);
      }
    })
    
    setList(newList);
  }, [id])

  return (
      <div className="booking-list">
        {list.length > 0 ?
          <ul className="booking-list__list">
            {list.map(booking => (
              <li className="booking-list__item" key={booking.id}>
                <BookingItem 
                  id={booking.id} 
                  event={booking.event} 
                  tickets={booking.tickets}
                  phone_number={phone_number}
                  findDeletedItem={findDeletedItem}/>
              </li>
            ))}
          </ul>
          : <div className="booking-list__empty">Список пуст</div>
        }
        
      </div>
  );
};

export default BookingList;
