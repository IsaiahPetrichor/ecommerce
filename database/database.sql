CREATE TABLE users(
	id uuid PRIMARY KEY,
  first_name varchar(32) NOT NULL,
  last_name varchar(32) NOT NULL,
  email varchar(60) UNIQUE NOT NULL,
  password varchar(150) NOT NULL,
  phone varchar(10),
  created_on timestamp NOT NULL,
  admin boolean DEFAULT false NOT NULL
);

CREATE TABLE user_address(
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id) NOT NULL,
  address_name varchar(60) NOT NULL,
  first_name varchar(60) NOT NULL,
  last_name varchar(80) NOT NULL,
  line_1 varchar(100) NOT NULL,
  line_2 varchar(100),
  city varchar(80) NOT NULL,
  state varchar(2) NOT NULL,
  postal varchar(5) NOT NULL,
  is_default boolean NOT NULL
);

CREATE TABLE user_payment (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id) NOT NULL,
  type varchar NOT NULL,
  provider varchar NOT NULL,
  card_number integer NOT NULL,
  expires date NOT NULL
);

CREATE TABLE product_category (
  id uuid PRIMARY KEY,
  name varchar NOT NULL,
  description text NOT NULL
);

CREATE TABLE product (
  id uuid PRIMARY KEY,
  name varchar NOT NULL,
  description text NOT NULL,
  SKU varchar(40) NOT NULL,
  category_id uuid REFERENCES product_category(id) NOT NULL,
  price decimal NOT NULL,
  created_on timestamp NOT NULL
);

CREATE TABLE product_inventory (
  product_id uuid PRIMARY KEY REFERENCES product(id),
  quantity integer NOT NULL,
  updated timestamp NOT NULL
);

CREATE TABLE order_details (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id) NOT NULL,
  payment_id uuid REFERENCES user_payment(id) NOT NULL,
  payment_status varchar NOT NULL,
  total decimal NOT NULL,
  date date NOT NULL
);

CREATE TABLE order_item (
  id uuid PRIMARY KEY,
  order_id uuid REFERENCES order_details(id) NOT NULL,
  product_id uuid REFERENCES product(id) NOT NULL,
  quantity integer NOT NULL
);

CREATE TABLE cart (
  user_id uuid REFERENCES users(id) NOT NULL,
  product_id uuid REFERENCES product(id) NOT NULL,
  quantity integer NOT NULL
);