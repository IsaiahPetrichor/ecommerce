import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getImage } from '../utils/util';
import './products.css';

interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  isChecked: boolean;
}

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // price sorting states
  const [lowHigh, setLowHigh] = useState(true);
  const [highLow, setHighLow] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((json) => {
        setCategories(
          json.categories.map((category: Category) => {
            category.isChecked = false;
            return category;
          })
        );
        setProducts(
          json.products.sort((a: Product, b: Product) => {
            return a.price - b.price;
          })
        );
        setFilteredProducts(
          json.products.sort((a: Product, b: Product) => {
            return a.price - b.price;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLowHigh = () => {
    setLowHigh(!lowHigh);
    if (highLow) setHighLow(false);

    const productArr = [...filteredProducts];
    setFilteredProducts(
      productArr.sort((a, b) => {
        return a.price - b.price;
      })
    );
  };

  const handleHighLow = () => {
    setHighLow(!highLow);
    if (lowHigh) setLowHigh(false);

    const productArr = [...filteredProducts];
    setFilteredProducts(
      productArr.sort((a, b) => {
        return b.price - a.price;
      })
    );
  };

  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      categories.forEach((category) => {
        if (category.id === event.target.value) {
          category.isChecked = true;
        } else {
          category.isChecked = false;
        }
      });
      setFilteredProducts(
        products.filter((product) => product.category_id === event.target.value)
      );
    } else {
      setFilteredProducts(products);
      categories.forEach((category) => (category.isChecked = false));
    }

    return undefined;
  };

  const handleClear = () => {
    setLowHigh(true);
    setHighLow(false);
    categories.forEach((category) => (category.isChecked = false));

    setFilteredProducts(products);
  };

  return (
    <main className="products">
      <div className="filters">
        <hr className="right-hr" />
        <div id="filter-menu">
          <div className="filter-header">
            <h2 className="filter-title">Filters</h2>
            <button onClick={handleClear}>Clear</button>
          </div>
          <hr />
          <label className="checkbox">
            Sort by price (low to high):
            <input type="radio" checked={lowHigh} onChange={handleLowHigh} />
          </label>
          <label className="checkbox">
            Sort by price (high to low):
            <input type="radio" checked={highLow} onChange={handleHighLow} />
          </label>
          <p>Filter by Category</p>
          {categories.map((category) => {
            return (
              <label className="checkbox" key={category.id}>
                {category.name}
                <input
                  type="checkbox"
                  value={category.id}
                  checked={category.isChecked}
                  onChange={handleCategory}
                />
              </label>
            );
          })}
        </div>
      </div>
      <div className="products-list">
        {filteredProducts.map((product) => {
          return (
            <Link to={product.id} className="list-product" key={product.id}>
              <div
                className="list-product-img"
                style={{
                  backgroundImage: `url('/assets/${getImage(
                    product.name
                  )}.avif')`,
                }}
              ></div>
              <h2>{product.name}</h2>
              <h3>
                {'$'}
                {product.price}
              </h3>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Products;
