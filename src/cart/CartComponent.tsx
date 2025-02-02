import { useEffect, useState } from "react";
import { getStorefrontApiClient } from "../api/storefront";
import CartCreate from "./queries/CartCreate.gql";
import RetrieveCart from "./queries/RetrieveCart.gql";

interface CartProps {
  customerAccessToken: string;
  setCart: React.Dispatch<React.SetStateAction<any>>;
  cart: any;
}

const CartComponent: React.FC<CartProps> = ({
  cart,
  setCart,
  customerAccessToken,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const client = getStorefrontApiClient();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = localStorage.getItem("cartId");

        if (cartId && !cart) {
          const existingCart = await client.request(
            RetrieveCart.loc.source.body,
            {
              variables: { id: cartId },
            }
          );

          if (existingCart.data.cart) {
            setCart(existingCart.data.cart);
          }
          return;
        }

        if (!cartId) {
          const newCart = await client.request(CartCreate.loc.source.body, {
            variables: {
              input: {
                buyerIdentity: { customerAccessToken },
              },
            },
          });

          const newCartId = newCart.data?.cartCreate.cart?.id;
          if (newCartId) {
            localStorage.setItem("cartId", newCartId);
            setCart(newCart.data?.cartCreate.cart);
          }
        }
      } catch (error) {
        console.error("Error fetching or creating the cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [customerAccessToken]);

  return isLoading ? (
    <div className="cart">Creating or retrieving cart for customer...</div>
  ) : cart && cart.lines.edges.length > 0 ? (
    <div id={cart.id} className="cart">
      <ol>
        {cart.lines.edges.map(({ node }) => {
          const titleAttribute = node.attributes.find(
            (attr) => attr.key === "title"
          );
          return (
            <li key={node.id}>
              {`${titleAttribute?.value || "Unnamed Item"} (${
                node.cost.amountPerQuantity.amount
              } ${node.cost.amountPerQuantity.currencyCode} x ${
                node.quantity
              })`}
            </li>
          );
        })}
      </ol>
      <p className="cost">{`${cart.cost.totalAmount.amount} ${cart.cost.totalAmount.currencyCode}`}</p>
    </div>
  ) : (
    <p className="empty-cart">No items in cart.</p>
  );
};

export default CartComponent;
