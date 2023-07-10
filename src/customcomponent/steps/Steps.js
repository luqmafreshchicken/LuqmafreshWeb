

import React from 'react'
import './steps.css'
const Steps = ({img1, img2, img3}) => {
  return (
    <div className='steps_container'>
      <div className='choose_address'>
       <img src={img1} height='25px' width='25px'/>
       <p>Billing Information</p>
      </div>
      {/* line */}
      <div className='verticle_line'></div>
      {/* end line */}
      <div className='choose_address'>
      <img src={img2}  height='25px' width='25px'/>
      <p>Delivery Summary</p>
     </div>
       {/* line */}
       <div className='verticle_line'></div>
       {/* end line */}
       <div className='choose_address'>
       <img src={img3}  height='25px' width='25px'/>
       <p>Payment Methods</p>
      </div>

    </div>
  )
}

export default Steps
