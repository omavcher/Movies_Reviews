const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  number: Number,
  title: String,
  thumbnail: String,
  time: String,
  publishDate: String,
  about: String,
  watchUrl: String,
  tvSerial: { type: mongoose.Schema.Types.ObjectId, ref: 'TVSerial' },
});

module.exports = mongoose.model('Episode', episodeSchema); 