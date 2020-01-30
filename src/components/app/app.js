import React from 'react';
import Header from '../header';
import {CartPage, HomePage} from '../pages';

import {Route, Switch} from 'react-router-dom';

const App = () => { 
  
    return (
        
        <React.Fragment>
            <Header/>
            <div className='jumbotron'>
                <Switch>

                    <Route path='/' component = {HomePage}  exact />
                    <Route path='/cart' component = {CartPage} />
                    <Route render = { () => <h2>Page not found</h2> } />

                </Switch>
            </div>     
        </React.Fragment>   
    )
   
}

export default App;