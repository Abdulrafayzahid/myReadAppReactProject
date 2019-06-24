import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksApi from './BookApi'
import BookShelf from "./BookShelf";


class BooksPage extends Component {
  state = {};
  componentWillUnmount() {
    BooksApi.getAll()
  }
  render() {
    console.log(this.props.read,this.props.currentlyReading, this.props.wantToRead);
    
    return (
<div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <BookShelf 
              book={this.props.currentlyReading}
              updateShelf={this.props.updateShelf}
              currentShelf="currentlyReading"
              />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf 
              book={this.props.wantToRead}
              updateShelf={this.props.updateShelf}
              currentShelf="wantToRead"
              />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <BookShelf 
              book={this.props.read}
              updateShelf={this.props.updateShelf}
              currentShelf="read"
              />
              </div>
            </div>
          </div>
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
