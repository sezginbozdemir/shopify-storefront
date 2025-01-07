import { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { useBrands } from "../hooks/useBrands";
import { useProducts } from "../hooks/useProducts";
import filterProducts from "./filterProducts";
import "./filters.css";
import { apiFormatter } from "./apiFormatter";
import getOptions from "./getOptions";

export interface FiltersProps {
  filtersVisible: boolean;
  setFilteredProducts: any;
}

function Filters({ filtersVisible, setFilteredProducts }: FiltersProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filters, setFilters] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const { brands } = useBrands();
  const { products } = useProducts(filters);

  useEffect(() => {
    setFilteredProducts(
      filterProducts(products, selectedOptions, isFiltered, isDiscount)
    );
  }, [products, selectedOptions, isFiltered, isDiscount]);

  useEffect(() => {
    setFilters(apiFormatter(priceRange, selectedBrands));
  }, [selectedBrands, priceRange, selectedOptions]);

  useEffect(() => {
    setOptions(getOptions(products));
  }, [products]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(
          (selectedBrand) => selectedBrand !== brand
        );
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions((prevOptions) => {
      const currentValues = prevOptions[optionName] || [];
      const updatedValues = currentValues.includes(optionValue)
        ? currentValues.filter((value) => value !== optionValue)
        : [...currentValues, optionValue];

      if (updatedValues.length === 0) {
        const { [optionName]: _, ...rest } = prevOptions;
        return rest;
      }

      return {
        ...prevOptions,
        [optionName]: updatedValues,
      };
    });
  };

  return (
    <div
      className={`filters-container ${filtersVisible ? "filters-visible" : ""}`}
    >
      <div className="available-filter">
        <h3 className="brand-header">Available for Sale</h3>
        <div className="available-check">
          <div className="brand-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isFiltered}
                onChange={() => setIsFiltered(!isFiltered)}
              />{" "}
              In Stock
            </label>
          </div>
        </div>
      </div>
      <div className="sale-filter">
        <h3 className="brand-header">Discount</h3>
        <div className="sale-check">
          <div className="brand-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isDiscount}
                onChange={() => setIsDiscount(!isDiscount)}
              />{" "}
              In Discount
            </label>
          </div>
        </div>
      </div>

      <div className="price-filter">
        <h3 className="brand-header">Price</h3>
        <div className="price-range">
          <ReactSlider
            min={0}
            max={500}
            step={1}
            value={priceRange}
            onAfterChange={setPriceRange}
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
            renderThumb={(props) => <div {...props}></div>}
          />
          <div className="price-values">
            <span>RON{priceRange[0]}</span>
            <span>RON{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="brand-filter">
        <h3 className="brand-header">Brand</h3>
        <div className="brands">
          {brands.map((brand) => (
            <div key={brand} className="brand-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {options &&
        Object.entries(options).map(([optionName, optionValues]) => (
          <div key={optionName} className="option-filter">
            <h3 className="brand-header">{optionName}</h3>
            <div className="options">
              {optionValues.map((value: string) => (
                <div key={value} className="brand-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        selectedOptions[optionName]?.includes(value) || false
                      }
                      onChange={() => handleOptionChange(optionName, value)}
                    />
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Filters;
