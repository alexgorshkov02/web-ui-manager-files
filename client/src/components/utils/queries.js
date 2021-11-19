import gql from "graphql-tag";

export const QUERY_FILES = gql`
  query Query {
    files {
      path
    }
  }
`;
