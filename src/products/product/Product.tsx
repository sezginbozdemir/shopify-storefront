import React from "react";
import "./product.css";
import { Product as ProductType } from "../types";

interface ProductProps {
  product: ProductType;
  setCartItems: React.Dispatch<
    React.SetStateAction<Array<{ merchandiseId: string; quantity: number }>>
  >;
}

const Product: React.FC<ProductProps> = ({ product, setCartItems }) => {
  const handleAddToCart = () => {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex(
        (item) => item.merchandiseId === variant.id
      );

      if (itemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[itemIndex].quantity += 1;
        return updatedCartItems;
      }

      return [...prevCartItems, { merchandiseId: variant.id, quantity: 1 }];
    });
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
