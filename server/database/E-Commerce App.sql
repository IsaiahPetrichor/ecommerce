CREATE TABLE users(
	id integer PRIMARY KEY,
  first_name varchar(32) NOT NULL,
  last_name varchar(32) NOT NULL,
  email varchar(60) NOT NULL,
  password varchar(40) NOT NULL,
  phone varchar(10),
  created_on timestamp,
  UNIQUE(email)
);

CREATE TABLE user_address (
  user_id integer PRIMARY KEY REFERENCES users(id),
  line_1 varchar NOT NULL,
  line_2 varchar,
  city varchar NOT NULL,
  postal varchar NOT NULL,
  country varchar NOT NULL
);

CREATE TABLE user_payment (
  id integer PRIMARY KEY,
  user_id integer REFERENCES users(id) NOT NULL,
  type varchar NOT NULL,
  provider varchar NOT NULL,
  card_number integer NOT NULL,
  expires date NOT NULL
);

CREATE TABLE product_category (
  id integer PRIMARY KEY,
  name varchar NOT NULL,
  description text NOT NULL
);

CREATE TABLE product_inventory (
  id integer PRIMARY KEY,
  quantity integer NOT NULL,
  updated timestamp NOT NULL
);

CREATE TABLE product (
  id integer PRIMARY KEY,
  name varchar NOT NULL,
  description text NOT NULL,
  SKU varchar(40) NOT NULL,
  category_id integer REFERENCES product_category(id) NOT NULL,
  inventory_id integer REFERENCES product_inventory(id) NOT NULL,
  price decimal NOT NULL,
  created_on timestamp NOT NULL
);

CREATE TABLE order_details (
  id integer PRIMARY KEY,
  user_id integer REFERENCES users(id) NOT NULL,
  payment_id integer REFERENCES user_payment(id) NOT NULL,
  payment_status varchar NOT NULL,
  total decimal NOT NULL,
  date date NOT NULL
);

CREATE TABLE order_items (
  id integer PRIMARY KEY,
  order_id integer REFERENCES order_details(id) NOT NULL,
  product_id integer REFERENCES product(id) NOT NULL,
  quantity integer NOT NULL
);

CREATE TABLE cart_session (
  id integer PRIMARY KEY,
  user_id integer REFERENCES users(id) NOT NULL,
  total decimal NOT NULL
);

CREATE TABLE cart_item (
  id integer PRIMARY KEY,
  cart_session_id integer REFERENCES cart_session(id) NOT NULL,
  product_id integer REFERENCES product(id) NOT NULL,
  quantity integer NOT NULL
);
