import React, {Component} from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { default as Book } from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }
    state = {
        books: []
    }
    componentDidMount() {


        //this.props.books = books;
    }
    render() {
        const books = this.state.books
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books
                                .filter(livros => livros.shelf == this.props.query)
                                .map((livro, index) => (
                                <li  key={index} >
                                    <Book id='1' key={index}
                                          authors={livro.authors}
                                          cover={livro.imageLinks.thumbnail}
                                          title={livro.title}
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