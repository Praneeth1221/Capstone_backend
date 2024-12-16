const express = require("express");
const router = express.Router();
// Insert User Controller
const BeauticianController = require("../Controller/BeauticianController");

router.get("/", BeauticianController.getAllBeauticians);
router.post("/", BeauticianController.addBeauticians);
router.get("/:id", BeauticianController.getById);
router.put("/:id", BeauticianController.updateBeautician);
router.delete("/:id", BeauticianController.deleteBeautician);

// Export
module.exports = router;
