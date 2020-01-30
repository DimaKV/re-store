
const updateBookList = (state, action) => {

    switch(action.type){
        case 'FETCH_BOOKS_SUCCESS':
            //этот объект возвращается в state. так?
            return {               
                books: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_BOOKS_REQUEST':
            return {                
                loading:true,
                books: [],
                error: null
            };
        case 'FETCH_BOOKS_FAILURE':
            return {                
                loading: false,
                books: [],
                error: action.payload
            };
        
        default :
        return state.bookList;
    }

};

export default updateBookList;