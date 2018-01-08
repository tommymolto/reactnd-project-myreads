import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { default as Book } from './Book'
import { default as Shelf} from './Shelf'
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
        /*ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })*/
    }
    alterShelf = (book) => {
      this.setState( (book) => ({

          })
      )
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
    return (
      <div className="app">
        <Route exact path='/book' render={() =>
            <Book id='1' authors='a' cover='http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api' title='c'
            />
        } />
        <Route path='/' render={() => (
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
                               title={shelf.title}/>
                    ))}
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
        )} />
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (<div />) }
      </div>
    )
  }
}

export default BooksApp
