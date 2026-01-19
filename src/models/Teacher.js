const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  teacherId: { type: Number, required: true, unique: true },
  department: { type: String, required: true, enum: ["CSE", "BBA", "MBA", "LAW", "PHARMACY", "ENGLISH"] },
}, {
  timestamps: true
});

teacherSchema.index({ email: 1 });
teacherSchema.index({ teacherId: 1 });

module.exports = mongoose.model('teacher', teacherSchema);
