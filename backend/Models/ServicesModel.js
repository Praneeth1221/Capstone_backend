const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Service schema
const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Bridal', 'Nails', 'Makeup','Hair Cuts', 'Hair Colouring', 'Facial Cleanup', 'Threading', 'Waxing']
  },
  duration: {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    }
  }
});

// Create and export the model
const ServicesModel = mongoose.model('Service', serviceSchema); // Ensure correct model name

module.exports = ServicesModel;