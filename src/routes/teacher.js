
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher management APIs
 */

/**
 * @swagger
 * /api/teacher:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
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
 *               - teacherId
 *               - designation
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@university.edu
 *               department:
 *                 type: string
 *                 example: CSE
 *               teacherId:
 *                 type: integer
 *                 example: 1001
 *               designation:
 *                 type: string
 *                 example: Professor
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', teacherController.createTeacher);

/**
 * @swagger
 * /api/teacher:
 *   get:
 *     summary: Get all teachers with optional filters
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by teacher name
 *       - in: query
 *         name: teacherId
 *         schema:
 *           type: integer
 *         description: Filter by teacher ID
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
 *       - in: query
 *         name: designation
 *         schema:
 *           type: string
 *         description: Filter by designation
 *     responses:
 *       200:
 *         description: List of teachers matching filters
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
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@university.edu
 *                   department:
 *                     type: string
 *                     example: CSE
 *                   teacherId:
 *                     type: integer
 *                     example: 1001
 *                   designation:
 *                     type: string
 *                     example: Professor
 */
router.get('/', teacherController.getAllTeachers);

/**
 * @swagger
 * /api/teacher/{teacherId}:
 *   get:
 *     summary: Get a teacher by teacher ID
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher ID
 *     responses:
 *       200:
 *         description: Teacher details found successfully
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
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@university.edu
 *                 department:
 *                   type: string
 *                   example: CSE
 *                 teacherId:
 *                   type: integer
 *                   example: 1001
 *                 designation:
 *                   type: string
 *                   example: Professor
 *       404:
 *         description: Teacher not found
 */
router.get('/:teacherId', teacherController.getTeacherByTeacherId);

/**
 * @swagger
 * /api/teacher/{teacherId}:
 *   put:
 *     summary: Update an existing teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@university.edu
 *               department:
 *                 type: string
 *                 example: CSE
 *               designation:
 *                 type: string
 *                 example: Professor
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       404:
 *         description: Teacher not found
 */
router.put('/:teacherId', teacherController.updateTeacher);

/**
 * @swagger
 * /api/teacher/{teacherId}:
 *   delete:
 *     summary: Delete a teacher by teacher ID
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher ID to delete
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 */
router.delete('/:teacherId', teacherController.deleteTeacher);

module.exports = router;
