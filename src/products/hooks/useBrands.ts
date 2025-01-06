import { useState, useEffect } from "react";
import { fetchAllBrands } from "../ProductsApi";

export const useBrands = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const [brandsLoading, setBrandsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBrands = async () => {
      setBrandsLoading(true);
      try {
        const brands = await fetchAllBrands();
        setBrands(brands);
      } catch (error) {
        console.error("Error while fetching brands:", error);
        setBrandsError("Error while fetching brands");
      } finally {
        setBrandsLoading(false);
      }
    };
    loadBrands();
  }, []);

  return { brands, brandsLoading, brandsError };
};
