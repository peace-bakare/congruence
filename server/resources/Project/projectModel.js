const mongoose = require('mongoose'); 
const Media = require('../Media/mediaModel');

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema({
  ref: String,
  title: String,
  description: String,
  media: [{ type: ObjectId, ref: 'Media' }]
});

projectSchema.statics.fetchAll = function fetchAllProjects(query) {
  return this.find(query || {}).exec();
};

module.exports = mongoose.model('Project', projectSchema);
