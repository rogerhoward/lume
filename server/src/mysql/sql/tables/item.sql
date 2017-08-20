DROP TABLE IF EXISTS item;

CREATE TABLE item (
  id CHAR(36) NOT NULL,
  localId VARCHAR(36),
  title VARCHAR(100),
  medium VARCHAR(80),
  artist VARCHAR(100),
  dated VARCHAR(24),
  accessionNumber VARCHAR(30),
  creditLine VARCHAR(100),
  `text` TEXT,
  mainImageId CHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (mainImageId) REFERENCES image(id)
);
