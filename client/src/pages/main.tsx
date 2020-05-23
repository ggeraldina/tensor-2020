import React, {useEffect} from 'react';
import { fetchExample } from '../api/example';
import { useSelector } from '../helpers/useTypedSelector';
import { useDispatch } from 'react-redux';
 
const Main = () => {
    const example = useSelector(state => state.example);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExample());
    }, []);

    return (
       <div>
          <h1>Home</h1>
           {example.message}
       </div>
    );
}
 
export default Main;