import React from 'react';
import { IDetailedEvent } from '../../types';
import { Heading, Paragraph } from 'evergreen-ui';

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

  const addZero = (num: number): string => {
    const str = num.toString();
    return str.length === 1 ? '0' + str : str;
  }
    
  const dateStart = new Date(start_time);
  const dateEnd = new Date(end_time);
  
  const day = dateStart.toLocaleString("ru", dayOptions);
  const time = `${addZero(dateStart.getHours())}.${addZero(dateStart.getMinutes())} - ${addZero(dateEnd.getHours())}.${addZero(dateEnd.getMinutes())}`;

  return (
      <div className="detailed-event">
        <div className="detailed-event__preview">
          <img
            className="detailed-event__photo"
            src={photo}
            alt='Изображение'
          />
          <div className="detailed-event__short-description">
            <Heading size={900} marginTop="default">{title}</Heading>
            <Heading size={700} marginTop="default">{start_time && end_time && day}</Heading>
            <Heading size={700} marginTop="default">{start_time && end_time && time}</Heading>
            <Heading size={500} marginTop="default">{director && 'Режисер: '}{director}</Heading>
          </div>
        </div>
        <div className="detailed-event__description">
          <Paragraph marginTop="default">
            {description}
          </Paragraph>
          <Paragraph marginTop="default">
            {actors && 'Актерский состав: '}{actors}
          </Paragraph>
        </div>
      </div>
  );
};

export default DetailedEvent;
