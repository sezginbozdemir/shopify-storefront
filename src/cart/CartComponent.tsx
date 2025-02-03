import { useCart } from "./CartContext";

const CartComponent: React.FC = () => {
  const { cart, isCartLoading } = useCart();

  return isCartLoading ? (
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
