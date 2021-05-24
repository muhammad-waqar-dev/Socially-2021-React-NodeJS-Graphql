import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";

import DeleteButton from "../components/DeleteButton";

const CommentCard = ({
  postId,
  userData,
  comment: { id, username, body, createdAt },
}) => {
  return (
    <Card fluid>
      <Card.Content>
        {userData && userData.username === username && (
          <DeleteButton postId={postId} commentId={id} />
        )}
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
    </Card>
  );
};
export default CommentCard;
