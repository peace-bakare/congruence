const mongoose = require('mongoose'); 
const Media = require('../Media/mediaModel');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [Media]
});

module.exports = mongoose.model('Project', projectSchema);
