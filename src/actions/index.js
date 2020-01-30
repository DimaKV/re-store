const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
};

const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
};

const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
};

const bookRemovedFromCart = (bookId) => {
    return {
        type: 'BOOK_REMOVED_FROM_CART',
        payload: bookId
    }
}

const positionRemovedFromCart = (bookId) => {
    return {
        type: 'POSITION_REMOVED_FROM_CART',
        payload: bookId
    }
}


const fetchBooks = (dispatch, bookstoreService) => () => {
    dispatch(booksRequested());
    const data = bookstoreService.getBooks();      
     
    data
    .then( (data) => { dispatch(booksLoaded(data)); })
    .catch( (err) => dispatch(booksError(err)) );   
}

export {
    fetchBooks,
    bookAddedToCart,
    bookRemovedFromCart,
    positionRemovedFromCart
};