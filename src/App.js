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
    BookApi.getAll().then(book => book.map(books => {switch(books.shelf){
        case "read":
         return this.setState(prevState => ({
            read: [...prevState.read, books]
          }))
          
        case "currentlyReading":
            return this.setState(prevState => ({
            currentlyReading : [...prevState.currentlyReading , books]
          }))  
          
          case "wantToRead":
          return  this.setState(prevState => ({
              wantToRead:[...prevState.wantToRead, books]
            }))
      }
    })
    );
  }


  render() {

    const updateShelf = (books, shelf) => {
      BookApi.update(books, shelf)

      BookApi.getAll().then(book => {
        this.setState({
        books : book
        })
        this.state.books.filter (books => 
          
          {switch(books.shelf){
          case "read":
              return this.setState(prevState => ({
              read: [...prevState.read, books]
            }))
            
          case "currentlyReading":
              return this.setState(prevState => ({
              currentlyReading : [...prevState.currentlyReading , books]
            }))  
            
            case "wantToRead":
              return this.setState(prevState => ({
                wantToRead:[...prevState.wantToRead, books]
              }))
        }
      })
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
