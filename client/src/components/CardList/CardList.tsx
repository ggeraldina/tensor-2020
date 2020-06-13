import React, {useState} from 'react';
import { IEventList } from '../../types';
import Card, { CardPlaceholder } from '../Card/Card';
import { fetchCardList } from '../../api/cardList';
import { useDispatch } from 'react-redux';
import Fade from '../../helpers/Fade';

const CardList: React.SFC<IEventList> = (props): JSX.Element => {
  const { events_list, hasmore, placeholders, isLoading } = props;
  const [params, setParams] = useState({
    limit: 6,
    offset: 6,
  });

  const dispatch = useDispatch();

  const getMoreCards = (): void => {
      setParams({ limit: params.limit, offset: params.limit + params.offset });
      dispatch(fetchCardList({limit: params.limit, offset: params.offset}));
  };

  const Placeholders = (): JSX.Element => {
    const placeholderItems = Array.from(Array(placeholders).keys());
    return (
      <>
        <div className="card-list__list">
          {placeholderItems.map(item => (
            <div className="card-list__item" key={item}>
              <CardPlaceholder />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
      <div className="card-list container">
        <div>
            <Fade stateIn={!isLoading} duration={250} timeout={{ exit: 500 }}>
                <div className="card-list__list">
                    {events_list.map(card => (
                        <div className="card-list__item" key={card.id}>
                        <Card id={card.id} title={card.title}
                              photo={card.photo} start_time={card.start_time}/>
                        </div>
                    ))}
                </div>
            </Fade>
            <Fade
                stateIn={isLoading}
                duration={250}
                timeout={{ enter: 500 }}
                hideOnExit
            >
                <Placeholders />
            </Fade>
            
            {/* {events_list.map(card => (
                <li className="card-list__item" key={card.id}>
                    <Card id={card.id} title={card.title}
                          photo={card.photo} start_time={card.start_time}/>
                </li>
            ))} */}
        </div>
        {hasmore && (
            <button className="card-list__more" type="button" onClick={getMoreCards}>
                Больше спектаклей
            </button>
        )}
      </div>
  );
};

export default CardList;
