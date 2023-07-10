import React from 'react'
import "./affliatemarket.css";
import Header from '../../component/header/Header';
import { useEffect } from 'react';

const AffliateMarket = () => {
    useEffect(()=>(
        window.scrollTo(0, 0)
    ))
  return (
    <div>
      <Header/>
      <div className='affliate_heading'>
      <h1>Affiliate</h1>
      <p>Coming Soon</p>
      </div>
    </div>
  )
}

export default AffliateMarket
