const mongoose = require('mongoose'); 
const Media = require('../Media/mediaModel');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [Media]
});

projectSchema.statics.fetchAll = function fetchAllProjects(query) {
  return this.find(query || {}).exec();
};

module.exports = mongoose.model('Project', projectSchema);
