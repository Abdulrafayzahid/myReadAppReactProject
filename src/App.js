import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as BookApi from "./BookApi";
import SearchPage from "./SearchPage";
import BooksPage from "./BooksPage";

class App extends Component {
  state = {
    books : [] ,
    read : [] ,
    wantToRead : [],
    currentlyReading : []
  };
  componentDidMount() {
    BookApi.getAll().then(books => {
      this.setState({books : books})
      this.setState({read : books.filter(read => read.shelf === "read")})
      this.setState({wantToRead : books.filter(read => read.shelf === "wantToRead")})
      this.setState({currentlyReading : books.filter(read => read.shelf === "currentlyReading")})
    }
    )
  }
  render() {

    console.log(BookApi.getAll());
    
    const updateShelf = (books, shelf) => {
      BookApi.update(books, shelf)
      BookApi.getAll().then(books => {
        this.setState({read : books.filter(read => read.shelf === "read")})
        this.setState({wantToRead : books.filter(read => read.shelf === "wantToRead")})
        this.setState({currentlyReading : books.filter(read => read.shelf === "currentlyReading")})        
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
              read={this.state.read}
                wantToRead={this.state.wantToRead}
                currentlyReading={this.state.currentlyReading}
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
