const router = require("express").Router();
const controller = require("../controllers/checklist");

router.get("/checklist", controller.getAllChecklist);

module.exports = router;
