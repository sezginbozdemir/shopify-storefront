import { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { Product } from "./types";
import { useBrands } from "./hooks/useBrands";
import { useOptions } from "./hooks/useOptions";
import { useProducts } from "./hooks/useProducts";
import "./styles.css";

export interface FiltersProps {
  filtersVisible: boolean;
  setFilteredProducts: any;
}

function Filters({ filtersVisible, setFilteredProducts }: FiltersProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filters, setFilters] = useState<string>("");

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const { brands } = useBrands();
  const { options } = useOptions();

  const { products } = useProducts(filters);

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

  useEffect(() => {
    const brandFilter =
      selectedBrands.length > 0
        ? selectedBrands.map((brand) => `vendor:'${brand}'`).join(" OR ")
        : "";

    const priceFilter = priceRange
      ? `variants.price:>=${priceRange[0]} AND variants.price:<=${priceRange[1]}`
      : "";

    const filters = [brandFilter, priceFilter].filter(Boolean).join(" AND ");
    setFilters(filters);
  }, [selectedBrands, priceRange, selectedOptions]);

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

  const handlePriceChange = (newValue: number[]) => {
    setPriceRange(newValue);
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
      <div className="price-filter">
        <h3 className="brand-header">Price</h3>
        <div className="price-range">
          <ReactSlider
            min={0}
            max={500}
            step={1}
            value={priceRange}
            onAfterChange={handlePriceChange}
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
            <h3 className="option-header">{optionName}</h3>
            <div className="options">
              {optionValues.map((value: string) => (
                <div key={value} className="option-checkbox">
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
