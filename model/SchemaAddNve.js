// SchemaAddNve.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  flexiUrl: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['engmve', 'telugumve'], // Update the enum values
    required: true
  }

});

const Addmve = mongoose.model('Addmve', movieSchema);

module.exports = Addmve;
