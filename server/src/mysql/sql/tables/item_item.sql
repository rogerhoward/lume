DROP TABLE IF EXISTS item_item;

CREATE TABLE item_item (
  itemId1 CHAR(36) NOT NULL,
  itemId2 CHAR(36) NOT NULL,
  PRIMARY KEY (itemId1, itemId2),
  CONSTRAINT constr_itemId1_fk FOREIGN KEY (itemId1) REFERENCES item(id),
  CONSTRAINT constr_itemId2_fk FOREIGN KEY (itemId2) REFERENCES item(id)
);
