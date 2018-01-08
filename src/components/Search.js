import React, {Component} from 'react'
import { Route , Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import { default as Book } from './Book'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';

class Search extends Component{
    static propTypes = {
        shelfs: PropTypes.array.isRequired
    }
    state = {
        books: [],
        currentBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                // Get rid of all other properties except book id
                const booksId = books.map(book => ({ id: book.id,shelf: book.shelf }))
                this.setState({ currentBooks: booksId })
            })
    }

    onSearch = (event) => {
        console.log('onSearch')
        const value = event.target.value

        if(value) {
            BooksAPI.search(value).then(books => {
                if(!books || books.hasOwnProperty('error')) {
                    this.setState({ books: [] })
                } else {
                    this.setState({ books: books })
                }
            })
        } else {
            this.setState( { books: [] })
        }
    }

    onShelfChange = (book, shelf) => {
        console.log(shelf);
        const newBooks = [];
        BooksAPI.update(book, shelf)
            .then(books => {
                Object.keys(books)
                    .forEach(shelf => {
                        return books[shelf].map(id => ({ id: id, shelf: shelf}))
                            .forEach(book => {
                                newBooks.push(book)
                            })
                    })
                return newBooks
            })
            .then(newBooks => {
                this.setState({ currentBooks: newBooks })
            }).then(() => {
                const success = this.props.shelfs.filter( v => v.query === shelf);
                toast("Book "+ book.title +"  added to shelf "+ success[0].title, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: css({
                        background: "black"
                    })
                });
            }
        )
    }

    render() {
        const { books, currentBooks } = this.state;
        const shelfs = this.props.shelfs;
        let booksList

        if (books.length > 0) {
            booksList = books.map((book, index) => {
                currentBooks.forEach(cbook => {
                    if(cbook.id === book.id) {
                        book.shelf = cbook.shelf
                    }
                })

                return (
                    <li key={index}>
                        <Book
                            key={index}
                            onShelfChange={this.onShelfChange}
                            book={book}
                            shelfs={shelfs} />
                    </li>
                )
            })
        } else {
            booksList = null
        }

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            onChange={this.onSearch}
                            placeholder="Search by title or author!"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksList}
                    </ol>
                </div>
                <ToastContainer autoClose={8000} />

            </div>
        )
    }



}
export default Search