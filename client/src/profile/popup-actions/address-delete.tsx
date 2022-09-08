import React, { FC, useState } from 'react';
import { getJwtToken } from '../../utils/util';
import '../address-book.css';
import '../submenus.css';
import './popup.css';

interface Address {
  id: string;
  address_name: string;
  first_name: string;
  last_name: string;
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  postal: string;
  is_default: boolean;
}

// Delete Component

type DeleteType = {
  setDeleteAddress: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAddress: string;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address>>;
};

interface DeleteProps {
  props: DeleteType;
}

const DeleteAddress: FC<DeleteProps> = ({ props }) => {
  const [error, setError] = useState('');
  const jwtToken = getJwtToken();

  const handleDelete = (e: React.SyntheticEvent) => {
    const url = `/api/user_address/${props.selectedAddress}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => {
      if ([500, 403, 401].includes(res.status)) {
        setError('Server Error...');
      } else {
        setError('');
        props.setSelectedAddress({
          id: '',
          address_name: '',
          first_name: '',
          last_name: '',
          line_1: '',
          line_2: '',
          city: '',
          state: '',
          postal: '',
          is_default: false,
        });
        props.setDeleteAddress(false);
      }
    });
  };

  return (
    <div className="background">
      <div className="popup delete-address-popup">
        <p className="warning">Are you sure you want to delete this address?</p>
        {error && <p className="error">Error: {error}</p>}
        <div className="buttons">
          <button onClick={handleDelete}>Yes</button>
          <button
            onClick={() => {
              props.setDeleteAddress(false);
              props.setSelectedAddress({
                id: '',
                address_name: '',
                first_name: '',
                last_name: '',
                line_1: '',
                line_2: '',
                city: '',
                state: '',
                postal: '',
                is_default: false,
              });
              setError('');
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddress;
