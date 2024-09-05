const router = require("express").Router();
const controller = require("../controllers/checklist");

router.get("/checklist", controller.getAllChecklist);
router.post("/checklist", controller.createChecklist);

module.exports = router;
