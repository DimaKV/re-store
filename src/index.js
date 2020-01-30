import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'; 

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import {BookstoreService} from './services';
import {BookstoreServiceProvider} from './components/bookstore-service-context'; 

import store from './store';

const bookstoreService = new BookstoreService();


ReactDOM.render(
    // доступ к redux store
    <Provider store = {store}> 
        {/* обработка ошибок в компоненте */}
        <ErrorBoundary>
            {/* передаем сервис через CONTEXT API */}
            <BookstoreServiceProvider value={bookstoreService}>
                {/* из пакета reacr-route */}
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </BookstoreServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.querySelector('#root')
);