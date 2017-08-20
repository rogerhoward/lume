DROP TABLE IF EXISTS `group`;

CREATE TABLE `group` (
  id CHAR(36) NOT NULL,
  title VARCHAR(100),
  `text` TEXT,
  imageId CHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (imageId) REFERENCES image(id)
);
