const express = require("express");
const mapplsController = require("../controllers/mappls.controller.js");
const router = express.Router();

/**
 * @swagger
 * /mappls/search-location:
 *   get:
 *     summary: Search for location
 *     tags: [Mappls]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of location matching the criteria
 *       404:
 *         description: No products found
 */
router.get("/search-location", mapplsController.searchLocation);

/**
 * @swagger
 * /mappls/optimized-route:
 *   get:
 *     summary: Optimized route between source and destination
 *     tags: [Mappls]
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
router.get("/optimized-route", mapplsController.getOptimizedRoute);

/**
 * @swagger
 * /mappls/address-coordinates:
 *   get:
 *     summary: Get address from coordinates
 *     tags: [Mappls]
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
router.get("/address-coordinates", mapplsController.getAddressFromCoordinates);

/**
 * @swagger
 * /mappls/eloc-address:
 *   get:
 *     summary: Get address from eloc
 *     tags: [Mappls]
 *     parameters:
 *       - in: query
 *         name: eloc
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get coordinates from address
 *       404:
 *         description: No coordinates found
 */
router.get("/address-eloc", mapplsController.getAddressFromEloc);

module.exports = router;
