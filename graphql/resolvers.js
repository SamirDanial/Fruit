const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const validator = require("validator");

module.exports = {
  loginUser: async function ({ credintialInput }, req) {
    const existingUser = await User.findOne({ email: credintialInput.email });

    if (!existingUser) {
      const error = new Error('User not found');
      error.data = 'Please provide a currect Email';
      error.code = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(
      credintialInput.password,
      existingUser.password
    );

    if (!isMatch) {
      const error = new Error('Password is not correct');
      error.data = 'Please provide a currect Password';
      error.code = 401;
      throw error;
    }

    let authToken;

    await Token(existingUser.id)
      .then((token) => {
        authToken = token;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return {
      ...existingUser._doc,
      token: authToken,
      id: existingUser._id.toString(),
    };
  },

  createUser: async function ({ userInput }, req) {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email is invalid." });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "Password is too short" });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid Input')
      error.data = errors;
      error.code = 402;
      throw error
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      error.data = errors;
      error.code = 402;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(userInput.password, salt);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();

    let authToken;

    await Token(user.id)
      .then((token) => {
        authToken = token;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return {
      ...createdUser._doc,
      token: authToken,
      id: createdUser._id.toString(),
    };
  },
};

function Token(id) {
  const payload = {
    user: {
      id: id,
    },
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.get("jwtFrutSecret"),
      { expiresIn: "5y" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
