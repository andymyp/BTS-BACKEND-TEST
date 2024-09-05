const db = require("../config/database");
const checklist_function = require("../functions/checklist");

exports.getAllChecklist = async (req, res) => {
  const user = req.user;

  const sql = "SELECT * FROM checklist WHERE user_id=?";

  const req_body = [user.user_id];

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
      data: result,
    });
  });
};
