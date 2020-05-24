import React from 'react';
import { TCard } from '../../types';
import Link from 'react-redux';

const Card: React.SFC<TCard> = (props): JSX.Element => {
  const { photo, title, start_time} = props;
  const [date, time] = start_time.split("T");
  let fullDate = new Date(date);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                  'июля', 'авгуса', 'сентября', 'октября', 'ноября', 'декабря'];

  return (
    <div className="card">
      <img className="card__image" src={photo} alt="Спектакль"/>
      <div className="card__description">
        <h2 className="card__title">{title}</h2>
        <span className="card__time">
          {`${fullDate.getDate()} ${months[fullDate.getMonth()]}`}, {time.slice(0, 5)}
        </span>
        <a className="card__button" href="#">
          Забронировать
        </a>
      </div>
    </div>
  );
};

export default Card;
