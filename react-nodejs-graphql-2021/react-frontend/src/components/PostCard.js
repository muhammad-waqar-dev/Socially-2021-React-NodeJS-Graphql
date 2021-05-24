import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import MyPopup from "./MyPopup";
function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const { userState } = state;
  const { userData } = userState;
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="left"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton userData={userData} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/post/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>

        {userData && userData.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
