import React, { FC, useState } from 'react';
import { getJwtToken, verifyCard } from '../../utils/util';
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

type EditType = {
  setEditCard: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCard: any;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card>>;
};

interface EditProps {
  props: EditType;
}

const EditCard: FC<EditProps> = ({ props }) => {
  const [error, setError] = useState('');

  const [cardName, setCardName] = useState(props.selectedCard.card_name);
  const [fullName, setFullName] = useState(props.selectedCard.full_name);
  const [cardNumber, setCardNumber] = useState(props.selectedCard.card_number);
  const [type, setType] = useState(props.selectedCard.type);
  const [expiration, setExpiration] = useState(props.selectedCard.expires);

  const jwtToken = getJwtToken();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (error !== '') return;

    if (!verifyCard(cardNumber)) {
      setError('Invalid Card Number');
      return;
    }

    const url = `/api/user_payment/${props.selectedCard.id}`;
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        card_name: cardName,
        card_number: cardNumber,
        type: type,
        provider: 'visa',
        expiration: expiration,
      }),
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if ([401, 403, 500].includes(response.status)) {
          setError('Server Error...');
        } else {
          props.setEditCard(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="background">
      <div className="popup edit-card-popup">
        <h2>Edit Card</h2>
        <hr />
        {error && <p className="error">Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="card-name">Card Name: </label>
          <input
            id="card-name"
            type="text"
            value={cardName}
            onChange={(e) => {
              setCardName(e.currentTarget.value);
              setError('');
            }}
            required
          />
          <label htmlFor="full-name">Name On Card: </label>
          <input
            id="full-name"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.currentTarget.value);
              setError('');
            }}
            required
          />
          <label htmlFor="card-number">Card Number: </label>
          <input
            id="card-number"
            type="text"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.currentTarget.value);
              setError('');
            }}
            required
          />
          <label htmlFor="card-type">Card Type: </label>
          <select
            id="card-type"
            name="card-type"
            value={type}
            onChange={(e) => {
              setType(e.currentTarget.value);
              setError('');
            }}
            required
          >
            <option value="">Select a type...</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="gift-card">Gift Card</option>
          </select>
          <label htmlFor="card-expiration">Expiration: </label>
          <input
            id="card-expiration"
            type="text"
            value={expiration}
            onChange={(e) => {
              setExpiration(e.currentTarget.value);
              setError('');
            }}
            required
          />
          <div className="buttons">
            <button type="submit">Save</button>
            <button
              onClick={() => {
                props.setEditCard(false);
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
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
