import { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";

interface CartProps {
  customerId: string;
  cartItems?: CartLineInput[];
}

export default CartProps;
