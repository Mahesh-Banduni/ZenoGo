const express = require("express");
const rideController = require("../controllers/ride.controller.js");
const router = express.Router();
const auth = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: User Ride Management
 */

/**
 * @swagger
 * /rides/user:
 *   get:
 *     summary: Retrieve all rides for a user.
 *     tags: [Rides]
 *     responses:
 *       200:
 *         description: A list of rides.
 *       404:
 *         description: Rides not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/user", auth, rideController.getRidesByUserId);

/**
 * @swagger
 * /rides/{rideId}:
 *   get:
 *     summary: Retrieve a specific ride by ID.
 *     tags: [Rides]
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ride.
 *     responses:
 *       200:
 *         description: Ride details.
 *       404:
 *         description: Ride not found.
 */
router.get("/:rideId", rideController.getRideById);

/**
 * @swagger
 * /rides/calculate-fare:
 *   post:
 *     summary: Calculate fare for a ride
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickupLat:
 *                 type: string
 *               pickupLng:
 *                 type: string
 *               dropOffLat:
 *                 type: string
 *               dropOffLng:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fare Caculated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Route not found.
 */
router.post("/calculate-fare", rideController.calculateFare);

/**
 * @swagger
 * /rides/create-ride:
 *   post:
 *     summary: Create a ride 
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickupAddress:
 *                 type: string
 *               pickupLat:
 *                 type: string
 *               pickupLng:
 *                 type: string
 *               dropOffAddress:
 *                 type: string
 *               dropOffLat:
 *                 type: string
 *               dropOffLng:
 *                 type: string
 *               distance:
 *                 type: string
 *               duration:
 *                 type: string
 *               fare:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               polyline:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ride created successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Route not found.
 */
router.post("/create-ride", auth, rideController.createRide);


/**
 * @swagger
 * /rides/payment/verify:
 *   post:
 *     summary: Verify a Razorpay payment.
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully.
 *       400:
 *         description: Payment verification failed.
 *       404:
 *         description: Ride not found.
 */
router.post("/payment/verify", rideController.verifyPayment);

module.exports = router;
