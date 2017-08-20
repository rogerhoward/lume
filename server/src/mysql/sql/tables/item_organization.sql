DROP TABLE IF EXISTS item_organization;

CREATE TABLE item_organization (
  itemId CHAR(36) NOT NULL,
  organizationId CHAR(36) NOT NULL,
  PRIMARY KEY (itemId, organizationId),
  CONSTRAINT constr_item_organization_fk FOREIGN KEY (itemId) REFERENCES item(id),
  CONSTRAINT constr_organization_item_fk FOREIGN KEY (organizationId) REFERENCES organization(id)
);
