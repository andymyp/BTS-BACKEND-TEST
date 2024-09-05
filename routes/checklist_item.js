const router = require("express").Router();
const controller = require("../controllers/checklist_item");

router.get("/checklist/:id/item", controller.getAllChecklistItem);

module.exports = router;
