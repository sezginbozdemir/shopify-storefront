import { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductFilters from "./Filters";
import Header from "./Header";
import Product from "./Product";
import "./styles.css";
import { Product as ProductType } from "./types";

const productsPerPage = 10;

function Products() {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const startIndex = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

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
            <>
              <div
                className={`grid-container ${
                  filtersVisible ? "grid-with-filters" : ""
                }`}
              >
                {currentProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <p className="products-empty">No products available.</p>
          )}
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default Products;
