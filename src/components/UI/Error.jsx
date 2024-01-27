import React from 'react'
import error_logo from './error.png'
function Error({title,message}) {
  return (
   <div className="error-container">
    <img id='error-img' src={error_logo} alt="" />
     <div className="error">
        <h2>{title}</h2>
        <p>{message}</p>
    </div>
   </div>
  )
}

export default Error