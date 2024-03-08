var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../model/User");
const { Validator } = require("../helper/Validator");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const registerUser = async (req, res) => {
  try {
    //get all the data from frontend
    const { firstname, lastname, phone, email, password } = req.body;

    //check all the data should exist

    const validator = new Validator();
    const { getUser, inputValidation } = validator;
    const { isInputValid, msg: inputValidationMsg } = inputValidation({
      firstname,
      lastname,
      email,
      password,
      phone,
    });
    console.log(isInputValid);
    if (!isInputValid) {
      return res.status(400).json({ msg: inputValidationMsg });
    }
    //check if the user already exist or not

    const { isNewUserEntry, msg } = await getUser(email, { attempt: "signUp" });
    if (!isNewUserEntry) {
      return res.status(400).json({ msg });
    }

    //encrypt the user password
    const hashPassword = await bcrypt.hash(password, 10);
    const id = "u" + Date.now();

    // save the user data into db
    const userData = await User.create({
      id: id,
      firstname: firstname,
      lastname: lastname,
      email,
      phone,
      password: hashPassword,
    });

    //generate a token  fr user and sent it(JWT token)
    const token = jwt.sign({ id: User._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    userData.token = token;
    userData.password = undefined;
    req.session.email = email;
    res.status(200).json({
      message: "You have successfully registered!",
    });
  } catch (error) {
    console.log("Error :" + error.message);
  }
};
const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validator = new Validator();
    const { inputValidation, getUser } = validator;
    const { isInputValid, msg: inputValidationMessage } = inputValidation({
      email,
      password,
    });

    if (!isInputValid) {
      return res.status(400).json({ msg: inputValidationMessage });
    }
    //check if user exist or not
    const { userData, isNewUserEntry, msg } = await getUser(email, {
      attempt: "logIn",
    });
    if (isNewUserEntry) {
      return res.status(400).json({ msg });
    }

    //compare database password and input password
    const isPasswordValid = bcrypt.compareSync(
      password.toString(),
      userData.password.toString()
    );
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "invalid password" });
    }
    //create token
    const token = jwt.sign(
      { id: userData._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    //store cookies into the browser
    const options = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, //only manipulated by server not by the client
    };

    //send the token
    userData.token = token;
    userData.password = undefined;
    req.session.email = email;

    const firstname = userData.firstname;
    const lastname = userData.lastname;
    const phone = userData.phone;

    return res.status(200).cookie("token", token, options).json({
      firstname,
      lastname,
      email,
      phone,
      msg: "You have login successful",
      accessToken: token,
    });
    // let arr = [];
    // arr.push(userData.firstname);
    // arr.push(userData.lastname);
    // return res.status(200).cookie("token", token, options).json({ arr });
  } catch (error) {
    console.log("Error :" + error.message);
  }
};
module.exports = { registerUser, logInUser };
