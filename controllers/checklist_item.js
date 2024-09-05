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
    "INSERT INTO checklist_item (checklist_id, itemName, status) VALUES (?, ?, ?)";

  const req_body = [checklist_id, req.body.itemName, 0];

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

exports.getChecklistItem = async (req, res) => {
  if (!req.params && !req.params.id) {
    return res.json({
      status: 0,
      message: "param checklistId and checklistItemId is required!",
    });
  }

  const checklistId = req.params.checklistId;
  const checklistItemId = req.params.checklistItemId;
  const user = req.user;

  const sql =
    "SELECT ci.* FROM checklist c, checklist_item ci WHERE c.checklist_id=ci.checklist_id AND c.user_id=? AND ci.checklist_id=? AND ci.checklist_item_id=?";

  const req_body = [user.user_id, checklistId, checklistItemId];

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
      data: result[0],
    });
  });
};

exports.updateChecklistItemStatus = async (req, res) => {
  if (!req.params && !req.params.id) {
    return res.json({
      status: 0,
      message: "param checklistId and checklistItemId is required!",
    });
  }

  const checklistId = req.params.checklistId;
  const checklistItemId = req.params.checklistItemId;
  const user = req.user;

  const sql =
    "SELECT ci.* FROM checklist c, checklist_item ci WHERE c.checklist_id=ci.checklist_id AND c.user_id=? AND ci.checklist_id=? AND ci.checklist_item_id=?";

  const req_body = [user.user_id, checklistId, checklistItemId];

  db.query(sql, req_body, (error, result) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: 0,
        message: "Cheklist item not found!",
      });
    }

    let status = result[0].status === 0 ? 1 : 0;

    const sql_update =
      "UPDATE checklist_item SET status=? WHERE checklist_id=? AND checklist_item_id=?";
    const req_update = [status, checklistId, checklistItemId];

    db.query(sql_update, req_update, (error) => {
      if (error) {
        return res.json({
          status: 0,
          message: error.message,
        });
      }

      return res.json({
        status: 1,
        message: "Checklist item status updated",
      });
    });
  });
};

exports.deleteChecklistItem = async (req, res) => {
  if (!req.params && !req.params.id) {
    return res.json({
      status: 0,
      message: "param checklistId and checklistItemId is required!",
    });
  }

  const checklistId = req.params.checklistId;
  const checklistItemId = req.params.checklistItemId;
  const user = req.user;

  const sql =
    "SELECT ci.* FROM checklist c, checklist_item ci WHERE c.checklist_id=ci.checklist_id AND c.user_id=? AND ci.checklist_id=? AND ci.checklist_item_id=?";

  const req_body = [user.user_id, checklistId, checklistItemId];

  db.query(sql, req_body, (error, result) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: 0,
        message: "Cheklist item not found!",
      });
    }

    let status = result[0].status === 0 ? 1 : 0;

    const sql_delete =
      "DELETE FROM checklist_item WHERE checklist_id=? AND checklist_item_id=?";
    const req_delete = [checklistId, checklistItemId];

    db.query(sql_delete, req_delete, (error) => {
      if (error) {
        return res.json({
          status: 0,
          message: error.message,
        });
      }

      return res.json({
        status: 1,
        message: "Checklist item deleted",
      });
    });
  });
};
