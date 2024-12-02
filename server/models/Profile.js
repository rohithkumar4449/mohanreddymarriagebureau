import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  nativePlace: {
    type: String,
    required: true,
    trim: true
  },
  height: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true,
    trim: true
  },
  education: {
    type: String,
    required: true,
    trim: true
  },
  profileType: {
    type: String,
    required: true,
    enum: ['bride', 'groom']
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  customFields: [{
    label: String,
    value: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Profile', ProfileSchema);