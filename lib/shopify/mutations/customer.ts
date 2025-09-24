export const customerCreateMutation = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        email
        acceptsMarketing
      }
      userErrors {
        field
        message
      }
    }
  }
`;