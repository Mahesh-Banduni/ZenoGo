import React from "react";
import { CreditCard } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const PaymentButton = ({
  rideData,
  disabled,
  paymentMethod,
  passengerDetails,
  onRideSuccess,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_ID;
  if (!RAZORPAY_KEY_ID) console.error("Razorpay Key ID is missing!");

  const token = localStorage.getItem("token");

  const handlePayment = async () => {
    try {
      if (!rideData) {
        console.error("Missing rideData");
        return;
      }

      const rideDetails = {
        pickupAddress: rideData.pickupAddress,
        pickupLat: rideData.pickupLat,
        pickupLng: rideData.pickupLng,
        dropOffAddress: rideData.dropOffAddress,
        dropOffLat: rideData.dropOffLat,
        dropOffLng: rideData.dropOffLng,
        day: rideData.day,
        timing: rideData.timing,
        selectedRide: rideData.selectedRide,
        fare: rideData.fare,
        distance: rideData.distance,
        duration: rideData.duration,
        polyline: rideData.polyline,
        paymentMethod,
      };

      const response = await axiosInstance.post(
        `/rides/create-ride`,
        rideDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (paymentMethod === "Digital Payment") {
        const { razorpayOrder } = response.data.data;

        const options = {
          key: RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "ZenoGo",
          description: "Payment for your ride",
          order_id: razorpayOrder.id,
          handler: async (response) => {
            try {
              await axiosInstance.post(`/rides/payment/verify`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              onPaymentSuccess?.(response);
            } catch (err) {
              console.error("Payment verification failed:", err);
              onPaymentError?.(err);
            }
          },
          prefill: {
            name: passengerDetails?.name || "",
            email: passengerDetails?.email || "",
            contact: passengerDetails?.phone || "",
          },
          theme: { color: "#fa9d39" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        onRideSuccess?.();
      }
    } catch (err) {
      console.error("Payment error:", err);
      onPaymentError?.(err);
    }
  };

  const totalFare = rideData?.fare ? Number(rideData.fare).toFixed(2) : "0.00";

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || !rideData}
      className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <CreditCard className="w-5 h-5" />
      {paymentMethod === "Cash" ? "Book Now" : `Proceed to Pay ₹${totalFare}`}
    </button>
  );
};

export default PaymentButton;
