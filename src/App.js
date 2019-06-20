import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as BookApi from "./BookApi";
import SearchPage from "./SearchPage";
import BooksPage from "./BooksPage";


// function App() {
//   console.log(BookApi.search('react'))
//   console.log(BookApi.getAll())

//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}

//     </div>
//   );
// }

//export default App;
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
  console.log(
   BookApi.getAll()
  );


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
