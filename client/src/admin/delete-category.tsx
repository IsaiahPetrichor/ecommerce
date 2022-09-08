import { FC, useState, useEffect } from 'react';
import { getJwtToken } from '../utils/util';

interface deleteCategoryProps {
  setDeleteCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
  props: deleteCategoryProps;
};

interface Category {
  id: string;
  name: string;
  description: string;
}

const DeleteCategory: FC<props> = ({ props }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selected, setSelected] = useState('');

  const jwtToken = getJwtToken();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch(`/api/categories/${selected}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        props.setDeleteCategory(false);
        return console.log('Deleted...');
      }
      console.log('Failure...');
    });
  };

  return (
    <div className="background">
      <div className="popup admin-popup">
        <h2>Delete Category</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select onChange={handleChange}>
              <option value={''}>--Select Category--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button onClick={() => props.setDeleteCategory(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteCategory;
