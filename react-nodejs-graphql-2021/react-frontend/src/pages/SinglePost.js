import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Icon, Label, Image, Grid } from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentCard from "../components/CommentCard";
import CreateComment from "../components/CreateComment";
import { GET_SINGLE_POST } from "../actions/Posts";

import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";
import MyPopup from "../components/MyPopup";

const SinglePost = (props) => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const { userState } = state;
  const { userData } = userState;
  const postId = props.match.params.postId;
  let templateHtml;

  const { loading, data } = useQuery(GET_SINGLE_POST, {
    variables: { postId },
  });

  const post = data && data?.getPost;

  if (loading) {
    templateHtml = <p>Loading....</p>;
  } else {
    const {
      id,
      body,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
      createdAt,
    } = post;

    const deletePostCallback = (_) => {
      props.history.push("/");
    };

    templateHtml = (
      <Grid style={{ paddingLeft: 40, paddingRight: 40 }}>
        <Grid.Row columns={3}>
          <Grid.Column>ADVERTISEMENT</Grid.Column>
          <Grid.Column>
            <Grid.Row columns={2} style={{ display: "flex" }}>
              <Grid.Column style={{ marginRight: "20px" }}>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                  className="single-post-user-img"
                  // size="small"
                  float="right"
                />
              </Grid.Column>
              <Grid.Column style={{ width: "-webkit-fill-available" }}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{body}</Card.Description>
                  </Card.Content>
                  <hr />
                  <Card.Content extra>
                    <LikeButton
                      userData={userData}
                      post={{ id, likeCount, likes }}
                    />
                    <MyPopup content="Comment on post">
                      <Button
                        as="div"
                        labelPosition="right"
                        onClick={() => console.log("Comment on post")}
                      >
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {commentCount}
                        </Label>
                      </Button>
                    </MyPopup>
                    {userData && userData.username === username && (
                      <DeleteButton postId={id} callback={deletePostCallback} />
                    )}
                  </Card.Content>
                </Card>
                {userData && <CreateComment postId={id} />}
                {comments &&
                  comments.map((comment) => (
                    <CommentCard
                      postId={id}
                      userData={userData}
                      comment={comment}
                    />
                  ))}
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>USER LIST HERE</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return templateHtml;
};
export default SinglePost;
