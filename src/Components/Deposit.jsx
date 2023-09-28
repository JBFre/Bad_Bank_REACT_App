import React from 'react';
import Card from './Card';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [buttonActive, setButtonActive] = React.useState(false);
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

  function handleAmountChange(e) {
    const value = e.currentTarget.value;
    setAmount(value);

    if (value && !isNaN(value) && Number(value) > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
      setStatus('Error: Please enter in a number');
      setTimeout(() => setStatus(''), 3000);
      return;
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
    setButtonActive(false);
  }

  return (
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
            onChange={handleAmountChange}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={!buttonActive}
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
  );
};
