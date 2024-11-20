import { gql } from "@apollo/client";

export const GetAuthors = gql`
  query ($limit: Int, $offset: Int, $name: String, $born_year: String) {
    authors(
      limit: $limit
      offset: $offset
      name: $name
      born_year: $born_year
    ) {
      data {
        id
        name
        born_date
      }
      count
    }
  }
`;

export const GetAuthorById = gql`
  query ($id: ID!) {
    author(id: $id) {
      id
      name
      biography
      born_date
    }
  }
`;

export const AddAuthor = gql`
  mutation ($name: String!, $born_date: String!, $biography: String!) {
    addAuthor(name: $name, born_date: $born_date, biography: $biography) {
      id
      name
      born_date
      biography
    }
  }
`;

export const UpdateAuthor = gql`
  mutation (
    $id: ID!
    $name: String!
    $born_date: String!
    $biography: String!
  ) {
    updateAuthor(
      id: $id
      name: $name
      born_date: $born_date
      biography: $biography
    ) {
      id
      name
      born_date
      biography
    }
  }
`;

export const DeleteAuthor = gql`
  mutation ($id: ID!) {
    removeAuthor(id: $id) {
      id
    }
  }
`;
