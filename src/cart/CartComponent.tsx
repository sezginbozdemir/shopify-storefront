import { FC, useEffect, useState } from "react";
import CartProps from "./CartProps";
import { getStorefrontApiClient } from "../api/storefront";
import { Cart } from "@shopify/hydrogen-react/storefront-api-types";
import { CREATE_CART } from "./CartOperations";

const CartComponent: FC<CartProps> = ({ customerId, cartItems }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      getStorefrontApiClient()
        .request(CREATE_CART, {
          variables: {
            input: {
              buyerIdentity: { customerAccessToken: customerId },
              lines: cartItems,
            },
          },
        })
        .then((response) => setCart(response.data?.cart))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div className="cart">Creating cart for customer...</div>
  ) : cart ? (
    <div id={cart.id} className="cart">
      <ol>
        {cart.lines.nodes.map((item) => (
          <li key={item.id}>
            {`${item.attributes.find((attr) => attr.key === "name") || "item name"} (${
              item.cost.amountPerQuantity.amount
            }${item.cost.amountPerQuantity.currencyCode} x ${item.quantity})`}
          </li>
        ))}
      </ol>
      <p className="cost">{`${cart.cost.totalAmount.amount}${cart.cost.totalAmount.currencyCode}`}</p>
    </div>
  ) : (
    <p className="empty-cart">No items in cart.</p>
  );
};

export default CartComponent;
