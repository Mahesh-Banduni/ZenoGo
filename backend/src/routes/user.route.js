const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");
const {uploadPic} = require("../middlewares/multer.js");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users Management
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: API for user registration
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Conflict error (phone number already exists)
 *       400:
 *         description: Bad request
 */
router.post("/signup", userController.createUser);

/**
 * @swagger
 * /users/details:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/details", auth, userController.getUserById);

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: User's name
 *                   email:
 *                     type: string
 *                     description: User's email number
 *       500:
 *         description: Internal server error
 */
router.get("/all", userController.getAllUsers);

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user by ID
 *     description: Update a user's information by their ID
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated user's name
 *               phone:
 *                 type: number
 *               password:
 *                 type: string
 *                 description: Updated user's password
 *               profilePic:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Profile pic of User
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request (Name required)
 *       404:
 *         description: User not found
 */
router.put("/update", auth, uploadPic, userController.updateUser);

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete", auth, userController.deleteUser);

/**
 * @swagger
 * /users/{id}/change-password:
 *   put:
 *     summary: Update User Password by ID
 *     description: Update a user's password by their ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Updated user's old password
 *               newPassword:
 *                 type: string
 *                 description: Updated user's new password
 *               confirmNewPassword:
 *                 type: string
 *                 description: Updated user's confirm new password
 *     responses:
 *       200:
 *         description: User password updated successfully
 *       400:
 *         description: Bad request (Password required)
 *       404:
 *         description: User not found
 */
router.put("/:id/change-password", userController.changePassword);

/**
 * @swagger
 * /users/{id}/reset-password:
 *   put:
 *     summary: Reset User Password
 *     description: Reset user's password
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Reset user's new password
 *               confirmNewPassword:
 *                 type: string
 *                 description: Reset user's confirm new password
 *     responses:
 *       200:
 *         description: User password has been reset successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put("/:id/reset-password", userController.resetPassword);

module.exports = router;
