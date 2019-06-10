const uuidv1 = require('uuid/v1');

const Project = require('./projectModel');

exports.createProject = function createProject(projectDTO) {
  const project = new Project(projectDTO);
  project.ref = uuidv1();
  project.ref = project.ref.split('-').shift();

  return project.save();
};

exports.getAllProjects = function getAllProjects() {
  return Project.fetchAll();
};

exports.deleteProject = function deleteProject(ref) {
  return Project.deleteOne({ ref: ref });
};
