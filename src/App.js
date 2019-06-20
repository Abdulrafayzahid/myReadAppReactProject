import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as BookApi from "./BookApi";
import SearchPage from "./SearchPage";
import BooksPage from "./BooksPage";

class App extends Component {
  state = {
    books : []
  };
  componentDidMount() {
    BookApi.getAll().then(book => {
      this.setState({
        books: book
      });
    });
  }
  componentWillUnmount() {
  BookApi.getAll()
  }
  render() {
//   console.log(
//    BookApi.getAll()
//   );


    const updateShelf = (books, shelf) => {
      BookApi.update(books, shelf)

      BookApi.getAll().then(books => {
        this.setState({books : books})
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
                books={this.state.books}
                updateShelf={updateShelf}
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
