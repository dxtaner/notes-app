const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const services = require("../services/services.js");
const { validateRegistrationData } = require("../helpers/validations.js");
const { checkIfUserExists } = require("../helpers/userValidation");

exports.register = async function (req, res) {
  const { name, email, password } = req.body;

  const validation = validateRegistrationData(email, name, password);

  if (!validation.isValid) {
    return res.status(400).json({
      error: validation.error,
      success: false,
    });
  }

  try {
    const userExistsCheck = await checkIfUserExists(email);

    if (userExistsCheck.userExists) {
      return res.status(400).json({
        error: userExistsCheck.error,
        success: false,
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed. Please try again.",
      success: false,
    });
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        res.json({ token: services.createToken(user), user: user });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};
