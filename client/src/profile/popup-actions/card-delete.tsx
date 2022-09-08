import React, { FC, useState } from 'react';
import { getJwtToken } from '../../utils/util';
import '../submenus.css';
import './popup.css';

interface Card {
  id: string;
  card_name: string;
  full_name: string;
  card_number: string;
  type: string;
  expires: string;
}

type DeleteType = {
  setDeleteCard: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCard: string;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card>>;
};

interface DeleteProps {
  props: DeleteType;
}

const DeleteCard: FC<DeleteProps> = ({ props }) => {
  const [error, setError] = useState('');

  const jwtToken = getJwtToken();

  const handleDelete = () => {
    const url = `/api/user_payment/${props.selectedCard}`;
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    fetch(url, options).then((response) => {
      if ([500, 403, 401].includes(response.status)) {
        setError('Server Error...');
      } else {
        setError('');
        props.setSelectedCard({
          id: '',
          card_name: '',
          full_name: '',
          card_number: '',
          type: '',
          expires: '',
        });
        props.setDeleteCard(false);
      }
    });
  };

  return (
    <div className="background">
      <div className="popup delete-card-popup">
        <p className="warning">Are you sure you want to delete this card?</p>
        {error && <p className="error">Error: {error}</p>}
        <div className="buttons">
          <button onClick={handleDelete}>Yes</button>
          <button
            onClick={() => {
              props.setDeleteCard(false);
              props.setSelectedCard({
                id: '',
                card_name: '',
                full_name: '',
                card_number: '',
                type: '',
                expires: '',
              });
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
