const mongoose = require('mongoose');

const tvSerialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: String,
  shortReview: String,
  fullReview: String,
  type: { type: String, default: 'tvserial' },
  genre: String,
  year: String,
  rating: String,
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
});

module.exports = mongoose.model('TVSerial', tvSerialSchema); 