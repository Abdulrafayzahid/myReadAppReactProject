import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as BookApi from "./BookApi";
import SearchPage from "./SearchPage";
import BooksPage from "./BooksPage";

class App extends Component {
  state = {
    books : [],
    currentlyReading : [],
    wantToRead : [],
    read : []
  };
  componentDidMount() { 
    BookApi.getAll()
      .then((books) => {
        let wantToRead = [],
          read = [],
          currentlyReading = []

        books.map((book) => {
          const { shelf } = book
          switch (shelf) {
            case 'currentlyReading':
              currentlyReading.push(book)
              return null
            case 'wantToRead':
              wantToRead.push(book)
              return null
            case 'read':
              read.push(book)
              return null
            default:
              return null
          }
        })

        this.setState({
          currentlyReading,
          wantToRead,
          read,
        })
      })
      .catch((err) => {
        console.log("Error fetching data", err)
      })
  }
  


  render() {

    const updateShelf = (books, shelf) => {
      BookApi.update(books, shelf)
      BookApi.getAll()
      .then((books) => {
        let wantToRead = [],
          read = [],
          currentlyReading = []

        books.map((book) => {
          const { shelf } = book
          switch (shelf) {
            case 'currentlyReading':
              currentlyReading.push(book)
              return null
            case 'wantToRead':
              wantToRead.push(book)
              return null
            case 'read':
              read.push(book)
              return null
            default:
              return null
          }
        })
        
        this.setState({
          currentlyReading,
          wantToRead,
          read
        })
      })
      .catch((err) => {
        console.log("Error fetching data", err)
      })
    }
    
   
    return (
      <div className="app">
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => (
              <BooksPage
                updateShelf={updateShelf}
                wantToRead={this.state.wantToRead}
                currentlyReading={this.state.currentlyReading}
                read={this.state.read}
              />
            )}
          />

          <Route
          path='/search'
          render={ () => (
            <SearchPage
          books={this.state.books}
          updateShelf={updateShelf}
          />
        )} 
      />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
