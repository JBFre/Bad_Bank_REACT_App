import React from 'react';
import Card from './Card';
import { UserContext } from './Context';
import '../App.css'; // Import the App.css file

export default function Withdraw() {
  const [amount, setAmount] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.users[ctx.users.length - 1].balance);
  const [buttonActive, setButtonActive] = React.useState(false);

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
    }
  }

  function handleWithdraw() {
    if (!validate(amount, 'amount')) return;

    const user = ctx.users[ctx.users.length - 1];
    if (!user) {
      setStatus('Error: User not found');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if (Number(user.balance) < Number(amount)) {
      setStatus('Error: Insufficient funds');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    user.balance = Number(user.balance) - Number(amount);
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
      header="Withdraw Amount"
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
            onClick={handleWithdraw}
          >
            Withdraw
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
            Make another withdraw
          </button>
        </>
      )}
    />
  );
};
