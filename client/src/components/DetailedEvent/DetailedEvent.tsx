import React, { useState } from 'react';
import { IDetailedEvent } from '../../types';
import { fetchEvent } from '../../api/event';
import { useDispatch } from 'react-redux';

/**
 * Подробное описание мероприятия.
 * @param {IDetailedEvent} props - опции компонента.
 */

const DetailedEvent: React.FC<IDetailedEvent> = (props): JSX.Element => {
  const { title, photo, start_time, end_time, description, director, actors} = props;
  const dayOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  
  const day = new Date(start_time).toLocaleString("ru", dayOptions);

  return (
      <div className="detailed-event">
        <div className="detailed-event__preview">
          <img
            className="detailed-event__photo"
            src={photo}
          />
          <div className="detailed-event__short-description">
            <h1>{ title }</h1>
            <div>{day}</div>
            <div>Режисер: {director}</div>
          </div>
        </div>
        <div className="detailed-event__description">
          <div className="detailed-event__about">{description}</div>
          <div className="detailed-event__actors">Актерский состав: {actors}</div>
        </div>
      </div>
  );
};

export default DetailedEvent;
