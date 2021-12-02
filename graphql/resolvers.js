const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = {
  createUser: async function ({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
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

    const payload = {
        user: {
            id: user.id
        }
    }
    
    await jwt.sign(payload, config.get('jwtFrutSecret'), { expiresIn: 360000}, (err, token) => {

        if(err) {
            throw err;
        }
        userInput.token = token;
        console.log(userInput.token)
    });

    console.log('token here')
    console.log(userInput.token)

    return { ...createdUser._doc, token: userInput.token, id: createdUser._id.toString() };

  },
};
