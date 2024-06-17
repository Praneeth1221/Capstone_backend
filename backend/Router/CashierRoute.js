const express = require("express");
const router = express.Router();
const CashierController = require("../Controller/CashierController");

router.get("/", CashierController.getAllCashier);
router.post("/", CashierController.addCashier);
router.get("/:id", CashierController.getById);
router.put("/:id", CashierController.updateCashier);
router.delete("/:id", CashierController.deleteCashier);

module.exports = router;
