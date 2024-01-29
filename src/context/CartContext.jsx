import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
});

function cartReducer(state,action){
    if(action.type==='add_item'){
        const existingCartItemIndex = state.items.findIndex(
            (item)=>{
                return item.id === action.item.id
            }
        )
        const updatedItems = [...state.items];

        if(existingCartItemIndex>-1){
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity+1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push({...action.item, quantity:1});
        }
        return {...state, items: updatedItems};
    }
    if(action.type==='remove_item'){
        const existingCartItemIndex = state.items.findIndex(
            (item)=>{
                return item.id ===action.id
            }
        )
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items]
        if(existingCartItem.quantity ===1){
            const updatedItems = [...state.items];
            updatedItems.splice(existingCartItemIndex,1);
        }else{
            const updatedItem = {
                ...existingCartItem,
                quantity:existingCartItem.quantity -1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state,items:updatedItems}
    }
    if(action.type === 'clear_cart'){
        return {...state,items:[]}
    }
    return state;
}

export function CartContextProvider({children}) {
  const [cart,dispatchCartAction] = useReducer(cartReducer,{items:[]});
  
  function addItem(item){
    dispatchCartAction({type:'add_item',item:item});
  }
  function removeItem(id){
    dispatchCartAction({type:'remove_item',id:id});
  }
  function clearCart(){
    dispatchCartAction({type:'clear_cart'})
  }
  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  }

  return (
    <CartContext.Provider value={cartContextValue}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContext; 