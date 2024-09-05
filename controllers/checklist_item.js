const db = require("../config/database");
const checklist_item_function = require("../functions/checklist_item");

exports.getAllChecklistItem = async (req, res) => {
  if (!req.params && !req.params.id) {
    return res.json({
      status: 0,
      message: "param id is required!",
    });
  }

  const checklist_id = req.params.id;
  const user = req.user;

  const sql =
    "SELECT ci.* FROM checklist c, checklist_item ci WHERE c.checklist_id=ci.checklist_id AND c.user_id=? AND ci.checklist_id=?";

  const req_body = [user.user_id, checklist_id];

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
      checklist_id: checklist_id,
      data: result,
    });
  });
};

exports.createChecklistItem = async (req, res) => {
  const { error } = await checklist_item_function.validateCreate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  if (!req.params && !req.params.id) {
    return res.json({
      status: 0,
      message: "param id is required!",
    });
  }

  const checklist_id = req.params.id;

  const sql =
    "INSERT INTO checklist_item (checklist_id, itemName) VALUES (?, ?)";

  const req_body = [checklist_id, req.body.itemName];

  db.query(sql, req_body, (error) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    return res.json({
      status: 1,
      message: "Checklist item created",
    });
  });
};
