import React, {Component} from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { default as Book } from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onShelfChange: PropTypes.func
    }
    state = {
        books: []
    }
    componentDidMount() {


        //this.props.books = books;
    }

    render() {
        const books = this.state.books
        const onShelfChange = this.props.onShelfChange
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books
                                .map((livro, index) => (
                                <li  key={index} >
                                    <Book key={index}
                                          book={livro}
                                          onShelfChange={onShelfChange}
                                    />
                                </li>
                            ))

                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default Shelf