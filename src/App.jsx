import React from "react";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { UserProgressContextProvider } from "./context/UserProgressContext.jsx";

import Cart from "./components/Cart.jsx";
import CheckOut from "./components/CheckOut.jsx";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <CheckOut/>
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
