import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded } from "../../actions";
import { compose } from '../../utils';

import './book-list.css';

class BookList extends Component {

    componentDidMount() {
        //1. Получить данные (recieve data)
        const { bookstoreService } = this.props;
        const data = bookstoreService.getBooks();
        //2. Передать действия в store (dispatch action to store)
        this.props.booksLoaded(data);
    }


    render() {
        const { books } = this.props;
        return (
            <ul className="book-list">
                {
                    books.map((book) => { 
                        return (
                            <li key={book.id}><BookListItem book={book} /></li>    
                        )
                    })
                }
            </ul>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
};

const mapDispatchToProps = {
    booksLoaded
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);