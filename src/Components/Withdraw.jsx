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

    user.balance = Number(user.balance) - Number(amount); // Deduct the withdrawal 'amount' from the user's current balance.
    setBalance(user.balance); // Update the 'balance' state with the new balance value for the user.
    ctx.users[ctx.users.length - 1] = user; // Update the user data in the 'ctx' context by replacing the last user with the modified user object.
    setShow(false); // Set the 'show' state to 'false' to hide or deactivate a component (or perform a similar action).
  }

  function clearForm() { // Function to clear/reset the form and related component state.
    setAmount(""); // Clear the 'amount' input field by setting its value to an empty string.
    setShow(true); // Show the component (or set its visibility to the initial state).
    setButtonActive(false); // Set the 'buttonActive' state to 'false' to deactivate or disable a button.
  }

  return ( // Return a JSX component that displays withdrawal functionality.
    <Card // Render a custom 'Card' component with specific props.
      bgcolor="secondary" // Set the background color of the card to "secondary".
      header="Withdraw Amount" // Set the header text of the card to "Withdraw Amount".
      status={status} // Pass the 'status' prop to display a status message.
      body={ // Render the body of the card, which contains conditional content.
        show ? ( // Render this content if 'show' is true (component is visible).
          <> {/* This React fragment is used to group multiple elements without introducing an additional parent element in the DOM. */}
            <h2>Balance: ${balance}</h2> {/* Display the user's balance with an appropriate heading. */}
            Amount {/* Display the label "Amount" */}
            <br /> {/* This 'br' element represents a line break, creating vertical spacing between elements. */}
            <input // This is an input element used for user data entry or input.
              type="input" // Specify the input type as "input" (it's more commonly "text" for text input).
              style={{ backgroundColor: "lightgray" }} // Set the background color of the input field to light gray.
              className="form-control" // Apply the "form-control" CSS class to style the input field.
              id="amount" // Assign a unique identifier ("id") to the input field.
              placeholder="Enter amount" // Provide a placeholder text for user guidance.
              value={amount} // Bind the 'value' prop to the 'amount' state, ensuring it reflects the current value.
              onChange={handleAmountChange} // Specify the event handler 'onChange' to call the 'handleAmountChange' function when the input changes.
            /> {/* Closing input tag */}
            <br /> {/* This 'br' element represents a line break, creating vertical spacing between elements. */}
            <button // This is a button element used to trigger an action.
              type="submit" // Define the button type as "submit" for form submission (can be "button" or "submit").
              className="btn btn-light" // Apply CSS classes "btn" and "btn-light" to style the button.
              disabled={!buttonActive} /* Apply custom CSS classes to style the element button with a light appearance. The classes "btn" and "btn-light" define specific button styles in the project's CSS. */
              onClick={handleWithdraw}>Withdraw {/* Attach an event handler, 'handleWithdraw', to trigger a function when the button is clicked. This allows for specific actions or logic to be executed in response to the button click event. */}
            </button> {/* Closing button tag */}
          </> /* Closing fragment tag */
        ) : ( // Render this content if 'show' is false (component is hidden).
          <> {/* This React fragment is used to group multiple elements without introducing an additional parent element in the DOM. */}
            <h5>Success</h5> {/* Display a success message with an appropriate heading. */}
            <h2>Balance: ${balance}</h2> {/* Display the user's balance with an appropriate heading. */}  
            <button // This is a button element used to trigger an action. 
              type="submit" // Define the button type as "submit" for form submission (can be "button" or "submit").
              className="btn btn-light" // Apply CSS classes "btn" and "btn-light" to style the button.
              onClick={clearForm}>Make another withdraw {/* Attach an event handler, 'clearForm', to trigger a function when the button is clicked. This allows for specific actions or logic to be executed in response to the button click event. */}
            </button> {/* Closing button tag */}
          </> /* Closing fragment tag */
        ) // Closing ternary operator
      } // Closing body prop
    /> // Closing Card component
  ); // Closing return statement
}; // Closing Withdraw function
