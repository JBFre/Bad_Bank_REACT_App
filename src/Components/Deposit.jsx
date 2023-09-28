import React from 'react';
import Card from './Card';
import { UserContext } from './Context';
//import '../App.css'; // Import the App.css file
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [buttonActive, setButtonActive] = React.useState(false);  // Added state to control button activation
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.users[ctx.users.length - 1].balance);

  function validate(field, label) {
    if (!field) {
      setStatus(`Error: ${label}`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleAmountChange(e) {  // Function to update the button state
    const value = e.currentTarget.value;
    setAmount(value);

    if (value && !isNaN(value) && Number(value) > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }

  function handleDeposit() {
    if (!validate(amount, 'amount')) return;

    const user = ctx.users[ctx.users.length - 1];
    if (!user) {
      setStatus('Error: User not found');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    user.balance = Number(user.balance) + Number(amount);
    setBalance(user.balance);
    ctx.users[ctx.users.length - 1] = user;
    setShow(false);
  }

  function clearForm() {
    setAmount('');
    setShow(true);
    setButtonActive(false);  // Reset the button state when the form is cleared
  }

  // const containerStyle = {
  //   position: 'fixed',
  //   top: '60px',
  //   width: '100%',
  //   zIndex: '100',
  // };

  return (
    // <div style={containerStyle}>
    <Card
      bgcolor="secondary"
      header="Deposit Amount"
      status={status}
      body={show ? (
        <>
          <h2>
            Balance: ${balance}
          </h2>
          Amount
          <br />
          <input
            type="input"
            style={{ backgroundColor: 'lightgray' }}
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}  // Using the new function here
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={!buttonActive}  // Button will be disabled if buttonActive is false
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </>
      ) : (
        <>
          <h5>Success</h5>
          <h2>
            Balance: ${balance}
          </h2>
          <button
            type="submit"
            className="btn btn-light"
            onClick={clearForm}
          >
            Make another deposit
          </button>
        </>
      )}
    />
    // </div>
  );
};
