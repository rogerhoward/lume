DROP TABLE IF EXISTS book_organization;

CREATE TABLE book_organization (
  bookId CHAR(36) NOT NULL,
  organizationId CHAR(36) NOT NULL,
  CONSTRAINT pk_book_organization PRIMARY KEY (bookId, organizationId),
  CONSTRAINT constr_book_organization_fk FOREIGN KEY (bookId) REFERENCES book(id),
  CONSTRAINT constr_organization_book_fk FOREIGN KEY (organizationId) REFERENCES organization(id)
);
