const { UserInputError, AuthenticationError } = require("apollo-server-errors");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check_auth");
module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "comment mus not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("post not found");
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const comment = post.comments.filter(({ id }) => id === commentId);
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (comment.length !== 0 || commentIndex !== -1) {
          if (comment[0].username === username) {
            // await Post.deleteOne({
            //   _id: postId,
            //   comments: { $in: [{ _id: commentId }] },
            // });
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("comment not found");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
