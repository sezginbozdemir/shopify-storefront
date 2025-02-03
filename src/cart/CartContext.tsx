import { createContext, useContext, useEffect, useState } from "react";
import { getStorefrontApiClient } from "../api/storefront";
import CartCreate from "./queries/CartCreate.gql";
import RetrieveCart from "./queries/RetrieveCart.gql";
import CartLinesAdd from "./queries/CartLinesAdd.gql";
import { Cart } from "@shopify/hydrogen-react/storefront-api-types";

interface CartContextType {
  cart: Cart | undefined;
  isCartLoading: boolean;
  cartError: Error | null;
  updateCart: (productId: string, title: string) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{
  children: React.ReactNode;
  customerAccessToken: string | null;
}> = ({ children, customerAccessToken }) => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState<Error | null>(null);
  const client = getStorefrontApiClient();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        if (cartId && !cart) {
          const res = await client.request(RetrieveCart.loc.source.body, {
            variables: { id: cartId },
          });
          if (res.data.cart) {
            setCart(res.data.cart);
          }
          return;
        }

        if (!cartId) {
          const res = await client.request(CartCreate.loc.source.body, {
            variables: { input: { buyerIdentity: { customerAccessToken } } },
          });
          const cartId = res.data.cartCreate.cart.id;
          if (cartId) {
            localStorage.setItem("cartId", cartId);
            setCart(res.data.cartCreate.cart);
          }
        }
      } catch (error) {
        console.error("Error fetching or creating the cart:", error);
        setCartError(
          error instanceof Error ? error : new Error("Unknown error")
        );
        setIsCartLoading(false);
      }
    };
    fetchCart();
  }, [customerAccessToken]);
  const updateCart = async (productId: string, title: string) => {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        console.error("Cart ID not found.");
        return;
      }

      const response = await client.request(CartLinesAdd.loc.source.body, {
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: productId,
              quantity: 1,
              attributes: [{ key: "title", value: title }],
            },
          ],
        },
      });

      console.log("Cart updated:", response.data);
      setCart(response.data.cartLinesAdd.cart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const clearCart = () => {
    setCart(undefined);
    localStorage.removeItem("cartId");
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoading,
        cartError,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
