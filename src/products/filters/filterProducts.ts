import { Product } from "../types";

const filterProducts = (
  products: Product[],
  selectedOptions: Record<string, string[]>,
  isFiltered: boolean,
  isDiscount: boolean
): Product[] => {
  return products.filter((product) => {
    const matchesCompareAtPrice =
      !isDiscount ||
      product.variants.edges?.some(
        (variant) => variant.node.compareAtPrice != null
      );

    const matchesAvailability =
      !isFiltered || product.availableForSale === true;

    const matchesOptions = Object.entries(selectedOptions).every(
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

    return matchesAvailability && matchesOptions && matchesCompareAtPrice;
  });
};

export default filterProducts;
