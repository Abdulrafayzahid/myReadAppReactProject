import React from 'react';
import Book from './book';

const BookShelf = (props)=> { 
        return (  <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.currentShelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {props.book.map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        updateShelf={props.updateShelf}
                        currentShelf={props.currentShelf}
                      />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
       </div>
       </div> );
    }

 
export default BookShelf;
