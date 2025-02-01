import { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductFilters from "./filters/Filters";
import Header from "./header/Header";
import Product from "./product/Product";
import "./styles.css";
import { Product as ProductType } from "./types";
interface ProductsProps {
  setCartItems: React.Dispatch<
    React.SetStateAction<Array<{ merchandiseId: string; quantity: number }>>
  >;
}

function Products({ setCartItems }: ProductsProps) {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const productsPerPage = 10;

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  console.log(filteredProducts);
  const startIndex = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const updateFilteredProducts = (products: ProductType[]) => {
    setFilteredProducts(products);
    setCurrentPage(0);
  };

  return (
    <>
      <Header toggleFilters={toggleFilters} />

      <div className="products-container">
        <div className="main-container">
          <ProductFilters
            filtersVisible={filtersVisible}
            setFilteredProducts={updateFilteredProducts}
          />
          {filteredProducts.length > 0 ? (
            <>
              <div
                className={`grid-container ${
                  filtersVisible ? "grid-with-filters" : ""
                }`}
              >
                {currentProducts.map((product) => (
                  <Product
                    key={product.id}
                    setCartItems={setCartItems}
                    product={product}
                  />
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
