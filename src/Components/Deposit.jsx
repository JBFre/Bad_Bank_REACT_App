import React from 'react';
import Card from './Card';
import { UserContext } from './Context';

export default function Deposit() { //function to return the deposit form
    const [show, setShow] = React.useState(true); //sets the show state to true
    const [status, setStatus] = React.useState(''); //sets the status state to an empty string
    const [amount, setAmount] = React.useState(''); //sets the amount state to an empty string
    const [button, setButton] = React.useState(false); //sets the button state to false
    const ctx = React.useContext(UserContext); //sets the ctx state to the UserContext
    const [balance, setBalance] = React.useState(ctx.users[ctx.users.length - 1].balance); //sets the balance state to the last item in the users array
  
    function validate(field, label) { //function to validate the field
      if (!field) { //checks if the field is empty
        setStatus('Error: ' + label); //displays the error message when the field is empty
        setTimeout(() => setStatus(''), 3000); //clears the error message after 3 seconds
        return false; //exits the function
      }
      return true; //returns true
    }
  
    function checkDepositFields(e) { //function to check the deposit fields
      if (amount.trim()) {  //checks if the amount field is empty
        setButton(true); //sets the button state to true
      } else { //if the amount field is not empty
        setButton(false); //sets the button state to false
  
        if (e.target.id === 'amount' && amount === '') //checks if the id is amount and the amount is empty
          setStatus('Error: Please enter a valid amount'); //displays the error message when the amount is empty
        setTimeout(() => setStatus(''), 3000); //clears the error message after 3 seconds
      } //end of if statement 
    } //end of checkDepositFields function
  
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
      //ctx.users.push({ amount, balance: 100 }); //pushes the amount and balance to the users array
  
  
      if (!user) { //checks if the user exists
        setStatus('Error: User not found'); //displays the error message when the user is not found
        setTimeout(() => setStatus(''), 3000); //clears the error message after 3 seconds
        return; //exits the function
      }
  
      user.balance = Number(user.balance) + Number(amount); //adds the amount entered to the balance
      console.log(user); //shows the updated balance in the console output on line 2
      setBalance(user.balance); //sets the balance to the updated balance
      ctx.users[ctx.users.length - 1] = user; //sets the last item in the users array to the updated user
      console.table([ctx.users[0]]); //shows the updated items in the console table output on line 3
      setShow(false); //hides the form
    }
  
    function clearForm() { //function to clear the form
      setAmount(''); //clears the amount field
      setShow(true); //shows the form
    }
  
    return ( //returns the deposit form
      <Card //returns the card component
        bgcolor="secondary" //sets the background color to primary
        header="Deposit Amount" //sets the header to Deposit Amount
        status={status} //sets the status to the error message
        body={show ? ( //checks if the form is shown
          <> {/*begins the if statement*/}
            <h2>
              Balance: ${balance /*shows the balance*/}
            </h2>
            Amount<br /> {/*displays the text Amount*/}
            <input type="input" //returns the input element
              style={{backgroundColor: 'lightgray'}} //sets the style to backgroundColor: lightgray
              className="form-control" //sets the class name to form-control
              id="amount" //sets the id to amount
              placeholder="Enter amount" //sets the placeholder to Enter amount
              value={amount} //sets the value to the amount
              onChange={e => setAmount(e.currentTarget.value)} //sets the onChange event to set the amount to the current target value 
              onBlur={checkDepositFields /*sets the onBlur event to check the deposit fields*/} />
            <br />
            <button type="submit" //returns the button element
              className="btn btn-light" //sets the class name to btn btn-light
              disabled={!button} onClick={handleDeposit}>Deposit</button> {/*sets the disabled attribute to the button variable and sets the onClick event to handle the deposit*/}
          </> //ends the if statement 
        ) : ( //if the form is not shown
          <> {/*begins the else statement*/}
            <h5>Success</h5> {/*displays the text Success*/}
            <h2>
              Balance: ${balance /*shows the balance*/}
            </h2>
            <button type="submit" //returns the button element
              className="btn btn-light" //sets the class name to btn btn-light
              onClick={clearForm /*sets the onClick event to clear the form*/}>
              Make another deposit  {/*sets the text to Make another deposit*/}
            </button> {/*ends the button element*/}
          </> //ends the else statement
        )}
      />
    )
  }