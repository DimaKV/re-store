import updateBookList from './book-list';
import updateShoppingCart from './shopping-cart';


const init = {
    bookList: {
        books: [
            {title: 'Test title', author: 'TEST', id: 1}
        ],
        loading: true,
        error: null
    },

    shoppingCart: {
        cartItems: [
       
        ], 
        orderTotal: 0,
        itemsTotal: 0
    }    
    
}



const reducer = (state = init, action) => {

    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    };    
};

export default reducer;