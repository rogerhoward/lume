DROP TABLE IF EXISTS page;

CREATE TABLE page (
  id CHAR(36) NOT NULL,
  `text` TEXT,
  `index` INT,
  bookId CHAR(36),
  imageId CHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (bookId) REFERENCES book(id),
  FOREIGN KEY (imageId) REFERENCES image(id)
);
