import React from 'react';
import Card from './Card';
import Logo from '../assets/bank.png';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Kryptonian Banking"
      title="Welcome to the Bank of Zod"
      text="In Zod We Trust"
      body={(<img src={Logo} className="img-fluid" alt="Responsive image" />)}
    />
  );
};