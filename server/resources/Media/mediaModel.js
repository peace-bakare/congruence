const mongoose = require('mongoose'); 

const mediaSchema = new mongoose.Schema({
  ref: String,
  src: String
});

module.exports = mongoose.model('Media', mediaSchema);
