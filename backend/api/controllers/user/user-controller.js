const userModel = require("../../../database/facade/models/user/user");
const refeshTokenModel = require("../../../database/facade/models/user/refeshToken");
const generateToken = require("../../../utils/generateToken");
const jwt = require("jsonwebtoken");
const encrypted = require("bcryptjs");

async function getUserInfo(req, res) {
  try {
    const [data] = await userModel.getUserInfo();
    res.json(data);
  } catch (error) {
    res.status(500).send();
  }
}

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    // all field required
    if (!name || !email || !password) {
      res.status(400).send("all field are required");
    }
    // check if email was used before
    const oldUser = await userModel.findUserEmail({
      email: email.toLowerCase(),
    });
    if (oldUser[0].length) {
      return res
        .status(409)
        .send("this email has already asigned to an account");
    }
    // encrypted password
    const encryptedPassword = await encrypted.hash(password, 10);
    // create new user
    const [data] = await userModel.signUp({
      ...req.body,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    // create token: access token and refesh token
    const refesh_token = generateToken.refesh_token({
      id: data.insertId,
      email,
    });
    const access_token = generateToken.access_token({
      id: data.insertId,
      email,
    });
    // get new user infomation
    const [UserInfo] = await userModel.getOneUserInfo({ id: data.insertId });

    //save refesh token
    await refeshTokenModel.createRefeshToken({
      refesh_token: refesh_token,
      initial_date: Date.now(),
    });
    res.status(200).json({
      id: data.insertId,
      name: UserInfo[0].name,
      email: UserInfo[0].email,
      refesh_token,
      access_token,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // check fields validation
    if (!email || !password) res.status(400).send("all field are required");
    // check if email exist or not
    const [oldUser] = await userModel.findUserEmail({
      email: email.toLowerCase(),
    });
    if (!Boolean(oldUser.length)) {
      return res.status(409).send("your email or password is not correct");
    }
    // check if email and password are correct or not
    const [data] = await userModel.findUserEmail({ email }); // get password by req's email
    const isCorrectPassword = await encrypted.compare(
      password,
      data[0].password
    );
    if (!isCorrectPassword)
      return res.status(400).send({ message: "password is not correct" });
    if (data[0] && isCorrectPassword) {
      console.log(data[0]);
      //create token
      const refesh_token = generateToken.refesh_token({
        id: data[0].id,
        email,
      });
      const access_token = generateToken.access_token({
        id: data[0].id,
        email,
      });
      delete data[0].password;
      res.status(200).send({ ...data[0], access_token, refesh_token });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = {
  getUserInfo,
  signUp,
  login,
};
