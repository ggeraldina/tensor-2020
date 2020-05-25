import React from 'react';
import { TCard } from '../../types';
import { Link } from 'react-router-dom';

const Card: React.SFC<TCard> = (props): JSX.Element => {
  const { photo, title, start_time} = props;
  let fullDate = new Date(start_time);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                  'июля', 'авгуса', 'сентября', 'октября', 'ноября', 'декабря'];

  return (
    <div className="card">
      <img className="card__image" src={photo} alt="Спектакль"/>
      <div className="card__description">
        <h2 className="card__title">{title}</h2>
        <span className="card__time">
          {`${fullDate.getDate()} ${months[fullDate.getMonth()]}, ${fullDate.getHours()}:${fullDate.getMinutes()}0`}
        </span>
        <Link className="card__button" to="/">
          Забронировать
        </Link>
      </div>
    </div>
  );
};

export default Card;
