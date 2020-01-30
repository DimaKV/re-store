import React, {Component} from 'react';
import BookListItem from '../book-list-item';
import './book-list.css';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import {connect} from 'react-redux';

//импорт action creator
import {fetchBooks, bookAddedToCart} from '../../actions';

import {withBookstoreService} from '../hoc';
// import { bindActionCreators } from 'redux';


// компонент делим на две части: 
//BookList отвечает за отрисовку данных
// BookListContainer отвечает за получение данных, обработку ошибок, вывод лоадера 

const BookList = ( {books, onAddedToCart} ) => {

    const booksList = books.map( (book) => {
        return(
            <li key = {book.id}>
                <BookListItem book = {book} 
                onAddedToCart = {() => onAddedToCart(book.id)}/>
            </li>
        )
    } );

    return (
        <React.Fragment>
            {/* <h4>{this.props.status}</h4> */}
            <ul className="book-list">
                {booksList}
            </ul>
        </React.Fragment>
        
    )

}



class BookListContainer extends Component{
    
    

    // componentDidMount(){
    //     const {bookstoreService} = this.props;
    //     //эти данные получаем из this.props благодаря mapDispatchToProps
    //     const {booksRequested, booksLoaded, booksError } = this.props;

    //     booksRequested();
    //     const data = bookstoreService.getBooks();      
        
    //     data
    //     .then( (data) => {booksLoaded(data);})
    //     .catch( (err) => booksError(err) );             
       
    // }

    componentDidMount() {
        this.props.fetchBooks();
    }

    render(){
        //books получаем из mapStateToProps, т.е. из redux или те, что поумалчанию 
        const {books, loading, error, onAddedToCart} = this.props;       
        // console.log(this.props.books)

        
        
        if(loading) return <Spinner/>;
        if(error) return <ErrorIndicator/>;


        return <BookList books = {books} onAddedToCart = {onAddedToCart} />
    }
}

//функция определяет какие свойства получит компонент из Redux store
const mapStateToProps = ( state ) => {
    return {
        books : state.bookList.books,
        loading: state.bookList.loading,
        error: state.bookList.error
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    const {bookstoreService} = ownProps;

    return {
        fetchBooks: fetchBooks(dispatch, bookstoreService),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}

// //передаем action; сейчас mapDispatchToProps - объект
// const mapDispatchToProps = {
//     //просто передаем объект/ action creator
//     //используем паттерн, при котором redux все сделает сам -  обернет в bindActionCreators,
//     // передаст в dispatch и т.д.
//     booksLoaded,
//     booksRequested,
//     booksError
// }
    
// const mapDispatchToProps = (dispatch) => {
    //использзуем bindActionCreators
    // return bindActionCreators({booksLoaded}, dispatch);
    
    //используем action creator
    // return {
    //     booksLoaded: (newBooks) => {
    //         dispatch(booksLoaded(newBooks));
    //     }

    //передаем просто action
        // booksLoaded: (newBooks) => {           
        //     dispatch({
        //         type: 'BOOKS_LOADED',
        //         payload: newBooks
        //     })
        // }
    // }
// }

export default withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
);