import { useEffect, useState } from "react";
import { getStorefrontApiClient } from "../api/storefront";
import { Cart } from "@shopify/hydrogen-react/storefront-api-types";
import CartCreate from "./queries/CartCreate.gql";

import { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";

interface CartProps {
  customerAccessToken: string;
  cartItems?: CartLineInput[];
}

const CartComponent: React.FC<CartProps> = ({
  customerAccessToken,
  cartItems,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const client = getStorefrontApiClient();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      client
        .request(CartCreate.loc.source.body, {
          variables: {
            input: {
              buyerIdentity: { customerAccessToken: customerAccessToken },
              lines: cartItems,
            },
          },
        })
        .then((response) => {
          setCart(response.data?.cartCreate.cart);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [cartItems]);

  return isLoading ? (
    <div className="cart">Creating cart for customer...</div>
  ) : cart ? (
    <div id={cart.id} className="cart">
      <ol>
        {cart.lines.edges.map(({ node }) => (
          <li key={node.id}>
            {`item name (${node.cost.amountPerQuantity.amount} ${node.cost.amountPerQuantity.currencyCode} x ${node.quantity})`}
          </li>
        ))}
      </ol>
      <p className="cost">{`${cart.cost.totalAmount.amount} ${cart.cost.totalAmount.currencyCode}`}</p>
    </div>
  ) : (
    <p className="empty-cart">No items in cart.</p>
  );
};

export default CartComponent;
