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

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [lowHigh, setLowHigh] = useState(true);
  const [highLow, setHighLow] = useState(false);
  const [household, setHousehold] = useState(false);
  const [beans, setBeans] = useState(false);
  const [merch, setMerch] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((json) => {
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

  const handleHousehold = () => {
    if (beans) setBeans(false);
    if (merch) setMerch(false);
    if (highLow) handleLowHigh();

    if (household) {
      setFilteredProducts(products);
      setHousehold(false);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category_id === '575e41d4-70a8-47ed-b93e-3973d55401df'
        )
      );
      setHousehold(true);
    }
  };

  const handleBeans = () => {
    if (household) setHousehold(false);
    if (merch) setMerch(false);
    if (highLow) handleLowHigh();

    if (beans) {
      setFilteredProducts(products);
      setBeans(false);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category_id === 'b8826fa6-071f-45c6-ae7c-a733c48457e2'
        )
      );
      setBeans(true);
    }
  };

  const handleMerch = () => {
    if (household) setHousehold(false);
    if (beans) setBeans(false);
    if (highLow) handleLowHigh();

    if (merch) {
      setFilteredProducts(products);
      setMerch(false);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category_id === '92522885-9842-40f4-b3cd-bfbdac2c97fe'
        )
      );
      setMerch(true);
    }
  };

  const handleClear = () => {
    setLowHigh(false);
    setHighLow(false);
    setHousehold(false);
    setBeans(false);
    setMerch(false);

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
            <input type="checkbox" checked={lowHigh} onChange={handleLowHigh} />
          </label>
          <label className="checkbox">
            Sort by price (high to low):
            <input type="checkbox" checked={highLow} onChange={handleHighLow} />
          </label>
          <p>Filter by Category</p>
          <label className="checkbox">
            Appliances:
            <input
              type="checkbox"
              checked={household}
              onChange={handleHousehold}
            />
          </label>
          <label className="checkbox">
            Beans:
            <input type="checkbox" checked={beans} onChange={handleBeans} />
          </label>
          <label className="checkbox">
            Merch:
            <input type="checkbox" checked={merch} onChange={handleMerch} />
          </label>
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
