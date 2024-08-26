/*
Description: Database schema
Author: Albin Rönnkvist
*/

// Import mongoose-module
const mongoose = require("mongoose");

// Create new schema
var Schema = mongoose.Schema;



// Schema for courses
var coursesSchema = new Schema({
    courseName: String,
    tags: String,
    summary: String,
    description: String,
    courseWebsite: String,
    projects: [{
        projectName: String,
        projectTags: String,
        projectSummary: String,
        projectDescription: String,
        projectWebsite: String,
        projectRepository: String
    }]
});

// Export coursesSchema
module.exports = mongoose.model("Courses", coursesSchema);