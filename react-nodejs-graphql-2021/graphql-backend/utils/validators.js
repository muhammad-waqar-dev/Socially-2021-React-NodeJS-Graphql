module.exports.validateRegisterInput = ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regex)) {
      errors.email = "Email address not valid";
    }
  }

  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "confirm password must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else {
    if (password !== confirmPassword) {
      errors.password = "Both password must be matched";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateLoginInput = ({ username, password }) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
