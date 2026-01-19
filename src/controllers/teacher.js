const Teacher = require("../models/Teacher");

const Joi = require("joi");

exports.getAllTeachers = async (req, res) => {
  try {
    const { email, name, department, designation, teacherId } = req.query;
    const query = {};
    if (email) query.email = { $regex: email, $options: "i" };
    if (name) query.name = { $regex: name, $options: "i" };
    if (department) query.department = { $regex: department, $options: "i" };
    if (designation) query.designation = { $regex: designation, $options: "i" };
    if (teacherId) query.teacherId = teacherId;
    const teachers = await Teacher.find(query).select(
      "-__v -createdAt -updatedAt"
    );
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeacherByTeacherId = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ teacherId: req.params.teacherId });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    if (teacher) {
      const filtered = teacher.toObject();
      delete filtered.__v;
      delete filtered.createdAt;
      delete filtered.updatedAt;
      res.json(filtered);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be valid",
      "any.required": "Email is required",
    }),
    department: Joi.string()
      .valid("CSE", "BBA", "MBA", "LAW", "PHARMACY", "ENGLISH")
      .required()
      .messages({
        "any.only":
          "Department must be one of CSE, BBA, MBA, LAW, PHARMACY, ENGLISH",
        "any.required": "Department is required",
      }),
    teacherId: Joi.number().integer().required().messages({
      "number.base": "Teacher ID must be a number",
      "any.required": "Teacher ID is required",
    }),
    designation: Joi.string().required().messages({
      "string.base": "Designation must be a string",
      "string.empty": "Designation is required",
      "any.required": "Designation is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    const filtered = teacher.toObject();
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

exports.updateTeacher = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
    }),
    email: Joi.string().email().messages({
      "string.email": "Email must be valid",
    }),
    department: Joi.string()
      .valid("CSE", "BBA", "MBA", "LAW", "PHARMACY", "ENGLISH")
      .messages({
        "any.only":
          "Department must be one of CSE, BBA, MBA, LAW, PHARMACY, ENGLISH",
      }),
    designation: Joi.string().messages({
      "string.base": "Designation must be a string",
      "string.empty": "Designation is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Remove teacherId from update data if it exists
    const updateData = { ...req.body };
    delete updateData.teacherId;

    const teacher = await Teacher.findOneAndUpdate(
      { teacherId: req.params.teacherId },
      updateData,
      { new: true, runValidators: true }
    );
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    if (teacher) {
      const filtered = teacher.toObject();
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

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({ teacherId: req.params.teacherId });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
