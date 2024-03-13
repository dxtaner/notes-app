const User = require("../models/user");

async function checkIfUserExists(email) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      userExists: true,
      error: "User with this email already exists",
    };
  }

  return {
    userExists: false,
  };
}

module.exports = { checkIfUserExists };
