CREATE TABLE EK_PRODUCT(
	PRODUCT_ID INT IDENTITY,
	NAME VARCHAR(500) NOT NULL,
	DESCRIPTION VARCHAR(1000) NOT NULL,
	CATEGORY VARCHAR(200) NOT NULL,
	BRAND VARCHAR(250) NOT NULL,
	PRICE BIGINT NOT NULL,
	QUANTITY INT NOT NULL
);

INSERT INTO EK_PRODUCT (PRODUCT_ID, NAME, DESCRIPTION, CATEGORY, BRAND, PRICE,  QUANTITY) VALUES (4000,'Mind Stone','Yellow Stone', 'Extra Terrestrial', 'Yellow', 20000, 150);
INSERT INTO EK_PRODUCT (PRODUCT_ID, NAME, DESCRIPTION, CATEGORY, BRAND, PRICE,  QUANTITY) VALUES (4001,'Reality Stone','Red Stone', 'Extra Terrestrial', 'Red', 17000, 150);
INSERT INTO EK_PRODUCT (PRODUCT_ID, NAME, DESCRIPTION, CATEGORY, BRAND, PRICE,  QUANTITY) VALUES (4002,'Power Stone','Purple Stone', 'Extra Terrestrial', 'Purple', 12000, 150);
INSERT INTO EK_PRODUCT (PRODUCT_ID, NAME, DESCRIPTION, CATEGORY, BRAND, PRICE,  QUANTITY) VALUES (4003,'Time Stone','Green Stone', 'Extra Terrestrial', 'Green', 10000, 250);
INSERT INTO EK_PRODUCT (PRODUCT_ID, NAME, DESCRIPTION, CATEGORY, BRAND, PRICE,  QUANTITY) VALUES (4004,'Soul Stone','Orange Stone', 'Extra Terrestrial', 'Orange', 16000,  100);
INSERT INTO EK_PRODUCT (PRODUCT_ID, NAME, DESCRIPTION, CATEGORY, BRAND, PRICE,  QUANTITY) VALUES (4005,'Space Stone','Blue Stone', 'Extra Terrestrial', 'Blue', 11000, 150);