import React, {Component} from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { default as Shelf }from './Shelf'
import './App.css'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func
    }
    componentDidMount() {
       /* BooksAPI.get(this.props.id).then((book) => {

        })*/
        /*ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })*/
    }
    render() {
        const {  book, onShelfChange } = this.props ;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select  onChange={e => onShelfChange(book, e.target.value)}
                                 value={book.shelf ? book.shelf : ''}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(',') : null}</div>
            </div>
        )
    }
}
export default Book