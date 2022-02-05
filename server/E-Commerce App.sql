CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "first_name" varchar(24),
  "last_name" varchar(24),
  "email" varchar(36),
  "password" varchar(40),
  "phone" integer,
  "created_on" timestamp
);

CREATE TABLE "user_address" (
  "user_id" integer PRIMARY KEY,
  "line_1" varchar,
  "line_2" varchar,
  "city" varchar,
  "postal" varchar,
  "country" varchar
);

CREATE TABLE "user_payment" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "type" varchar,
  "provider" varchar,
  "card_number" integer,
  "expires" date
);

CREATE TABLE "order_details" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "payment_id" integer,
  "payment_status" varchar,
  "total" decimal,
  "date" date
);

CREATE TABLE "order_items" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "product_id" integer,
  "quantity" integer
);

CREATE TABLE "cart_session" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "total" decimal
);

CREATE TABLE "cart_item" (
  "id" integer PRIMARY KEY,
  "cart_session_id" integer,
  "product_id" integer,
  "quantity" integer
);

CREATE TABLE "product" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "description" text,
  "SKU" varchar(40),
  "category_id" integer,
  "inventory_id" integer,
  "price" decimal,
  "created_on" timestamp
);

CREATE TABLE "product_category" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "desc" text
);

CREATE TABLE "product_inventory" (
  "id" integer PRIMARY KEY,
  "quantity" integer,
  "updated" timestamp
);

ALTER TABLE "user_address" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_payment" ("user_id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("payment_id") REFERENCES "user_payment" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "order_details" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "cart_session" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("cart_session_id") REFERENCES "cart_session" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("id") REFERENCES "cart_item" ("product_id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "product_category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("inventory_id") REFERENCES "product_inventory" ("id");
