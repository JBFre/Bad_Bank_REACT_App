import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() { // This is the main function. When called, it returns the JSX code for the navigation bar.
    const [cssClass, setCssClass] = React.useState('nav-link');
    const [cssClassDeposit, setCssClassDeposit] = React.useState('nav-link');
    const [cssClassWithdraw, setCssClassWithdraw] = React.useState('nav-link');
    const [cssClassAllData, setCssClassAllData] = React.useState('nav-link');
    const navBarStyle = {position: 'fixed',top: '0',width: '100%',zIndex: '100'};
  
    function resetNavLinkClasses() {
      setCssClass('nav-link');
      setCssClassDeposit('nav-link');
      setCssClassWithdraw('nav-link');
      setCssClassAllData('nav-link');
    }
  
    return ( // This returns the JSX code for the navigation bar.
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={navBarStyle}> {/* Changes the appearance of the navigation bar */}
        <a className="navbar-brand" href="#"> Bank of Zod {/* Creates the navigation bar brand */}</a>
        <button /* Creates the navigation bar button */
          className="navbar-toggler" /* Changes the appearance of the navigation bar button */
          type="button" /* Sets the type of the navigation bar button */
          data-toggle="collapse" /* Enables the collapsible behavior of the navbar when screen size is reduced */
          data-target="#navbarNav" /* Specifies which element will be collapsed or expanded when the button is clicked */
          aria-controls="navbarNav" /* Used for accessibility, reads aloud what the button does for visually impaired users */
          aria-expanded="false" /* Indicates that the collapsible content is currently collapsed */
          aria-label="Toggle navigation" /* Provides a description for screen readers to help with accessibility */
        ><span className="navbar-toggler-icon"></span>
        </button>{/* Ends the navigation bar button */}
        <div className="collapse navbar-collapse" id="navbarNav">{/* The container that holds the collapsible items */}
          <ul className="navbar-nav">{/* Creates the navigation bar list */}
            <li className="nav-item"> {/* Creates the navigation bar item Home */}
              <a
                className={cssClass} // Calls the handleNavBarHighlight function and passes the link as an argument
                href="#/CreateAccount/" // Sets the link for the navigation bar item
                onClick={() => { resetNavLinkClasses(); setCssClass('nav-link active'); }} // Sets the CSS class for the navigation bar item
                title="Create a new bank account" // Added title attribute for the tooltip
              >
                Create Account
              </a>
            </li>{/* Creates the navigation bar item Create Account */}
            <li className="nav-item">
              <a
                className={cssClassDeposit} // Calls the handleNavBarHighlight function and passes the link as an argument 
                href="#/deposit/" // Sets the link for the navigation bar item
                onClick={() => { resetNavLinkClasses(); setCssClassDeposit('nav-link active'); }}
                title="Make a deposit into your account" // Added title attribute for the tooltip
              >
                Deposit
              </a>
            </li>{/* Creates the navigation bar item Deposit */}
            <li className="nav-item">
              <a
                className={cssClassWithdraw} // Calls the handleNavBarHighlight function and passes the link as an argument
                href="#/withdraw/" // Sets the link for the navigation bar item
                onClick={() => { resetNavLinkClasses(); setCssClassWithdraw('nav-link active'); }}
                title="Withdraw money from your account" // Added title attribute for the tooltip
              >
                Withdraw
              </a>
            </li>{/* Creates the navigation bar item Withdraw */}
            <li className="nav-item">
              <a
                className={cssClassAllData} // Calls the handleNavBarHighlight function and passes the link as an argument
                href="#/alldata/" // Sets the link for the navigation bar item
                onClick={() => { resetNavLinkClasses(); setCssClassAllData('nav-link active'); }}
                title="View all bank data" // Added title attribute for the tooltip
              >
                AllData
              </a>
            </li>{/* Creates the navigation bar item AllData */}
          </ul>{/* Ends the navigation bar list */}
        </div>{/* Ends the collapsible items container */}
      </nav>/* Ends the navigation bar */
    );
  } // This ends the NavBar function.
  