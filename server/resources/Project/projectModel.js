const mongoose = require('mongoose'); 
const Media = require('../Media/mediaModel');

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  media: [Media]
});

module.exports = new mongoose.model('Project', projectSchema);