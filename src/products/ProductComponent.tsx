import { useState, useEffect } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductFilters from "./ProductFilters";
import "./products.css";
import { Product } from "./types";

function ProductComponent() {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const { products } = useProducts(filters);
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      return Object.entries(selectedOptions).every(
        ([filterKey, filterValues]) => {
          if (filterValues.length === 0) return true;

          const matchingOption = product.options?.find(
            (option) => option.name === filterKey
          );

          return matchingOption?.values?.some((value: string) =>
            filterValues.includes(value)
          );
        }
      );
    });
  };

  useEffect(() => {
    setFilteredProducts(filterProducts(products));
  }, [products, selectedOptions]);
  return (
    <>
      <div className="products-topbar">
        <div className="filters-bar">
          <button className="filter-button" onClick={toggleFilters}>
            Filters
          </button>
          <button className="filter-button">Sort by</button>
        </div>
        <div className="view-as-bar">
          <button className="view-as-button">View as</button>
        </div>
      </div>

      <div className="products-container">
        <div className="main-container">
          <ProductFilters
            filtersVisible={filtersVisible}
            onFiltersChange={setFilters}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          {products.length > 0 ? (
            <div
              className={`grid-container ${
                filtersVisible ? "grid-with-filters" : ""
              }`}
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
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
                    <p className="product-inventory">
                      {product.totalInventory} left
                    </p>

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
                      <button className="add-to-cart-button">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="products-empty">No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductComponent;
