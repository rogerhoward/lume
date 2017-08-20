DROP TABLE IF EXISTS image;

CREATE TABLE image (
  id CHAR(36) NOT NULL,
  name VARCHAR(36),
  organizationId CHAR(36),
  PRIMARY KEY (id),
  FOREIGN KEY (organizationId) REFERENCES organization(id)
);
