import { getStorefrontApiClient } from "../api/storefront";
import { Product } from "./types";
import AllProducts from "./queries/AllProducts.gql";
import AllVendors from "./queries/AllVendors.gql";
import AllOptions from "./queries/AllOptions.gql";
const client = getStorefrontApiClient();

export const fetchProducts = async (filters?: string): Promise<Product[]> => {
  const allProducts: Product[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  try {
    while (hasNextPage) {
      const variables: any = { first: 250, filters };
      if (endCursor) variables.after = endCursor;

      const response = await client.request(AllProducts.loc.source.body, {
        variables,
      });

      const products = response.data.products.edges;
      allProducts.push(...products.map((edge: any) => edge.node));

      hasNextPage = response.data.products.pageInfo.hasNextPage;
      endCursor = response.data.products.pageInfo.endCursor;
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Unable to fetch products.");
  }

  return allProducts;
};

export const fetchAllBrands = async (): Promise<string[]> => {
  const allVendors: Set<string> = new Set();
  let hasNextPage = true;
  let endCursor: string | null = null;

  try {
    while (hasNextPage) {
      const variables: any = { first: 250 };
      if (endCursor) variables.after = endCursor;

      const response = await client.request(AllVendors.loc.source.body, {
        variables,
      });

      const products = response.data.products.edges;
      products.forEach((edge: any) => {
        allVendors.add(edge.node.vendor);
      });

      hasNextPage = response.data.products.pageInfo.hasNextPage;
      endCursor = response.data.products.pageInfo.endCursor;
    }
  } catch (err) {
    console.error("Error fetching all brands:", err);
    throw new Error("Unable to fetch all brands.");
  }

  return Array.from(allVendors);
};
