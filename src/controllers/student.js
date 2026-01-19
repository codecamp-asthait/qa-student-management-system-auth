// Example Student controller
const Student = require('../models/Student');

const Joi = require('joi');

exports.getAllStudents = async (req, res) => {
  try {
    const { email, name, department, registrationId, age } = req.query;
    const query = {};
    if (email) query.email = { $regex: email, $options: 'i' };
    if (name) query.name = { $regex: name, $options: 'i' };
    if (department) query.department = { $regex: department, $options: 'i' };
    if (registrationId) query.registrationId = registrationId;
    if (age) query.age = age;
  const students = await Student.find(query).select('-__v -createdAt -updatedAt');
  res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentByRegistrationId = async (req, res) => {
  try {
    const student = await Student.findOne({ registrationId: req.params.registrationId });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    if (student) {
      const filtered = student.toObject();
      delete filtered.__v;
      delete filtered.createdAt;
      delete filtered.updatedAt;
      res.json(filtered);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be valid',
      'any.required': 'Email is required'
    }),
    department: Joi.string().valid('CSE', 'BBA', 'MBA', 'LAW', 'PHARMACY', 'ENGLISH').required().messages({
      'any.only': 'Department must be one of CSE, BBA, MBA, LAW, PHARMACY, ENGLISH',
      'any.required': 'Department is required'
    }),
    registrationId: Joi.number().integer().required().messages({
      'number.base': 'Registration ID must be a number',
      'any.required': 'Registration ID is required'
    }),
    age: Joi.number().integer().messages({
      'number.base': 'Age must be a number',
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const student = new Student(req.body);
    await student.save();
  const filtered = student.toObject();
  delete filtered.__v;
  delete filtered.createdAt;
  delete filtered.updatedAt;
  res.status(201).json(filtered);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required'
    }),
    email: Joi.string().email().messages({
      'string.email': 'Email must be valid'
    }),
    department: Joi.string().valid('CSE', 'BBA', 'MBA', 'LAW', 'PHARMACY', 'ENGLISH').messages({
      'any.only': 'Department must be one of CSE, BBA, MBA, LAW, PHARMACY, ENGLISH'
    }),
    age: Joi.number().integer().messages({
      'number.base': 'Age must be a number'
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Remove registrationId from update data if it exists
  const updateData = { ...req.body };
  delete updateData.registrationId;

  try {
    const student = await Student.findOneAndUpdate(
      { registrationId: req.params.registrationId },
      updateData,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found' });
    if (student) {
      const filtered = student.toObject();
      delete filtered.__v;
      delete filtered.createdAt;
      delete filtered.updatedAt;
      res.json(filtered);
    }
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ registrationId: req.params.registrationId });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
