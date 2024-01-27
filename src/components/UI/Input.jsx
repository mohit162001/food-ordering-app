import React from 'react'

function Input({id,type,lable}) {
  return (
    <p className='control'>
        <label htmlFor={id}>{lable}</label>
        <input id={id} type={type} name={id} required  />
    </p>
  )
}

export default Input