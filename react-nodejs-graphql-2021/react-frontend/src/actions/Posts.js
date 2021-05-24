import gql from "graphql-tag";

export const GET_ALL_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
export const GET_SINGLE_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
