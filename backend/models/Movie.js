const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: String,
  shortReview: String,
  fullReview: String,
  type: { type: String, default: 'movie' },
  genre: String,
  year: String,
  rating: String,
  download: String,
});

module.exports = mongoose.model('Movie', movieSchema); 