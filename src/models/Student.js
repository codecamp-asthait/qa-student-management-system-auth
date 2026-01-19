const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true, enum: ["CSE", "BBA", "MBA", "LAW", "PHARMACY", "ENGLISH"] },
  registrationId: { type: Number, required: true, unique: true },
  age: { type: Number }
}, {
  timestamps: true
});

studentSchema.index({ email: 1 });
studentSchema.index({ registrationId: 1 });

module.exports = mongoose.model('student', studentSchema);
