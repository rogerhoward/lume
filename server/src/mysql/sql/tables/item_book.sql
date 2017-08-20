DROP TABLE IF EXISTS item_book;

CREATE TABLE item_book (
  itemId CHAR(36) NOT NULL,
  bookId CHAR(36) NOT NULL,
  PRIMARY KEY (itemId, bookId),
  CONSTRAINT constr_item_book_fk FOREIGN KEY (itemId) REFERENCES item(id),
  CONSTRAINT constr_book_item_fk FOREIGN KEY (bookId) REFERENCES book(id)
);
