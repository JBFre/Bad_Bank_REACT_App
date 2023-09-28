import React from 'react';
import Card from './Card';
import Logo from '../assets/bank.png';
//import '../App.css'; // Import the App.css file
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="BadBank Landing Module"
      title="Welcome to the Bank of Zod"
      text="Krypton's most trusted bank"
      body={(<img src={Logo} className="img-fluid" alt="Responsive image" />)}
    />
  );
};