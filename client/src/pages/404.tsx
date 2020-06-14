import React, {useEffect} from 'react';
import Empty from '../components/Empty/Empty';
import init from '../store/event/event';
import { useDispatch } from 'react-redux';

const Custom404 = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init());
    }, [dispatch]);

    return (
       <div className="main">
           <Empty />
       </div>
    );
}
 
export default Custom404;