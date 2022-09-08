import React, { FC, useState } from 'react';
import { getJwtToken } from '../utils/util';

interface newCategoryProps {
  setNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
  props: newCategoryProps;
};

const NewCategory: FC<props> = ({ props }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const jwtToken = getJwtToken();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch('/api/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    }).then((res) => {
      if (res.status === 201) {
        props.setNewCategory(false);
        return console.log('Added...');
      }
      console.log('Failure...');
    });
  };

  return (
    <div className="background">
      <div className="popup admin-popup">
        <h2>Add Category</h2>
        <hr />
        <form onSubmit={handleSubmit}>
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
          <div className="buttons">
            <button type="submit">Submit</button>
            <button onClick={() => props.setNewCategory(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
