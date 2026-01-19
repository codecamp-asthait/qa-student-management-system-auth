const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/auth');

// Welcome route
router.get('/', (req, res) => {
  res.send('Welcome to Student Management System with Authentication API');
});

// Login route (returns JWT for fixed credentials)
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication related endpoints
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Obtain a JWT by providing valid credentials
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authToken:
 *                   type: string
 *                   description: JWT token to be used as Bearer token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

// Student API routes (protected)
router.use('/api/student', authMiddleware, require('./student'));

// Teacher API routes (protected)
router.use('/api/teacher', authMiddleware, require('./teacher'));

module.exports = router;
