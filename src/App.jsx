import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './Components/Context';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import CreateAccount from './Components/CreateAccount';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import AllData from './Components/AllData';

if (window.performance) { // Check if the window.performance object is available in the user's browser
  const navigation = performance.getEntriesByType("navigation")[0]; // Get the first entry of type "navigation" from the Performance Timeline
  if (navigation && navigation.type === "reload") { // Check if the 'navigation' entry exists and if the page was reloaded by the user
    window.location.hash = '/'; // If the current page was reloaded by the user, redirect to the homepage
  } // Ends the if statement
} // Ends the if statement


export default function App() {
  //const [count, setCount] = useState(0)

  return (
    <HashRouter> {/*Provides the router functionality*/}
      <NavBar /> {/*Displays the navigation bar*/}
      <UserContext.Provider value={{ users: [{ name: 'abel', email: 'abel@mit.edu', password: 'secret', balance: 100 }] }}> {/*Provides the user data*/}
        <div className="container" style={{ padding: "20px" }}> {/*Sets the container style*/}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div> {/*Ends the container*/}
      </UserContext.Provider> {/*Ends the user data*/}
    </HashRouter> // Ends the HashRouter
  );
};
