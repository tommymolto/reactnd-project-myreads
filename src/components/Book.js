import React, {Component} from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import { default as Shelf }from './Shelf'
import '../App.css'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelfs: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func
    }
    componentDidMount() {}
    render() {
        const {  book, onShelfChange, shelfs } = this.props ;
        const noThumbLink = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : noThumbLink}` }}></div>
                    <div className="book-shelf-changer">
                        <select  onChange={e => onShelfChange(book, e.target.value)}
                                 value={book.shelf ? book.shelf : ''}>
                            <option value="none" disabled>Move to...</option>
                            { shelfs.map((shelf, index)=> (
                                <option value={shelf.query} key={index}>{shelf.title}</option>
                            )
                            )}
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