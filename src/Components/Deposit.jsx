//Importing Libraries and Components
import React, { useEffect } from 'react';
//import React from 'react';  // Imports the React library to use it's features
import Card from './Card';  // Imports a custom "Card" component from the Card.jsx file
import { UserContext } from './Context'; // Imports "UserContexts" to access shared user data across components
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports the Bootstrap library to help style the application




// The Main Deposit Function Component
export default function Deposit() { // Defines and exports the Deposit function component which will render the deposit form
  const [show, setShow] = React.useState(true); // Controls whether the form is visible or not
  const [status, setStatus] = React.useState(''); // Controls the status message/error message displayed at the bottom of the form
  const [amount, setAmount] = React.useState(''); // Stores the amount entered in the amount field
  const [button, setButton] = React.useState(false); // Controls whether the button is enabled or disabled
  const ctx = React.useContext(UserContext); // Gets the user context from the Context.jsx file
  const [balance, setBalance] = React.useState(ctx.users[ctx.users.length - 1].balance); // Stores the balance of the last user in the users array

  useEffect(() => { // This function will run whenever the amount changes
    if (amount.trim()) {  // Button will be enabled if amount is not empty
      setButton(true); // Sets the button to enabled
    } else {  // Button will be disabled if amount is empty
      setButton(false); // Sets the button to disabled
    }
  }, [amount]); // Button state updates whenever 'amount' changes




  //Validate Function
  function validate(field, label) { // This function checks if the Deposit field is empty or not. If it is empty, it is set to a temporary error message.
    if (!field) {  // If the field is empty (false), the function will return early and display an error message at the bottom of the form for 3 seconds before clearing it out again.   
      setStatus('Error: ' + label); // Sets the status to the error message and the label of the field that is empty (e.g. Error: amount) 
      setTimeout(() => setStatus(''), 3000); // Clears the status after 3 seconds  
      return false;  // Returns false to exit the function eadrly 
    }
    return true; // Returns true to continue the function 
  }




  //Check Deposit Fields Function
  function checkDepositFields(e) {
    let statusTimeout; // Declare statusTimeout here
  
    const currentAmount = e.currentTarget.value;
    if (currentAmount.trim()) {
      setButton(true);
      setStatus(''); // Clear any previous error messages
    } else {
      setButton(false);
      setStatus('Error: Please enter a valid amount');
    }
  
    // Clear any previous timeout
    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }
  
    // Set a new timeout to clear the status after 3 seconds
    statusTimeout = setTimeout(() => setStatus(''), 3000);
  }
 



  // Function to handle the deposit
  function handleDeposit() { //function to handle the deposit
    const user = ctx.users[ctx.users.length - 1]; //gets the last item in the users array
    console.log(user); //shows the default balance in the console output on line 1
    if (!validate(amount, 'amount')) return; //checks if the amount field is empty

    if (isNaN(amount)) { //checks if the amount entered is a number
      setStatus('Error: amount can only contain numbers'); //displays the error message when a character other than a number is entered
      setTimeout(() => setStatus(''), 3000); //clears the error message after 3 seconds
      return; //exits the function
    }

    if (amount <= 0) { //checks if the amount entered is greater than 0
      setStatus('Error: amount must be greater than 0'); //displays the error message when the amount entered is less than or equal to 0
      setTimeout(() => setStatus(''), 3000); //clears the error message after 3 seconds
      return; //exits the function
    }

    if (!validate(button, 'button')) return; //checks if the button is disabled

    if (!user) { //checks if the user exists
      setStatus('Error: User not found'); //displays the error message when the user is not found
      setTimeout(() => setStatus(''), 3000); //clears the error message after 3 seconds
      return; //exits the function
    }

    user.balance = Number(user.balance) + Number(amount); //adds the amount entered to the balance
    console.log(user); //shows the updated balance in the console output
    setBalance(user.balance); //sets the balance to the updated balance
    ctx.users[ctx.users.length - 1] = user; //sets the last item in the users array to the updated user
    console.table([ctx.users[0]]); //shows the updated items in the console table output
    setShow(false); //hides the form
  }




  //Resets the form to its original state
  function clearForm() { //function to clear the form
    setAmount(''); //clears the amount field
    setShow(true); //shows the form
  }




  /*This 'return' statement renders the deposit form using the 'Card' component.
  It sets the background color, header, and status message based on the application state.
  Depending on whether the form is shown or not, it displays either the deposit form or a success message.*/
  return ( //returns the deposit form
    <Card //returns the card component
      bgcolor="dark" //sets the background color to primary
      header="Deposit Amount" //sets the header to Deposit Amount
      status={status} //sets the status to the error message
      body={show ? ( //checks if the form is shown
        <> {/*begins the if statement*/}
          <h2>
            Balance: ${balance /*shows the balance*/}
          </h2>
          Amount<br /> {/*displays the text Amount*/}
          <input 
            type="input"
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={e => { setAmount(e.currentTarget.value); checkDepositFields(e); }}
            onBlur={checkDepositFields/*sets the onBlur event to check the deposit fields*/}
          />
          <br />
          <button 
            type="submit" //returns the button element
            className="btn btn-light" //sets the class name to btn btn-light
            disabled={!button}
            onClick={handleDeposit}>Deposit</button>
        </> //ends the if statement 
      ) : ( //if the form is not shown
        <> {/*begins the else statement*/}
          <h5>Success</h5> {/*displays the text Success*/}
          <h2>
            Balance: ${balance /*shows the balance*/}
          </h2>
          <button
            type="submit" //returns the button element
            className="btn btn-light" //sets the class name to btn btn-light
            disabled={!button}
            onClick={clearForm /*sets the onClick event to clear the form*/}>
            Make another deposit  {/*sets the text to Make another deposit*/}
          </button> {/*ends the button element*/}
        </> //ends the else statement
      )}
    />
  )
};