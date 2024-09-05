const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const auth_function = require("../functions/auth");

// ENV
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

exports.register = async (req, res) => {
  const { error } = await auth_function.validateRegister(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = "INSERT INTO user (email, username, password) VALUES (?, ?, ?)";

  const salt = bcrypt.genSaltSync();
  const password = bcrypt.hashSync(req.body.password, salt);

  const req_body = [req.body.email, req.body.username, password];

  db.query(sql, req_body, (error) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    return res.json({
      status: 1,
      message: "Success",
    });
  });
};

exports.login = async (req, res) => {
  const { error } = await auth_function.validateLogin(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql =
    "SELECT email, username, password, token FROM user WHERE username=?";

  const req_body = [req.body.username];

  db.query(sql, req_body, async (error, result) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: 0,
        message: "Username not registered!",
      });
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      result[0].password
    );

    if (!matchPassword) {
      return res.json({
        status: 0,
        message: "Password wrong!",
      });
    }

    const accessToken = jwt.sign(
      { username: req.body.username },
      TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const sql_update = "UPDATE user SET token=? WHERE username=?";

    const req_body_update = [accessToken, req.body.username];

    db.query(sql_update, req_body_update, (error) => {
      if (error) {
        return res.json({
          status: 0,
          message: error.message,
        });
      }

      db.query(sql, req_body, (error, result) => {
        if (error) {
          return res.json({
            status: 0,
            message: error.message,
          });
        }

        return res.json({
          status: 1,
          message: "Success",
          data: {
            email: result[0].email,
            username: result[0].username,
            token: result[0].token,
          },
        });
      });
    });
  });
};
