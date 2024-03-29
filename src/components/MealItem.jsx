import React, { useContext } from 'react'
import Button from './UI/Button.jsx'
import CartContext from '../context/CartContext.jsx'

function MealItem({meal}) {
  const {addItem} = useContext(CartContext)

  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
            <h3>{meal.name}</h3>
            <p className='meal-item-price'>$ {meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={()=>addItem(meal)}>Add to Cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem