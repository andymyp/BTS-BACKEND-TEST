const router = require("express").Router();
const controller = require("../controllers/checklist_item");

router.get("/checklist/:id/item", controller.getAllChecklistItem);
router.post("/checklist/:id/item", controller.createChecklistItem);

router.get(
  "/checklist/:checklistId/item/:checklistItemId",
  controller.getChecklistItem
);

router.put(
  "/checklist/:checklistId/item/:checklistItemId",
  controller.updateChecklistItemStatus
);

module.exports = router;
