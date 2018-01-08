import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { default as Book } from './components/Book'
import { default as Shelf} from './components/Shelf'
import { default as Search} from './components/Search'
import './App.css'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
      shelfs : [

          {
              query: 'currentlyReading',
              title: 'Currently Reading'
          },{
              query: 'wantToRead',
              title: 'Want to Read'
          },{
              query: 'read',
              title: 'Read'
          }

      ]
  }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
          this.setState({books : books})
        })
    }

    onShelfChange = (book, shelf) => {
        console.log('app.onShelfChange', shelf);
        const id = book.id
        const currentBooks = [...this.state.books]
        const indexToUpdate = currentBooks.findIndex(book => book.id === id)
        const newBookToUpdate = Object.assign({}, currentBooks[indexToUpdate], {
            shelf: shelf
        });

        this.setState({
            books: [...currentBooks.slice(0, indexToUpdate), newBookToUpdate,
                ...currentBooks.slice(indexToUpdate + 1)]
        })

        BooksAPI.update(book, shelf)
    }

  render() {
    const books = this.state.books;
    const shelfs = this.state.shelfs;
    return (
      <div className="app">
        <Route exact path='/book' render={() =>
            <Book id='1' authors='a' cover='http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api' title='c'
            />
        } />
        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                    {this.state.shelfs.map((shelf, index) => (
                        <Shelf key={index}
                               books={books.filter(livros => (livros.shelf === shelf.query))}
                               onShelfChange={this.onShelfChange}
                               title={shelf.title}
                               shelfs={shelfs}
                        />
                    ))}
                </div>
              </div>
                <div className="open-search">
                    <Link to="/search">Add  a book</Link>
                </div>

            </div>
        )} />
          <Route path='/search' render={() =>
            <Search shelfs={shelfs} />
          }/>
      </div>
    )
  }
}

export default BooksApp
