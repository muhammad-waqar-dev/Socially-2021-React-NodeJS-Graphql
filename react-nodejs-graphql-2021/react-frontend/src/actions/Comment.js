import gql from "graphql-tag";

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
