DROP TABLE IF EXISTS item_detail;

CREATE TABLE item_detail (
  itemId CHAR(36) NOT NULL,
  detailId CHAR(36) NOT NULL,
  PRIMARY KEY (itemId, detailId),
  CONSTRAINT constr_item_detail_fk FOREIGN KEY (itemId) REFERENCES item(id),
  CONSTRAINT constr_detail_item_fk FOREIGN KEY (detailId) REFERENCES detail(id)
);
