import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button.jsx'
import CartContext from '../context/CartContext.jsx'
import UserProgressContext from '../context/UserProgressContext.jsx'
function Header() {
  const {items} = useContext(CartContext);
  const {showCart} = useContext(UserProgressContext);
  const totalCount = items.reduce((totalNumOfItem,item)=>{
    return  totalNumOfItem + item.quantity;
  },0)

  return (
    <header id='main-header'>
        <div id='title'>
            <img src={logo} alt="" />
            <h1>Food Shop</h1>
        </div>
        <nav>
          <Button onClick={()=>showCart()} textOnly={true}>Cart ({totalCount})</Button>
        </nav>
    </header>
  )
}

export default Header