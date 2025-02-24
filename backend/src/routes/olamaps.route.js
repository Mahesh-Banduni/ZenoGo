const express = require("express");
const olamapsController = require("../controllers/olamaps.controller.js");
const router = express.Router();

/**
 * @swagger
 * /olamaps/search-location:
 *   get:
 *     summary: Search for location
 *     tags: [OlaMaps]
 *     parameters:
 *       - in: query
 *         name: input
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of location matching the criteria
 *       404:
 *         description: No products found
 */
router.get("/search-location", olamapsController.searchLocation);

/**
 * @swagger
 * /olamaps/optimized-route:
 *   get:
 *     summary: Optimized route between source and destination
 *     tags: [OlaMaps]
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of route matching the criteria
 *       404:
 *         description: No route found
 */
router.get("/optimized-route", olamapsController.getOptimizedRoute);

/**
 * @swagger
 * /olamaps/address-coordinates:
 *   get:
 *     summary: Get address from coordinates
 *     tags: [OlaMaps]
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *       - in: query
 *         name: lon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get address from coordinates
 *       404:
 *         description: No address found
 */
router.get("/address-coordinates", olamapsController.getAddressFromCoordinates);

/**
 * @swagger
 * /olamaps/coordinates-address:
 *   get:
 *     summary: Get coordinates from address
 *     tags: [OlaMaps]
 *     parameters:
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get coordinates from address
 *       404:
 *         description: No coordinates found
 */
router.get("/coordinates-address", olamapsController.getCoordinatesFromAddress);

module.exports = router;
