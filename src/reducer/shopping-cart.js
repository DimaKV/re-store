const updateShoppingCart = (state, action) => {
    switch(action.type){


        case 'BOOK_ADDED_TO_CART': {

            const id = action.payload;
            //ищим книгу в state по переданному id 
            const book = state.bookList.books.find( (book) => id === book.id );
            //ищем индекс книги в корзине, если таковой существует
            const cartItemIndx = state.shoppingCart.cartItems.findIndex( cartItem => cartItem.id === book.id );

            //если книги в корзине нет, то добавляем эту книгу в корзину
            // а если есть, то обновляем ее кол-во и цену
            if(cartItemIndx === -1) {
                const newItem = {
                    id: book.id,
                    title: book.title,
                    count: 1,
                    total: book.price
                }
                //перезаписываем state, добавляя новую книгу
                return{                   
                    cartItems : [
                        ...state.shoppingCart.cartItems,
                        newItem
                    ],
                    orderTotal: state.shoppingCart.orderTotal + book.price,
                    itemsTotal: state.shoppingCart.itemsTotal + 1
                };
            } else {
                // обновляемая книга в корзине
                const item = state.shoppingCart.cartItems[cartItemIndx]; 
                
                //получаем обновленный элемент существующей книги в корзине
                const updateItem = {
                    id: item.id,
                    title: item.title,
                    count: item.count + 1,
                    total: book.price + item.total
                };
                //возвращаем обновленную корзину с учетом обновленной книги
                return{                    
                    cartItems: [
                        ...state.shoppingCart.cartItems.slice(0, cartItemIndx), 
                        updateItem,
                        ...state.shoppingCart.cartItems.slice(cartItemIndx+1) 
                    ],
                    orderTotal: state.shoppingCart.orderTotal + book.price,
                    itemsTotal: state.shoppingCart.itemsTotal + 1
                }
            };

        }
            

        case 'BOOK_REMOVED_FROM_CART': {

            const idx = action.payload;
            const book = state.bookList.books.find( (item) => idx === item.id );
            const updateItem = state.shoppingCart.cartItems.find( (item) => idx === item.id );
            const updateItemIdx =  state.shoppingCart.cartItems.findIndex( (item) => idx === item.id);
            // console.log(idx, state.cartItems, delItemIdx);            
            
            //если кол-во книг по этой позиции больше одной
            if (updateItem.count > 1) {
                const newItem = {
                    ...updateItem,
                    count: updateItem.count - 1,
                    total: updateItem.total - book.price
                };

                return {                    
                    cartItems: [
                        ...state.shoppingCart.cartItems.slice(0, updateItemIdx),
                        newItem,
                        ...state.shoppingCart.cartItems.slice(updateItemIdx + 1)
                    ],
                    orderTotal: state.shoppingCart.orderTotal - book.price,
                    itemsTotal: state.shoppingCart.itemsTotal - 1
                };
            }
            
            // если удаляем последнюю книгу по этой позиции, то удаляем всю позицию книг
            return {                
                cartItems: [
                    ...state.shoppingCart.cartItems.slice(0, updateItemIdx),
                    ...state.shoppingCart.cartItems.slice(updateItemIdx+1)
                ],
                orderTotal: state.shoppingCart.orderTotal - book.price,
                itemsTotal: state.shoppingCart.itemsTotal - 1
            };


        };
            

        case 'POSITION_REMOVED_FROM_CART': {
            const idx = action.payload;     
            
            const delItemIdx =  state.shoppingCart.cartItems.findIndex( (item) => idx === item.id);
               
            return {                
                cartItems: [
                    ...state.shoppingCart.cartItems.slice(0, delItemIdx),
                    ...state.shoppingCart.cartItems.slice(delItemIdx+1)
                ],
                orderTotal: state.shoppingCart.orderTotal - state.shoppingCart.cartItems[delItemIdx].total,
                itemsTotal: state.shoppingCart.itemsTotal - state.shoppingCart.cartItems[delItemIdx].count
            };
        }

        default :
        return state.shoppingCart;

        
    }
};

export default updateShoppingCart;