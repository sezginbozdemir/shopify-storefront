import { ClientResponse } from "@shopify/storefront-api-client";
import { getStorefrontApiClient } from "../api/storefront";
import CustomerCreate from "./queries/CustomerCreate.gql";
import CustomerAccessCreate from "./queries/CustomerAccessCreate.gql";
import {
  CustomerFormData,
  CustomerCreateResponse,
  AccessTokenFormData,
  AccessTokenResponse,
} from "./types";

export const createCustomer = async (
  customerData: CustomerFormData
): Promise<CustomerCreateResponse> => {
  const client = getStorefrontApiClient();
  try {
    const response: ClientResponse<CustomerCreateResponse> =
      await client.request(CustomerCreate.loc.source.body, {
        variables: {
          input: {
            ...customerData,
          },
        },
      });
    return response.data!;
  } catch (err) {
    throw new Error("Error creating customer");
  }
};

export const createAccessToken = async (
  tokenData: AccessTokenFormData
): Promise<AccessTokenResponse> => {
  const client = getStorefrontApiClient();
  try {
    const response: ClientResponse<AccessTokenResponse> = await client.request(
      CustomerAccessCreate.loc.source.body,
      {
        variables: {
          input: {
            email: tokenData.email,
            password: tokenData.password,
          },
        },
      }
    );
    return response.data!;
  } catch (err) {
    throw new Error("Error creating access token");
  }
};
