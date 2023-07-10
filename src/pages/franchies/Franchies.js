import React from 'react'
import "./franchies.css";
import Header from '../../component/header/Header';
import { useEffect } from 'react';

const Franchies = () => {
    useEffect(()=>(
        window.scrollTo(0, 0)
    ))
  return (
    <div>
      <Header/>
      <div className='affliate_heading'>
      <h1>For Franchies</h1>
      <p>Coming Soon</p>
      </div>
    </div>
  )
}

export default Franchies
