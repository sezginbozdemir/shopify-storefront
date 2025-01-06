export const CREATE_CART = `mutation cartCreate($input: CartInput) {
  cartCreate(input: $input) {
    cart {
      buyerIdentity
        customerAccessToken
      lines
        id
        quantity
    }
    userErrors {
      field
      message
    }
    warnings {
    }
  }
}`;
