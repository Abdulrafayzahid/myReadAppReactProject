import React, { Component } from "react";
import Book from "./book";
import * as BookApi from './BookApi';
import {Link} from 'react-router-dom';
class SearchPage extends Component {
  state = {
    query: "",
    searchResult: []
  };

  handleSearch = qry => {
    this.setState({ query: qry });
    this.updateSearch(qry);
  };

  updateSearch = qry => {
    if (qry) {
        BookApi.search(qry).then(result => {
        if (result.error === "empty query") {
          console.log("There is an error while fetching the data");
          this.setState({ searchResult: [] });
        } else {
          this.setState({ searchResult: result });
        }
      });
    } else {
      this.setState({ searchResult: [] });
    }
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" />
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.map(searchBook => {
              let shelf = "none";

              this.props.books.map(book => {
                return book.id == searchBook.id ? (shelf = book.shelf) : "none";
              });
              return (
                <li key={searchBook.id}>
                  <Book
                    book={searchBook}
                    updateShelf={this.props.updateShelf}
                    currentShelf={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
