import React, { useEffect } from 'react';
import Card from './Card';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';



export default function Withdraw() {
  const [amount, setAmount] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [button, setButton] = React.useState(false);  // Initialize button state as disabled
  const ctx = React.useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.users[ctx.users.length - 1].balance);

  useEffect(() => {
    if (amount.trim()) {  // Button will be enabled if amount is not empty
      setButton(true);
    } else {  // Button will be disabled if amount is empty
      setButton(false);
    }
  }, [amount]);  // Button state updates whenever 'amount' changes




  function checkWithdrawFields(e) {
    let statusTimeout; // Declare statusTimeout here

    const currentAmount = e.currentTarget.value;
    if (currentAmount.trim()) {
      setButton(true);
      setStatus(''); // Clear any previous error messages
    } else {
      setButton(false);
      setStatus('Error: Please enter a valid amount');
    }

    if (statusTimeout) {// Clear any previous timeout 
      clearTimeout(statusTimeout);
    }

    // Set a new timeout to clear the status after 3 seconds
    statusTimeout = setTimeout(() => setStatus(''), 3000);
  }




  function handleWithdraw() {
    if (!button) return;  // If button is disabled, the function will return early

    if (isNaN(amount)) {
      setStatus('Error: amount can only contain numbers');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if (amount <= 0) {
      setStatus('Error: amount must be greater than 0');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

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
  }




  return (
    <Card
      bgcolor="dark"
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
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.currentTarget.value)}
            onBlur={checkWithdrawFields}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={!button}  // Button will be disabled or enabled based on 'button' state
            onClick={handleWithdraw}>Withdraw
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
            onClick={clearForm}>Make another withdraw
          </button>
        </>
      )}
    />
  );
}
