import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../context/UserProgressContext";
import useHttp from "../Hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function CheckOut() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckOut } = useContext(UserProgressContext);

  const {
    error,
    data,
    isLoading: isSending,
    sendResquest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(data);
    sendResquest(JSON.stringify({
      order:{
        items:items,
        customer : customerData
      }
    }))
  }

  function handleFinish(){
    hideCheckOut()
    clearCart()
    clearData()
  }

  let actions = (
    <>
      <Button type="button" textOnly={true} onClick={hideCheckOut}>
        Close
      </Button>
      <Button >Submit</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Order Data...</span>;
  }

  if(data && !error){
    return <Modal open={progress==='checkout'}>
      <h2>Success!</h2>
      <p>Your order submitted successfully</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }
  return (
    <Modal
      open={progress === "checkout"}
      onClose={progress === "checkout" ? hideCheckOut : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total amount: ${cartTotal} </p>

        <Input lable="full name" type="text" id="name" />
        <Input lable="E-mail" type="email" id="email" />
        <Input lable="Address" type="text" id="street" />
        <div className="control-row">
          <Input lable="Postal Code" type="number" id="postal-code" />
          <Input lable="City" type="text" id="city" />
        </div>

       
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default CheckOut;
