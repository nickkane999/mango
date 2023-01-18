const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [];

const rootValue = {
  createUser: ({ first_name, last_name, username, email, password }) => {
    const user = {
      first_name,
      last_name,
      username,
      email,
    };

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          reject(err);
        }
        user.password = hash;
        users.push(user);

        // generate token
        const token = jwt.sign({ user }, "secret_key");

        resolve({ user, token });
      });
    });
  },

  // Function to verify token
  verifyToken: (req) => {
    const token = req.headers["authorization"];
    if (!token) {
      return { authenticated: false };
    }
    try {
      const decoded = jwt.verify(token, "secret_key");
      return { authenticated: true, user: decoded.user };
    } catch (err) {
      return { authenticated: false };
    }
  },
};

module.exports = rootValue;
