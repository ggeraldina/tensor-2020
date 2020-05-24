import React from 'react';
import { TCardList } from '../../types';
import Card from '../Card/Card';

const CardList: React.SFC<TCardList> = (props): JSX.Element => {
  const { items, hasMore } = props;
  return (
      <div className="card-list container">
        <ul className="card-list__list">
            {items.map(card => (
                <li className="card-list__item" key={card.id}>
                    <Card id={card.id} title={card.title}
                          photo={card.photo} start_time={card.start_time}/>
                </li>
            ))}
        </ul>
        {hasMore && (
            <button className="card-list__more" type="button">
                Больше спектаклей
            </button>
        )}
      </div>
  );
};

export default CardList;
