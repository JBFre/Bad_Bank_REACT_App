import React from 'react';
import Card from './Card';
import Zod from '../assets/zod.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <Card
      bgcolor="dark"
      txtcolor="black"
      header={<h1 style={{ fontSize: '35px', textShadow: '4px 4px 8px rgba(0, 0, 0, .5)' }}>Kryptonian Banking</h1>}
      title={<h2 style={{ fontSize: '28px', textShadow: '4px 4px 8px rgba(0, 0, 0, .5)' }}>Welcome to the Bank of Zod</h2>}
      text={<p style={{ fontSize: '23px', textShadow: '4px 4px 8px rgba(0, 0, 0, .5)' }}>In Zod We Trust</p>}
      body={
        <>
          <img src={Zod} className="img-fluid" alt="Image" />
        </>
      }
    />
  );
};



