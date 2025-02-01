export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  acceptsMarketing: boolean;
}

export interface CustomerCreateResponse {
  customerCreate: {
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      acceptsMarketing: boolean;
    } | null;
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
}

export interface AccessTokenFormData {
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string;
      expiresAt: string;
    };
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}
export interface CustomerResponse {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
