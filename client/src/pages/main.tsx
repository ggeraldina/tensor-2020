import React, {useEffect} from 'react';
import { fetchInitialCardList } from '../api/initialCardList';
import { useSelector } from '../helpers/useTypedSelector';
import { useDispatch } from 'react-redux';
import CardList from '../components/CardList/CardList';
import Footer from '../components/Footer/Footer';
 
const Main = () => {
    const cardList = useSelector(state => state.cardList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInitialCardList());
    }, [dispatch]);

    return (
       <div className="main">
          <CardList events_list={cardList.events_list} hasmore={cardList.hasmore} />
          <Footer />
       </div>
    );
}
 
export default Main;