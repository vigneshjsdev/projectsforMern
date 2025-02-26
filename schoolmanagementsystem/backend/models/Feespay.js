const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import UUID

const PaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount should be at least 1"],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Bank Transfer", "UPI", "Cash"],
  },
  transactionId: {
    type: String,
    default: uuidv4, // Auto-generate unique ID
    trim: true,
    unique: true, // Ensure uniqueness
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create Index for Faster Queries
PaymentSchema.index({ email: 1 });

const FeesPayment = mongoose.model("FeesPayment", PaymentSchema);

module.exports = FeesPayment;
