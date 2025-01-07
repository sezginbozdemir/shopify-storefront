import {
  createStorefrontApiClient,
  StorefrontApiClient,
} from "@shopify/storefront-api-client";

let storefrontAppClient: StorefrontApiClient | undefined = undefined;

export const getStorefrontApiClient = (): StorefrontApiClient => {
  if (storefrontAppClient === undefined) {
    storefrontAppClient = createStorefrontApiClient({
      storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN!,
      apiVersion: "2025-01",
      publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    });
  }

  return storefrontAppClient;
};
