import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { LIKE_POST } from "../actions/Like";
import { useMutation } from "@apollo/react-hooks";
import MyPopup from "./MyPopup";

const LikeButton = ({ userData, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (
      userData &&
      likes &&
      likes.find((like) => like.username === userData.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userData, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likeButton = userData ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <MyPopup content={liked ? "UnLike" : "Like"}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

export default LikeButton;
