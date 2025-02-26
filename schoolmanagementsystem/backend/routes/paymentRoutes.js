const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentcontroller");

// Routes
router.post("/submit-fee", paymentController.createPayment);
router.get("/payments", paymentController.getAllPayments);

router.get("/:email",paymentController.getPaymentsByUser)
router.get("/totalAmt/amt",paymentController.totalAmount)


router.get("/payment/:transactionId", paymentController.getPaymentByTransactionId);
router.put("/update-payment/:transactionId", paymentController.updatePayment);
router.delete("/delete-payment/:transactionId", paymentController.deletePayment);



module.exports = router;
