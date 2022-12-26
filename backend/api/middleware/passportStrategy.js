const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const db = require("../../database/mysql");
const genarateToken = require("../../utils/generateToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, callback) {
      const { name, email, picture } = profile._json;
      const query = "SELECT * FROM `user` WHERE email = ?";
      const [data] = await db.query(query, [email]);
      if (Boolean(data.length)) {
        const info = { ...data[0] };

        const access_token = genarateToken.access_token({
          id: info.id,
          email: info.email,
        });
        const refresh_token = genarateToken.refresh_token({
          id: info.id,
          email: info.email,
        });

        delete info.password;

        return callback(null, { ...info, access_token, refresh_token });
      } else {

        const insertQuery =
          "INSERT INTO `user` (`name`, `email`, `user_avatar`) VALUES (?, ?, ?);";
        const [newUser] = await db.query(insertQuery, [name, email, picture]);

        const access_token = genarateToken.access_token({
          id: info.id,
          email: info.email,
        });
        const refresh_token = genarateToken.refresh_token({
          id: info.id,
          email: info.email,
        });

        return callback(null, {
          id: newUser.insertId,
          name: name,
          email: email,
          address_prefecture: "",
          address_district: "",
          address_street: "",
          birth_year: "",
          birth_month: "",
          birth_day: "",
          user_avatar: picture,
          gender: "",
          phone: "",
          access_token,
          refresh_token,
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
