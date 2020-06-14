import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Main from '../../pages/main';
import Reservation from '../../pages/reservation';
import Custom404 from '../../pages/404';
import Header from '../Header/Header';
import { Provider, ReactReduxContext } from 'react-redux';
import store from '../../store/store';
import Footer from '../Footer/Footer';
import EventPage from '../../pages/event';
import init from '../../store/event/event';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../helpers/useTypedSelector';
// @ts-ignore
import Route from 'react-router-hooks/lib';

function App() {
    return (    
        <Provider store={store}> 
        <BrowserRouter>
         <div>
            <Header />
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/event/:id" component={EventPage} />
              <Route path="/reservation" component={Reservation}/>
              <Route component={Custom404}/>
            </Switch>
            <Footer />
         </div> 
       </BrowserRouter>
       </ Provider>
    );
}

export default App;
