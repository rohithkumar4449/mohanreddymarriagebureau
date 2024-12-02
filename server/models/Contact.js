import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true,
    trim: true
  },
  lookingFor: {
    type: String,
    required: true,
    enum: ['bride', 'groom']
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Contact', ContactSchema);