const jwt = require("jsonwebtoken");
const db = require("../config/database");

// ENV
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined" || token === "") {
      return res.json({
        statusCode: 0,
        message: "Not Authorized!",
      });
    }

    jwt.verify(token, TOKEN_SECRET_KEY, (err, data) => {
      if (err) {
        return res.json({
          statusCode: 0,
          message: "Not Authorized!",
        });
      }

      const sql =
        "SELECT user_id, email, username FROM user WHERE username=? AND token=?";

      const req_body = [data.username, token];

      db.query(sql, req_body, (error, result) => {
        if (error) {
          return res.json({
            status: 0,
            message: error.message,
          });
        }

        if (result.length === 0) {
          req.user = {};
          return res.json({
            statusCode: 0,
            message: "Not Authorized!",
          });
        }

        req.user = result[0];
        return next();
      });
    });
  } else {
    return res.json({
      statusCode: 0,
      message: "Not Authorized!",
    });
  }
};

module.exports = authentication;
