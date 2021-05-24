import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { DELETE_POST, GET_ALL_POSTS } from "../actions/Posts";
import { DELETE_COMMENT } from "../actions/Comment";
import MyPopup from "./MyPopup";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const setMutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePost] = useMutation(setMutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({ query: GET_ALL_POSTS });

        const filterDeletePost = {
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        };

        proxy.writeQuery({
          query: GET_ALL_POSTS,
          data: { ...filterDeletePost },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
    onError(err) {
      console.log("errr--------------", err);
      //setErrors(err.graphQLErrors[0].message);
    },
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};
export default DeleteButton;
