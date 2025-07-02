const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: String,
  shortReview: String,
  fullReview: String,
  type: { type: String, default: 'series' },
  genre: String,
  year: String,
  rating: String,
  download: String,
  seasons: [Number],
  episodes: [[String]], // or you can use refs for advanced use
});

module.exports = mongoose.model('Series', seriesSchema); 