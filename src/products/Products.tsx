import { useState } from "react";
import ProductFilters from "./Filters";
import Header from "./Header";
import Product from "./Product";
import "./styles.css";
import { Product as ProductType } from "./types";

function Products() {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <>
      <Header toggleFilters={toggleFilters} />

      <div className="products-container">
        <div className="main-container">
          <ProductFilters
            filtersVisible={filtersVisible}
            setFilteredProducts={setFilteredProducts}
          />
          {filteredProducts.length > 0 ? (
            <div
              className={`grid-container ${
                filtersVisible ? "grid-with-filters" : ""
              }`}
            >
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
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

export default Products;
