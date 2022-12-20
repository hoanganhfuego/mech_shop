const userModel = require("../../../database/facade/models/user/user");
const generateToken = require("../../../utils/generateToken");
const encrypted = require("bcryptjs");

async function getOneUserInfo(req, res) {
  try {
    const id = req.params.id;
    const [data] = await userModel.getOneUserInfo(id);
    delete data[0].password;
    res.json(data[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getUserInfo(req, res) {
  try {
    const [data] = await userModel.getUserInfo();
    delete data[0].password;
    res.json(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
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
        .send({ message: "this email has already asigned to an account" });
    }
    // encrypted password
    const encryptedPassword = await encrypted.hash(password, 10);
    // create new user
    const [data] = await userModel.signUp({
      ...req.body,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    // create token: access token and refresh token
    const refresh_token = generateToken.refresh_token({
      id: data.insertId,
      email,
    });
    const access_token = generateToken.access_token({
      id: data.insertId,
      email,
    });
    // get new user infomation
    const [UserInfo] = await userModel.getOneUserInfo(data.insertId);
    delete UserInfo[0].password;
    res.status(200).json({ ...UserInfo[0], access_token, refresh_token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // check fields validation
    if (!email || !password) res.status(400).send("All field are required");
    // check if email exist or not
    const [oldUser] = await userModel.findUserEmail({
      email: email.toLowerCase(),
    });
    if (!Boolean(oldUser.length)) {
      return res
        .status(409)
        .send({ message: "Your email is not correct" });
    }
    // check if email and password are correct or not
    const [data] = await userModel.findUserEmail({ email }); // get password by req's email
    const isCorrectPassword = await encrypted.compare(
      password,
      data[0].password
    );
    if (!isCorrectPassword) {
      return res.status(400).send({ message: "Password is not correct" });
    }
    if (data[0] && isCorrectPassword) {
      //create token
      const refresh_token = generateToken.refresh_token({
        id: data[0].id,
        email,
      });
      const access_token = generateToken.access_token({
        id: data[0].id,
        email,
      });
      delete data[0].password;
      res.status(200).send({ ...data[0], access_token, refresh_token });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateUserInformation(req, res) {
  try {
    const id = req.params.id;
    await userModel.updateUserInformation(id, req.body);
    res.status(200).send({ message: "update user's profile success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  updateUserInformation,
  getOneUserInfo,
  getUserInfo,
  signUp,
  login,
};
