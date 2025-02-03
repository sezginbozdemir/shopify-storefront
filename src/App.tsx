import Products from "./products/Products";
import "./App.css";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import CartComponent from "./cart/CartComponent";
import { CartProvider } from "./cart/CartContext";
import { useState } from "react";

function App() {
  const [customerAccessToken, setCustomerAccesToken] = useState<string | null>(
    null
  );
  return (
    <>
      <Login setCustomerAccesToken={setCustomerAccesToken} />
      <Register />

      <CartProvider customerAccessToken={customerAccessToken}>
        <CartComponent />
        <Products />
      </CartProvider>
    </>
  );
}

export default App;
