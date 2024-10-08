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

exports.createChecklist = async (req, res) => {
  const { error } = await checklist_function.validateCreate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const user = req.user;

  const sql = "INSERT INTO checklist (user_id, name) VALUES (?, ?)";

  const req_body = [user.user_id, req.body.name];

  db.query(sql, req_body, (error) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    return res.json({
      status: 1,
      message: "Checklist created",
    });
  });
};

exports.deleteChecklist = async (req, res) => {
  if (!req.params && !req.params.id) {
    return res.json({
      status: 0,
      message: "param id is required!",
    });
  }

  const checklist_id = req.params.id;
  const user = req.user;

  const sql = "DELETE FROM checklist WHERE checklist_id=? AND user_id=?";

  const req_body = [checklist_id, user.user_id];

  db.query(sql, req_body, (error) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    return res.json({
      status: 1,
      message: "Checklist deleted",
    });
  });
};
