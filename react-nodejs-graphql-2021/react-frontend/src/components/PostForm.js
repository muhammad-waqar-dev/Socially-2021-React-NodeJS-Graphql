import React, { useContext, useState } from "react";
import { Button, Card, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { CREATE_POST, GET_ALL_POSTS } from "../actions/Posts";

const PostForm = () => {
  const [error, setErrors] = useState("");

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      //comapare and get data from cache of get all posts query
      const data = proxy.readQuery({
        query: GET_ALL_POSTS,
      });
      const newAllData = {
        getPosts: [result.data.createPost, ...data.getPosts],
      };
      proxy.writeQuery({ query: GET_ALL_POSTS, data: { ...newAllData } });
      values.body = "";
    },
    onError(err) {
      //console.log("errr", err.graphQLErrors[0].message);
      setErrors(err.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Card fluid>
      <Card.Content extra>
        <Form onSubmit={onSubmit}>
          <h2>Create a Post:</h2>
          <Form.Field>
            <Form.TextArea
              type="text"
              placeholder="what is your mind...."
              name="body"
              onChange={onChange}
              value={values.body}
              error={error.length > 0 ? true : false}
              style={{ marginBottom: 20 }}
            />
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form.Field>
        </Form>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li key={error}>{error}</li>
            </ul>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};
export default PostForm;
