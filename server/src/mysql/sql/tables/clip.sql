DROP TABLE IF EXISTS clip;

CREATE TABLE clip (
  id CHAR(36) NOT NULL,
  title VARCHAR(80),
  description TEXT,
  detailId CHAR(36),
  `index` INT,
  PRIMARY KEY (id),
  FOREIGN KEY (detailId) REFERENCES detail(id)
);
