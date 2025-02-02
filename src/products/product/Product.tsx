import React from "react";
import "./product.css";
import { Product as ProductType } from "../types";
import CartLinesAdd from "../../cart/queries/CartLinesAdd.gql";
import { getStorefrontApiClient } from "../../api/storefront";

interface ProductProps {
  product: ProductType;
  setCart: React.Dispatch<React.SetStateAction<any>>;
}

const Product: React.FC<ProductProps> = ({ product, setCart }) => {
  const client = getStorefrontApiClient();
  const handleAddToCart = async () => {
    if (!variant || product.totalInventory <= 0) return;

    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        return;
      }

      const response = await client.request(CartLinesAdd.loc.source.body, {
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: variant.id,
              quantity: 1,
              attributes: [
                {
                  key: "title",
                  value: product.title,
                },
              ],
            },
          ],
        },
      });
      console.log("Cart response after adding item:", response.data);
      setCart(response.data.cartLinesAdd.cart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const { edges: variantEdges } = product.variants;
  const variant = variantEdges[0]?.node;
  const hasCompareAtPrice = variant?.compareAtPrice;

  const percentageOff = hasCompareAtPrice
    ? Math.round(
        ((Number(variant.compareAtPrice.amount) -
          Number(variant.price.amount)) /
          Number(variant.compareAtPrice.amount)) *
          100
      )
    : null;

  return (
    <div className="product-card">
      <div className="image-container">
        {percentageOff && (
          <span className="sale-tag">{percentageOff}% OFF</span>
        )}
        <img
          src={product.images?.edges[0]?.node?.url}
          alt={product.images?.edges[0]?.node?.alt}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <div className="product-vendor">{product.vendor}</div>
        <h4 className="product-title">{product.title}</h4>
        <div className="product-price-section">
          <h4 className="product-price">
            {variant?.price.currencyCode}
            {variant?.price.amount}
            {hasCompareAtPrice && (
              <span className="product-compare-price">
                {variant.compareAtPrice.currencyCode}
                {variant.compareAtPrice.amount}
              </span>
            )}
          </h4>
        </div>
        <p className="product-inventory">{product.totalInventory} left</p>
        <div className="product-collections">
          <div className="collections-tags">
            {product.collections?.edges.map((edge) => (
              <span key={edge.node.id} className="collection-tag">
                {edge.node.title}
              </span>
            ))}
          </div>
        </div>
        <div className="add-to-cart">
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!variant || product.totalInventory <= 0}
          >
            {product.totalInventory <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
