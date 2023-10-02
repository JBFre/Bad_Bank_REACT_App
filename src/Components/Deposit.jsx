// Importing Libraries and Components
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';

// The Main Deposit Function Component
export default function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [button, setButton] = useState(false);
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = useState(ctx.users[ctx.users.length - 1].balance);
  const [statusTimeout, setStatusTimeout] = useState(null); // Declare statusTimeout using useState

  useEffect(() => {
    if (amount.trim()) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [amount]);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      // Clear the previous timeout, if any
      if (statusTimeout) {
        clearTimeout(statusTimeout);
      }
      // Set a new timeout to clear the status after 3 seconds
      const newStatusTimeout = setTimeout(() => {
        setStatus('');
        setStatusTimeout(null);
      }, 3000);
      setStatusTimeout(newStatusTimeout);
      return false;
    }
    return true;
  }

  function checkDepositFields(e) {
    const currentAmount = e.currentTarget.value;
    if (currentAmount.trim()) {
      setButton(true);
      setStatus('');
    } else {
      setButton(false);
      setStatus('Error: Please enter a valid amount');
    }

    // Clear any previous timeout
    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }

    // Set a new timeout to clear the status after 3 seconds
    const newStatusTimeout = setTimeout(() => {
      setStatus('');
      setStatusTimeout(null);
    }, 3000);
    setStatusTimeout(newStatusTimeout);
  }

  function handleDeposit() {
    const user = ctx.users[ctx.users.length - 1];
    console.log(user);
    if (!validate(amount, 'amount')) return;

    if (isNaN(amount)) {
      setStatus('Error: amount can only contain numbers');
      // Clear the previous timeout, if any
      if (statusTimeout) {
        clearTimeout(statusTimeout);
      }
      // Set a new timeout to clear the status after 3 seconds
      const newStatusTimeout = setTimeout(() => {
        setStatus('');
        setStatusTimeout(null);
      }, 3000);
      setStatusTimeout(newStatusTimeout);
      return;
    }

    if (amount <= 0) {
      setStatus('Error: amount must be greater than 0');
      // Clear the previous timeout, if any
      if (statusTimeout) {
        clearTimeout(statusTimeout);
      }
      // Set a new timeout to clear the status after 3 seconds
      const newStatusTimeout = setTimeout(() => {
        setStatus('');
        setStatusTimeout(null);
      }, 3000);
      setStatusTimeout(newStatusTimeout);
      return;
    }

    if (!validate(button, 'button')) return;

    if (!user) {
      setStatus('Error: User not found');
      // Clear the previous timeout, if any
      if (statusTimeout) {
        clearTimeout(statusTimeout);
      }
      // Set a new timeout to clear the status after 3 seconds
      const newStatusTimeout = setTimeout(() => {
        setStatus('');
        setStatusTimeout(null);
      }, 3000);
      setStatusTimeout(newStatusTimeout);
      return;
    }

    user.balance = Number(user.balance) + Number(amount);
    console.log(user);
    setBalance(user.balance);
    ctx.users[ctx.users.length - 1] = user;
    console.table([ctx.users[0]]);
    setShow(false);
  }

  function clearForm() {
    setAmount('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="dark"
      header="Deposit Amount"
      status={status}
      body={show ? (
        <>
          <h2>
            Balance: ${balance}
          </h2>
          Amount<br />
          <input
            type="input"
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={e => { setAmount(e.currentTarget.value); checkDepositFields(e); }}
            onBlur={checkDepositFields}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={!button}
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
            disabled={!button}
            onClick={clearForm}
          >
            Make another deposit
          </button>
        </>
      )}
    />
  );
};
