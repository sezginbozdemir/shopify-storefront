import { useState, useEffect } from "react";
import { fetchProducts } from "../ProductApi";
import { Product } from "../types";

export const useProducts = (filters: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const products = await fetchProducts(filters);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsError("Error while fetching products");
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, [filters]);
  return { products, productsError, productsLoading };
};
