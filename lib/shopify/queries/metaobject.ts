export const getMetaObjectQuery = /* GraphQL */ `
  query getMetaObject($id: ID!) {
    metaobject(id: $id) {
      fields{
        key,
        jsonValue,
        type
      }
    }
  }
`;
