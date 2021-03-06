import React from 'react';
import { connect } from 'react-redux';
import {bookAddedToCart, bookRemovedFromCart, positionRemovedFromCart} from '../../actions';


import './shopping-cart-table.css';

const ShoppingCartTable = ( {items, total, onIncrease, onDecrease, onDelete} ) => {
  
  const renderRow = (item, idx) => {

    const {id, title, count, total} = item;

    return(
      
      <tr key = {id} >
        <td>{idx + 1}#</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
        
          <button            
          className="btn btn-outline-danger btn-sm float-right"
          onClick = { () => onDelete(id) }>
          <i className="fa fa-trash-o" />
          </button>
          
          <button              
          className="btn btn-outline-success btn-sm float-right"
          onClick = { () => onIncrease(id) }>
          <i className="fa fa-plus-circle" />
          </button>

          <button            
          className="btn btn-outline-warning btn-sm float-right"
          onClick = { () => onDecrease(id) }>
          <i className="fa fa-minus-circle" />
          </button>

        </td>
    </tr>

    )
  }


  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>          
            <tr>
                <th>#</th>
                <th>Item</th>
                <th>Count</th>
                <th>Price</th>
                <th>Action</th>      
            </tr>    
        </thead>

        <tbody>
          {
            items.map( renderRow )
          }
            {/* <tr>
                <td>1#</td>
                <td>You an me forever</td>
                <td>2</td>
                <td>20</td>
                <td>
                
                  <button            
                  className="btn btn-outline-danger btn-sm float-right">
                  <i className="fa fa-trash-o" />
                  </button>
                  
                  <button              
                  className="btn btn-outline-success btn-sm float-right">
                  <i className="fa fa-plus-circle" />
                  </button>

                  <button            
                  className="btn btn-outline-warning btn-sm float-right">
                  <i className="fa fa-minus-circle" />
                  </button>

                </td>
            </tr> */}
        </tbody>
      </table>

      <div className="total">
        Total: ${total}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.shoppingCart.cartItems,
    total: state.shoppingCart.orderTotal
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onDecrease: (id) => {
//       dispatch(bookRemovedFromCart(id));
//     },
//     onIncrease: (id) => {      
//       dispatch(bookAddedToCart(id));
//     },
//     onDelete: (id) => {
//       dispatch(positionRemovedFromCart(id));
//     }
//   }
// };

//более компактный вариант - передаем объект в connect, который сам обернет все в dispatch
const mapDispatchToProps = {
  onDecrease: bookRemovedFromCart,
  onIncrease: bookAddedToCart,
  onDelete: positionRemovedFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);