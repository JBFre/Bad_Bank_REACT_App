import React from 'react';
import Card from './Card';
import Logo from '../assets/bank.png';


export default function Home(){
    return (
      <Card
        bgcolor="secondary"
        txtcolor="white"
        header="BadBank Landing Module"
        title="Welcome to the Bank of Zod"
        text="You can move around using the navigation bar."
        body={(<img src={Logo} className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
  }