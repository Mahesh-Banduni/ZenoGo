import { useState } from "react";

export default function PaymentOptions() {
  const [method, setMethod] = useState("Card");

  return (
    <div className="mb-4">
      <p><strong>Select Payment Method:</strong></p>
      <select
        className="w-full p-2 border rounded mt-2"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="Card">Credit/Debit Card</option>
        <option value="Cash">Cash</option>
      </select>
    </div>
  );
}
