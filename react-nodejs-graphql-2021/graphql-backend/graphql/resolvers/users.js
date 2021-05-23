const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    //user login
    async login(_, { username, password }) {
      const { errors, valid } = await validateLoginInput({
        username,
        password,
      });
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User does not exist";
        throw new UserInputError("User does not exist", { errors });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        errors.general = "Invalid credentials";
        throw new UserInputError("Wrong Credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    //user registeration
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { errors, valid } = await validateRegisterInput({
        username,
        email,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new UserInputError("Error", { errors });
      }
      //username is unique
      const userName = await User.findOne({ username });

      if (userName) {
        throw new UserInputError("Username is taken", {
          error: {
            username: "This username already taken",
          },
        });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
