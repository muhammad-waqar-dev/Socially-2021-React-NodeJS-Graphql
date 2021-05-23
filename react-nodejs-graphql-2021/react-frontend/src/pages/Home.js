import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../actions/Posts";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";

const Home = () => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const { userState } = state;
  const { userData } = userState;

  const { loading, data } = useQuery(GET_ALL_POSTS);
  const posts = data && data?.getPosts;

  return (
    <Grid style={{ paddingLeft: 40, paddingRight: 40 }}>
      <Grid.Row columns={3}>
        <Grid.Column>ADVERTISEMENT</Grid.Column>
        <Grid.Column>
          <Grid.Row
            className="page-title"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            <h1 style={{ color: "teal" }}>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            {userData && Object.keys(userData).length > 0 && (
              <Grid.Column style={{ marginBottom: 20 }}>
                <PostForm />
              </Grid.Column>
            )}
          </Grid.Row>
          <Grid.Row>
            {loading ? (
              <h1>Loading posts..</h1>
            ) : (
              <Transition.Group>
                {posts &&
                  posts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>USER LIST HERE</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
