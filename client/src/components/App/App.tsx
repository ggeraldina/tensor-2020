import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../../pages/main';
import Reservation from '../../pages/reservation';
import Custom404 from '../../pages/404';
import Header from '../Header/Header';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Footer from '../Footer/Footer';
import EventPage from '../../pages/event';

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
