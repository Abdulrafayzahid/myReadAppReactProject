import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "./BookApi";
import BookShelf from "./BookShelf";

class BooksPage extends Component {
  state = {};
  componentWillUnmount() {
    BooksApi.getAll();
  }
  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <BookShelf
            book={this.props.currentlyReading}
            updateShelf={this.props.updateShelf}
            currentShelf="Currently Reading"
          />
          <BookShelf
            book={this.props.read}
            updateShelf={this.props.updateShelf}
            currentShelf="Read"
          />
          <BookShelf
            book={this.props.wantToRead}
            updateShelf={this.props.updateShelf}
            currentShelf="Want To Read"
          />
          <div className="open-search">
            <Link to="/search">
              <button />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksPage;
