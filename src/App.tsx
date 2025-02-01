import Products from "./products/Products";
import "./App.css";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import CartComponent from "./cart/CartComponent";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState<
    Array<{
      merchandiseId: string;
      quantity: number;
    }>
  >([]);
  const [customerAccessToken, setCustomerAccesToken] = useState<string | null>(
    null
  );
  console.log(cartItems);
  return (
    <div>
      {customerAccessToken && (
        <CartComponent
          customerAccessToken={customerAccessToken}
          cartItems={cartItems}
        />
      )}
      <Login setCustomerAccesToken={setCustomerAccesToken} />
      <Register />
      <Products setCartItems={setCartItems} />
    </div>
  );
}

export default App;
