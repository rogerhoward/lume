DROP TABLE IF EXISTS detail;

CREATE TABLE detail (
  id CHAR(36) NOT NULL,
  localId VARCHAR(36),
  title VARCHAR(100),
  `text` TEXT,
  imageId CHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (imageId) REFERENCES image(id)
);
