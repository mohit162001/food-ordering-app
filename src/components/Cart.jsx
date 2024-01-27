import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import UserProgressContext from "../context/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckOut } = useContext(UserProgressContext);
  const cartTotal = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  console.log(items);
  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              increase={() => addItem(item)}
              decrease={() => removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">Price: ${cartTotal}</p>
      <p className="modal-actions">
        <Button onClick={() => hideCart()} textOnly>
          Close
        </Button>
       {items.length>0 ? <Button onClick={()=>showCheckOut()}>Go to Checkout</Button>:null}
      </p>
    </Modal>
  );
}

export default Cart;
