import React from 'react';
import { UserContext } from './Context';

export default function AllData() { // Creates the AllData function
    // Step 1: Get the user data from the UserContext
    const ctx = React.useContext(UserContext); // Sets the ctx state to the UserContext
    const users = ctx.users; // Sets the users state to the users array
  
    // Step 2: Convert the users array into an array of table rows
    const usersRows = users.map((element, index) => ( // Sets the usersRows state to the users array
      <tr key={index}>{/* Displays the table row */}
        <td>{element.name}</td>{/* Displays the name */}
        <td>{element.email}</td>{/* Displays the email */}
        <td>{element.password}</td>{/* Displays the password */}
        <td>{element.balance}</td>{/* Displays the balance */}
      </tr>// Ends the table row
    )); // Ends the usersRows variable
  
    // Define the inline styles for the table background colors
    const tableHeaderStyle = { // Sets the tableHeaderStyle state
      backgroundColor: '#6c757d', // Set the background color for the table header
      color : 'white', // Set the color for the table header
    };
  
    const tableBodyStyle = { // Sets the tableBodyStyle state
      backgroundColor: '#6c757d', // Set the background color for the table body
      color : 'white', // Set the color for the table body
    };
  
    return ( // Returns the following
      <>
        <h5>AllData</h5>{/* Displays the AllData header */}
        {/* Step 3: Output the table */}
        <table className="table table-bordered table-striped">
          <thead style={tableHeaderStyle}>{/* Displays the table header */}
            <tr>{/* Displays the table row */}
              <th>Name</th>{/* Displays the table header Name */}
              <th>Email</th>{/* Displays the table header Email */}
              <th>Password</th>{/* Displays the table header Password */}
              <th>Balance</th>{/* Displays the table header Balance */}
            </tr>{/* Ends the table row */}
          </thead>{/* Ends the table header */}
          <tbody style={tableBodyStyle}>{/* Displays the table body */}
            {/* Step 3.1 and 3.2: Loop through each element and output it into the table */}
            {usersRows}{/* Displays the usersRows variable......SEE "const usersRows = users.map((element, index) => (" */}
          </tbody>{/* Ends the table body */}
        </table>{/* Ends the table */}
      </> // Ends the AllData component
    ); // Ends the return statement
  } // Ends the AllData function