import React from 'react';
import Footer from '../components/Footer/Footer';
import Error from '../components/Error/Error';
 
const Custom500 = () => {
    return (
       <div className="main">
            <Error />
            <Footer />
       </div>
    );
}
 
export default Custom500;