import React from "react"; // Import the React library from the 'react' package.
import Card from "./Card"; // Import the 'Card' component from a local file named 'Card'.
import { UserContext } from "./Context"; // Import the 'UserContext' object from the 'Context' module using destructuring.
import "../App.css"; // Import the 'App.css' file to apply its styles to this component.

export default function Withdraw() {
  // Export a default function named 'Withdraw' as a module
  const [amount, setAmount] = React.useState(""); // Create a state variable 'amount' and a function 'setAmount'  using the React useState hook.
  const [show, setShow] = React.useState(true); // Create a state variable 'show' and a function 'setShow' using the React useState hook.  'show' is initially set to 'true', indicating that something is initially visible.
  const [status, setStatus] = React.useState(""); // Create a state variable 'status' and a function 'setStatus' using the React useState hook. 'status' is initially an empty string, indicating an undefined or empty status.
  const ctx = React.useContext(UserContext); // Access the 'UserContext' using the useContext hook and store it in the 'ctx' variable.
  const [balance, setBalance] = React.useState( // Initialize the 'balance' state variable using React's useState hook.
    ctx.users[ctx.users.length - 1].balance // Set it to the balance of the last user in the 'ctx' context.
  );
  const [buttonActive, setButtonActive] = React.useState(false); // Initialize the 'buttonActive' state variable using React's useState hook. Initially, set it to 'false' to indicate that a button is not active.

  function validate(field, label) { // Check if 'field' is empty or falsy (null, undefined, empty string, etc.).
    if (!field) { // If the field is empty or falsy, set the status message to an error message
      setStatus(`Error: ${label}`); // that includes the provided 'label'.
      setTimeout(() => setStatus(""), 3000); // Use setTimeout to clear the error message after 3 seconds (3000 milliseconds).
      return false; // Return 'false' to indicate that the validation failed.
    }
    return true; // If the field is not empty or falsy, return 'true' to indicate successful validation.
  }

  function handleAmountChange(e) { // Get the current value from the event's target (e.currentTarget).
    const value = e.currentTarget.value; // Extract the current value from the event's target element (e.currentTarget). This line captures the user's input value from a form field.
    setAmount(value); // Update the 'amount' state with the new value.
    if (value && !isNaN(value) && Number(value) > 0) { // Check if 'value' is not empty, is a valid number, and is greater than 0
      setButtonActive(true); // If the conditions are met, enable the button.
    } else { // If the conditions for a valid input value are not met, disable the button.
      setButtonActive(false); // If the conditions are not met, disable the button.
    }
  }
  
  function handleWithdraw() { // Function to handle a withdrawal action.
    if (!validate(amount, "amount")) return; // Check if the 'amount' input is valid using the 'validate' function. If it's not valid, return and do not proceed with the withdrawal.

    const user = ctx.users[ctx.users.length - 1]; // Check if the 'amount' input is valid using the 'validate' function. If it's not valid, return and do not proceed with the withdrawal.
    if (!user) { // Check if a user exists in the context; if not, display an error message.
      setStatus("Error: User not found"); // Display an error message indicating that the user was not found.
      setTimeout(() => setStatus(""), 3000); // Use setTimeout to clear the error message after 3 seconds (3000 milliseconds).
      return; // Return to exit the function since further processing is not possible.
    }

    if (Number(user.balance) < Number(amount)) { // Check if the user's balance is less than the withdrawal amount.
      setStatus("Error: Insufficient funds"); // Display an error message indicating insufficient funds for withdrawal.
      setTimeout(() => setStatus(""), 3000); // Use setTimeout to clear the error message after 3 seconds (3000 milliseconds).
      return; // Return to exit the function since the withdrawal is not possible.
    }

    user.balance = Number(user.balance) - Number(amount);
    setBalance(user.balance);
    ctx.users[ctx.users.length - 1] = user;
    setShow(false);
  }

  function clearForm() {
    setAmount("");
    setShow(true);
    setButtonActive(false);
  }

  return (
    <Card
      bgcolor="secondary"
      header="Withdraw Amount"
      status={status}
      body={
        show ? (
          <>
            <h2>Balance: ${balance}</h2>
            Amount
            <br />
            <input
              type="input"
              style={{ backgroundColor: "lightgray" }}
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
            <h2>Balance: ${balance}</h2>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Make another withdraw
            </button>
          </>
        )
      }
    />
  );
}
