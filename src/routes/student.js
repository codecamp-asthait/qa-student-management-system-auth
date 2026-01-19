const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management APIs
 */

/**
 * @swagger
 * /api/student:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - department
 *               - registrationId
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahat Khan Pathan
 *               email:
 *                 type: string
 *                 example: rk.pathan@asthait.com
 *               department:
 *                 type: string
 *                 example: CSE
 *               registrationId:
 *                 type: integer
 *                 example: 12345
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/", studentController.createStudent);

/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Get all students with optional filters
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by student name
 *       - in: query
 *         name: registrationId
 *         schema:
 *           type: integer
 *         description: Filter by registration ID
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Filter by age
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email
 *     responses:
 *       200:
 *         description: List of students matching filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 68f499a91466f442d1d220e6
 *                   name:
 *                     type: string
 *                     example: MD Rahat Khan Pathan
 *                   email:
 *                     type: string
 *                     example: rk.pathan@asthait.com
 *                   department:
 *                     type: string
 *                     example: CSE
 *                   registrationId:
 *                     type: integer
 *                     example: 698745
 *                   age:
 *                     type: integer
 *                     example: 25
 */

router.get("/", studentController.getAllStudents);

/**
 * @swagger
 * /api/student/{registrationId}:
 *   get:
 *     summary: Get a student by registration ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The registration ID of the student
 *     responses:
 *       200:
 *         description: Student details found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 68f499a91466f442d1d220e6
 *                 name:
 *                   type: string
 *                   example: MD Rahat Khan Pathan
 *                 email:
 *                   type: string
 *                   example: rk.pathan@asthait.com
 *                 department:
 *                   type: string
 *                   example: CSE
 *                 registrationId:
 *                   type: integer
 *                   example: 698745
 *                 age:
 *                   type: integer
 *                   example: 25
 *       404:
 *         description: Student not found
 */
router.get("/:registrationId", studentController.getStudentByRegistrationId);

/**
 * @swagger
 * /api/student/{registrationId}:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The registration ID of the student to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahat Khan Pathan
 *               email:
 *                 type: string
 *                 example: rk.pathan@asthait.com
 *               department:
 *                 type: string
 *                 example: CSE
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */

router.put("/:registrationId", studentController.updateStudent);

/**
 * @swagger
 * /api/student/{registrationId}:
 *   delete:
 *     summary: Delete a student by registration ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The registration ID of the student to delete
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:registrationId", studentController.deleteStudent);

module.exports = router;
