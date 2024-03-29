import React, { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';
import NewProduct from './new-product';
import EditProduct from './edit-product';
import DeleteProduct from './delete-product';
import NewCategory from './new-category';
import EditCategory from './edit-category';
import DeleteCategory from './delete-category';
import DeleteUser from './delete-user';

const Admin: FC = () => {
  const [auth, setAuth] = useState(false);

  const [newProduct, setNewProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  const [newCategory, setNewCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);

  const [deleteUser, setDeleteUser] = useState(false);

  const jwtToken = getJwtToken();

  useEffect(() => {
    if (!jwtToken) return;

    fetch('/api/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setAuth(json.admin);
      });
  }, [jwtToken]);

  return (
    <main className="admin-page">
      {auth ? (
        <>
          <div className="product-admin">
            <button onClick={() => setNewProduct(!newProduct)}>
              Add Product
            </button>
            <button onClick={() => setEditProduct(!editProduct)}>
              Edit Product
            </button>
            <button onClick={() => setDeleteProduct(!deleteProduct)}>
              Delete Product
            </button>
            <hr />
            {newProduct && <NewProduct props={{ setNewProduct }} />}
            {editProduct && <EditProduct props={{ setEditProduct }} />}
            {deleteProduct && <DeleteProduct props={{ setDeleteProduct }} />}
          </div>
          <div className="category-admin">
            <button onClick={() => setNewCategory(!newCategory)}>
              Add Category
            </button>
            <button onClick={() => setEditCategory(!editCategory)}>
              Edit Category
            </button>
            <button onClick={() => setDeleteCategory(!deleteCategory)}>
              Delete Category
            </button>
            <hr />
            {newCategory && <NewCategory props={{ setNewCategory }} />}
            {editCategory && <EditCategory props={{ setEditCategory }} />}
            {deleteCategory && <DeleteCategory props={{ setDeleteCategory }} />}
          </div>
          <div className="user-admin">
            <button onClick={() => setDeleteUser(!deleteUser)}>
              Delete User
            </button>
            <hr />
            {deleteUser && <DeleteUser props={{ setDeleteUser }} />}
          </div>
        </>
      ) : (
        <h2 className="error">Error: you do not have access to this page!</h2>
      )}
    </main>
  );
};

export default Admin;
