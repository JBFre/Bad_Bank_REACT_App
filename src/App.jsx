import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './Components/Context';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import CreateAccount from './Components/CreateAccount';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import AllData from './Components/AllData';

if (window.performance) {
  const navigation = performance.getEntriesByType("navigation")[0];
  if (navigation && navigation.type === "reload") {
    window.location.hash = '/';
  }
}


export default function App() {
  //const [count, setCount] = useState(0)

  return (
    <HashRouter> 
      <NavBar />
      <UserContext.Provider value={{ users: [{ name: 'Kal-El', email: 'superman@Krypton.dc', password: 'PhantomZone', balance: 500 }] }}>
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
};
