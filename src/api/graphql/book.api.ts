import { gql } from "@apollo/client";

export const GetBooks = gql`
  query (
    $limit: Int
    $offset: Int
    $title: String
    $published_date: String
    $author_name: String
  ) {
    books(
      limit: $limit
      offset: $offset
      title: $title
      published_date: $published_date
      author_name: $author_name
    ) {
      data {
        id
        title
        description
        published_date
        author {
          name
        }
      }
      count
    }
  }
`;

export const GetBookById = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      title
      description
      published_date
      author {
        name
      }
    }
  }
`;

export const AddBook = gql`
  mutation (
    $title: String!
    $published_date: String!
    $description: String!
    $author_id: ID!
  ) {
    addBook(
      title: $title
      published_date: $published_date
      description: $description
      author_id: $author_id
    ) {
      id
      title
      description
      published_date
    }
  }
`;

export const UpdateBook = gql`
  mutation (
    $id: ID!
    $title: String!
    $published_date: String!
    $description: String!
    $author_id: ID!
  ) {
    updateBook(
      id: $id
      title: $title
      published_date: $published_date
      description: $description
      author_id: $author_id
    ) {
      id
      title
      description
      published_date
    }
  }
`;

export const DeleteBook = gql`
  mutation ($id: ID!) {
    removeBook(id: $id) {
      id
    }
  }
`;
