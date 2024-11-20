import { gql } from "@apollo/client";

export const CreateReview = gql`
  mutation ($name: String!, $rating: Int!, $review: String!, $book_id: ID!) {
    addReview(
      name: $name
      rating: $rating
      review: $review
      book_id: $book_id
    ) {
      name
      rating
      review
    }
  }
`;
