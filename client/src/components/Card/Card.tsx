import React from 'react';
import { IEvent } from '../../types';
import { Link } from 'react-router-dom';

export const CardPlaceholder: React.SFC = () => {
  return (
    <div className="card__placeholder">
      <div className="card__placeholder-image">
        <div className="placeholder" />
      </div>
      <div className="card__placeholder-description">
        <div className="card__placeholder-title">
          <div className="placeholder" />
        </div>
        <div className="card__placeholder-line">
          <div className="placeholder" />
        </div>
        <div className="card__placeholder-button">
          <div className="placeholder" />
        </div>
      </div>
    </div>
  );
}

const Card: React.SFC<IEvent> = (props): JSX.Element => {
  const { photo, title, start_time, id} = props;
  let fullDate = new Date(start_time);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  return (
    <div className="card">
      <img className="card__image" src={photo} alt="Спектакль"/>
      <div className="card__description">
        <h2 className="card__title">{title}</h2>
        <span className="card__time">
          {`${fullDate.getDate()} ${months[fullDate.getMonth()]}, ${fullDate.getHours()}:${fullDate.getMinutes()}0`}
        </span>
        <Link className="card__button" to={`event/${id}`}>
          Забронировать
        </Link>
      </div>
    </div>
  );
};

export default Card;
