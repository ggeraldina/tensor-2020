import React, {useEffect} from 'react';
import { fetchCardList } from '../api/cardList';
import { useSelector } from '../helpers/useTypedSelector';
import { useDispatch } from 'react-redux';
import CardList from '../components/CardList/CardList';
 
const Main = () => {
    const cardList = useSelector(state => state.cardList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardList({limit: 6, offset: 0}));
    }, [dispatch]);

    return (
       <div className="main">
          <CardList events_list={cardList.events_list} hasmore={cardList.hasmore} />
       </div>
    );
}
 
export default Main;