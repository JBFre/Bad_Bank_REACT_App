import React from 'react';
import Card from './Card';
import Zod from '../assets/zod.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Kryptonian Banking"
      title="Welcome to the Bank of Zod"
      text="In Zod We Trust"
      body={
        <>
          <img src={Zod} className="img-fluid" alt=" Image" /> 
        </>
      }
    />
  );
};
