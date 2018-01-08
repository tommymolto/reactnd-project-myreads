import React, {Component} from 'react'
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }
    componentDidMount() {
       /* BooksAPI.get(this.props.id).then((book) => {

        })*/
        /*ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })*/
    }
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${this.props.cover})` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }
}
export default Book