import gql from "graphql-tag";

export const QUERY_FILES = gql`
query Folders {
  folders {
    id
    name
    type
    subfolders
  }
}
`;
