import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Header = ( {items, totalPrice} ) => {
    return(
        <header className="shop-header">
            <Link to="/">
                <div className="logo text-dark">ReStore</div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart" />
                    {items} items (${totalPrice})
                </div>
            </Link>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.shoppingCart.itemsTotal,
        totalPrice: state.shoppingCart.orderTotal
    }
}

export default connect(mapStateToProps)(Header);
