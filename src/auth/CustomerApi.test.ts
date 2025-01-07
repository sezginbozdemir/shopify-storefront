import { describe, it, expect, vi, afterEach } from "vitest";
import {
  AccessTokenFormData,
  AccessTokenResponse,
  CustomerFormData,
  CustomerCreateResponse,
} from "./types";
import { createAccessToken, createCustomer } from "./CustomerApi";

vi.mock("./CustomerApi", () => ({
  createCustomer: vi.fn(),
  createAccessToken: vi.fn(),
}));

const mockCreateCustomer = vi.mocked(createCustomer);
const mockCreateAccessToken = vi.mocked(createAccessToken);

describe("customer operations", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a customer from customer data", async () => {
    const data: CustomerFormData = {
      firstName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      password: "123123",
      phone: "123123123",
      acceptsMarketing: false,
    };

    const mockResponse: CustomerCreateResponse = {
      customerCreate: {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          acceptsMarketing: data.acceptsMarketing,
        },
        customerUserErrors: [],
      },
    };

    mockCreateCustomer.mockResolvedValue(mockResponse);
    const result = await createCustomer(data);
    expect(result).toMatchObject(mockResponse);
  });

  it("should throw an error if customer data is invalid", async () => {
    const data: CustomerFormData = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      acceptsMarketing: false,
    };

    const errorResponse: CustomerCreateResponse = {
      customerCreate: {
        customer: null,
        customerUserErrors: [
          {
            field: ["email"],
            message: "Error creating customer",
            code: "INVALID_INPUT",
          },
        ],
      },
    };
    mockCreateCustomer.mockResolvedValue(errorResponse);

    const result = await createCustomer(data);
    console.log(result.customerCreate.customerUserErrors[0].message);

    expect(result).toMatchObject(errorResponse);
  });

  it("should handle access token creation", async () => {
    const validData: AccessTokenFormData = {
      email: "test@gmail.com",
      password: "validpassword",
    };

    const successResponse: AccessTokenResponse = {
      customerAccessTokenCreate: {
        customerAccessToken: {
          accessToken: "mock-token-123",
          expiresAt: "2024-12-31T23:59:59Z",
        },
        userErrors: [],
      },
    };

    mockCreateAccessToken.mockResolvedValue(successResponse);
    const successResult = await createAccessToken(validData);
    expect(successResult).toMatchObject(successResponse);

    const invalidData: AccessTokenFormData = {
      email: "",
      password: "",
    };

    const errorResponse: AccessTokenResponse = {
      customerAccessTokenCreate: {
        customerAccessToken: null as any,
        userErrors: [
          {
            field: ["email"],
            message: "Error creating access token",
          },
        ],
      },
    };

    mockCreateAccessToken.mockResolvedValue(errorResponse);
    const errorResult = await createAccessToken(invalidData);
    expect(errorResult).toMatchObject(errorResponse);
  });
});
