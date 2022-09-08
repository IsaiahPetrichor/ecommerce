import React, { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';

interface editProductProps {
  setEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
  props: editProductProps;
};

interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category_id: string;
  price: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const EditProduct: FC<props> = ({ props }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedProduct, setSelectedProduct] = useState({
    id: '',
    name: '',
    description: '',
    sku: '',
    category_id: '',
    price: '',
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const jwtToken = getJwtToken();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products);
        setCategories(json.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = products.find(
      (product) => product.id === e.currentTarget.value
    );
    if (product) {
      setSelectedProduct(product);
      setName(product.name);
      setDescription(product.description);
      setSku(product.sku);
      setCategory(product.category_id);
      setPrice(product.price);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch(`/api/products/${selectedProduct.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        name,
        description,
        sku,
        category_id: category,
        price,
      }),
    }).then((res) => {
      if (res.status === 201) {
        props.setEditProduct(false);
        return console.log('Updated...');
      }
      console.log('Failure...');
    });
  };

  return (
    <div className="background">
      <div className="popup admin-popup">
        <h2>Edit Product</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <label>
            Product:
            <select onChange={handleChange}>
              <option value="">--Choose Product--</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              required
            />
          </label>
          <label>
            SKU:
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.currentTarget.value)}
              required
            />
          </label>
          <label>
            Category:
            <select onChange={(e) => setCategory(e.currentTarget.value)}>
              <option value={category}>
                {category ? category : '--Select Category--'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.currentTarget.value)}
              required
            />
          </label>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button onClick={() => props.setEditProduct(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
