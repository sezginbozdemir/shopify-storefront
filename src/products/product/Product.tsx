import React from "react";
import "./product.css";
import { Product as ProductType } from "../types";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={product.images?.edges[0]?.node?.url}
          alt={product.images?.edges[0]?.node?.alt}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <div className="product-vendor">{product.vendor}</div>
        <h4 className="product-title">{product.title}</h4>
        <h4 className="product-price">
          {product.variants.edges[0].node.price.currencyCode}
          {product.variants.edges[0].node.price.amount}
        </h4>
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
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
