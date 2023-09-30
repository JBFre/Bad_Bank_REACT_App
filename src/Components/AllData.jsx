import React from 'react';
import { UserContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllData() {
  const ctx = React.useContext(UserContext);
  const users = ctx.users;

  const usersRows = users.map((element, index) => (
    <tr key={index}>
      <td >{element.name}</td>
      <td >{element.email}</td>
      <td >{element.password}</td>
      <td >{element.balance}</td>
    </tr>
  ));



  return (
    <>
    <h5 style={{ color: 'black', fontSize: '40px' }}>AllData</h5>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {usersRows}
        </tbody>
      </table>
    </>
  );
}
