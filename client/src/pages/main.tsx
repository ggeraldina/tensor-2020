import React, {useEffect} from 'react';
import { fetchCardList } from '../api/cardList';
import { useSelector } from '../helpers/useTypedSelector';
import { useDispatch } from 'react-redux';
import CardList from '../components/CardList/CardList';
import Footer from '../components/Footer/Footer';
 
const Main = () => {
    const cardList = useSelector(state => state.cardList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardList());
    }, []);

    return (
       <div className="main">
          <CardList items={cardList.items} hasMore={cardList.hasMore}/>
          <Footer />
       </div>
    );
}
 
export default Main;