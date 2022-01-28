import gql from "graphql-tag";

export const QUERY_FOLDERS = gql`
query Folders {
  folders {
    id
    name
    type
    subfolders
  }
}
`;
