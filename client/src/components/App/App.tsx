import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../../pages/main';
import Reservation from '../../pages/reservation';
import Header from '../Header/Header';

function App() {
    return (      
        <BrowserRouter>
         <div>
           <Header />
             <Switch>
              <Route path="/" component={Main} exact/>
              <Route path="/reservation" component={Reservation}/>
            </Switch>
         </div> 
       </BrowserRouter>
    );
}

export default App;
