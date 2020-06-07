import React, {useState} from 'react';
import { IEventList } from '../../types';
import Card from '../Card/Card';
import { fetchCardList } from '../../api/cardList';
import { useDispatch } from 'react-redux';

const CardList: React.SFC<IEventList> = (props): JSX.Element => {
  const { events_list, hasmore } = props;
  const [params, setParams] = useState({
    limit: 6,
    offset: 6,
  });

  const dispatch = useDispatch();

  const getMoreCards = (): void => {
      setParams({ limit: params.limit, offset: params.limit + params.offset });
      dispatch(fetchCardList({limit: params.limit, offset: params.offset}));
  };

  return (
      <div className="card-list container">
        <ul className="card-list__list">
            {events_list.map(card => (
                <li className="card-list__item" key={card.id}>
                    <Card id={card.id} title={card.title}
                          photo={card.photo} start_time={card.start_time}/>
                </li>
            ))}
        </ul>
        {hasmore && (
            <button className="card-list__more" type="button" onClick={getMoreCards}>
                Больше спектаклей
            </button>
        )}
      </div>
  );
};

export default CardList;
