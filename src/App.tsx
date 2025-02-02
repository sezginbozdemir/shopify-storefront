import Products from "./products/Products";
import { useEffect } from "react";
import "./App.css";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import CartComponent from "./cart/CartComponent";
import { Cart } from "@shopify/hydrogen-react/storefront-api-types";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  useEffect(() => {
    console.log("Updated Cart in App:", cart);
  }, [cart]);

  const [customerAccessToken, setCustomerAccesToken] = useState<string | null>(
    null
  );
  return (
    <div>
      {customerAccessToken && (
        <CartComponent
          cart={cart}
          setCart={setCart}
          customerAccessToken={customerAccessToken}
        />
      )}
      <Login setCustomerAccesToken={setCustomerAccesToken} />
      <Register />
      <Products setCart={setCart} />
    </div>
  );
}

export default App;
