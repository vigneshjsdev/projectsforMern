const Payment = require("../models/Feespay"); // Import Payment model

// Create New Payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get All Payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All Payments
exports.totalAmount = async (req, res) => {

  console.log("utfyiguyoupouyftd");
  

  try {
    const payments = await Payment.find();
    
    // Calculate the total amount
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

    

    res.json({
      totalAmount:totalAmount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  

};



// Get in specific user All Payments
exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ email: req.params.email });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Payment by Transaction ID
exports.getPaymentByTransactionId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ transactionId: req.params.transactionId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: req.params.transactionId },
      req.body,
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({ transactionId: req.params.transactionId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
