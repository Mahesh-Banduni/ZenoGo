const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      amount: Number,
      type: { type: String, enum: ["credit", "debit"], required: true },
      description: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Earning", earningSchema);
