import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Card, Form } from "semantic-ui-react";

import { CREATE_COMMENT } from "../actions/Comment";
const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState("");

  const commentInputRef = useRef(null);

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  return (
    <Card fluid>
      <Card.Content>
        <p>Write your comment here...</p>
        <Form>
          <div className="ui action input fluid">
            <input
              type="text"
              placeholder="Write your comment here..."
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              ref={commentInputRef}
            />
            <button
              type="submit"
              className="ui button teal"
              disabled={comment.trim() === ""}
              onClick={createComment}
            >
              Submit
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
};
export default CreateComment;
