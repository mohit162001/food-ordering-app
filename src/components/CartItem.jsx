import React from 'react'

function CartItem({name,quantity,price,increase,decrease}) {

    return (
    <li className='cart-item'>
        <p>
            {name} - {quantity} x {price}
        </p>
        <p className="cart-item-actions">
            <button onClick={decrease}>-</button>
            <span>{quantity}</span>
            <button onClick={increase}>+</button>
        </p>

    </li>
  )
}

export default CartItem