import React from 'react';
import Book from './book';


const BookShelf = (props) => {
        return ( 
        <div className="bookshelf-books">
        <ol className="books-grid">
          {props.book
            .map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateShelf= {props.updateShelf}
                  currentShelf={props.currentShelf}
                />
              </li>
            ))}
        </ol>
        </div> );
}
 
export default BookShelf;
