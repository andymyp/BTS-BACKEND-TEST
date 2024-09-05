const router = require("express").Router();
const controller = require("../controllers/checklist");

router.get("/checklist", controller.getAllChecklist);
router.post("/checklist", controller.createChecklist);
router.delete("/checklist/:id", controller.deleteChecklist);

module.exports = router;
