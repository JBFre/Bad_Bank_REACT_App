import React from 'react';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllData() {
  const ctx = React.useContext(UserContext);
  const users = ctx.users;

  const usersRows = users.map((element, index) => (
    <tr key={index}>
      <td style={{ backgroundColor: '#9FA6B2', color: 'rgb(255, 255, 255)' }}>{element.name}</td>
      <td style={{ backgroundColor: '#9FA6B2', color: 'rgb(255, 255, 255)' }}>{element.email}</td>
      <td style={{ backgroundColor: '#9FA6B2', color: 'rgb(255, 255, 255)' }}>{element.password}</td>
      <td style={{ backgroundColor: '#9FA6B2', color: 'rgb(255, 255, 255)' }}>{element.balance}</td>
    </tr>
  ));



  return (
    <>
    <h5 style={{ color: 'black', fontSize: '40px', backgroundColor: 'lightgray', padding: '5px', display: 'inline-block' }}>AllData</h5>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#332D2D', color: 'rgb(255, 255, 255)' }}>Name</th>
            <th style={{ backgroundColor: '#332D2D', color: 'rgb(255, 255, 255)' }}>Email</th>
            <th style={{ backgroundColor: '#332D2D', color: 'rgb(255, 255, 255)' }}>Password</th>
            <th style={{ backgroundColor: '#332D2D', color: 'rgb(255, 255, 255)' }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {usersRows}
        </tbody>
      </table>
    </>
  );
}
