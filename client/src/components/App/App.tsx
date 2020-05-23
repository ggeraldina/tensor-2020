import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../../pages/main';
import Reservation from '../../pages/reservation';
import Header from '../Header/Header';
import { Provider } from 'react-redux';
import store from '../../store/store';

function App() {
    return (    
        <Provider store={store}>  
        <BrowserRouter>
         <div>
           <Header />
             <Switch>
              <Route path="/" component={Main} exact/>
              <Route path="/reservation" component={Reservation}/>
            </Switch>
         </div> 
       </BrowserRouter>
       </ Provider>
    );
}

export default App;
