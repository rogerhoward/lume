DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
  id CHAR(36) NOT NULL,
  name VARCHAR(100),
  subdomain VARCHAR(20) NOT NULL,
  email VARCHAR(20),
  imageId CHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (imageId) REFERENCES image(id)
);
