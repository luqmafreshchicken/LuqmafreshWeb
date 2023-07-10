import React from 'react'
import "./button.css";

const Button = ({onclick}) => {
  return (
    <div className='submit_btn'>
    <div className='save_btn_btn' onClick={onclick}>
      <p>Save & Proceed</p>
    </div>
    </div>
  )
}

export default Button
