/*
Description: Express Web Service for handling courses and projects
Author: Albin Rönnkvist
*/

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors')



// Database
// Connect to database
mongoose.connect("mongodb://AlbinAdmin:XrkVFAFeK7JcFgkk@ds161620.mlab.com:61620/coursesdb", { useNewUrlParser: true });

// Get database schema
var Courses = require("./app/models/courses.js");



// Create an instance of express
var app = express();



// Allow calls across different domains
// app.all('/*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
// 	next();
// });



// Body parser
// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Enable CORS
app.use(cors())


// REST-api for courses
// GET
// Get all courses
app.get("/api/courses", (req, res) => {

    // Find courses-documents in DB and send result
    Courses.find((err, Courses) => {
        // If there was an error
        if(err) {
            // Send error-message
            res.send(err);
        }
        else {
            // Convert result to JSON and send
            res.json(Courses);
        }
    });
});

// Get specific course by id
app.get("/api/courses/:id", (req, res) => {

    // Find course-document in DB and send result
    Courses.findById(req.params.id, (err, Courses) => {
        // If there was an error
        if(err) {
            // Send error-message
            res.send(err);
        }
        else {
            // Convert result to JSON and send
            res.json(Courses);
        }
    })
});

// POST
app.post("/api/courses/add", (req, res) => {

    // New instance of Courses schema
    var course = new Courses();

    // Create new object
    course.courseName = req.body.courseName;
    course.tags = req.body.tags;
    course.summary = req.body.summary;
    course.description = req.body.description;
    course.courseWebsite = req.body.courseWebsite;
    course.projects = req.body.projects;
    course.projectName = req.body.projectName;
    course.projectTags = req.body.projectTags;
    course.projectSummary = req.body.projectSummary;
    course.projectDescription = req.body.projectDescription;
    course.projectWebsite = req.body.projectWebsite;
    course.projectRepository = req.body.projectRepository;

    // Store new course in database 
    course.save((err) => {
        // If there was an error
        if(err) {
            // Send error message
            res.send(err);
        }
    });

    // Redirect to index
    res.redirect("/");
});

// PUT
app.put("/api/courses/update/:id", (req, res) => {

    // Get the id from id-parameter
    var updateId = req.params.id;

    // Update course that matches updateId
    Courses.findOne({_id: updateId}, (err, course) => {
        // If there was an error
        if(err) {
            // Send error message
            res.send(err);
        } 
        else {
            // If no courses matched the updateId
            if(!course) {
                // Send error 404-message(not found)
                res.status(404).send();
            } 
            else {
                // Update returned course
                if(req.body.courseName) {
                    course.courseName = req.body.courseName;
                }
                if(req.body.tags) {
                    course.tags = req.body.tags;
                }
                if(req.body.summary) {
                    course.summary = req.body.summary;
                }
                if(req.body.description) {
                    course.description = req.body.description;
                }
                if(req.body.courseWebsite) {
                    course.courseWebsite = req.body.courseWebsite;
                }

                if(req.body.projects) {
                    course.projects = req.body.projects;
                }
                if(req.body.projectName) {
                    course.projectName = req.body.projectName;
                }
                if(req.body.projectTags) {
                    course.projectTags = req.body.projectTags;
                }
                if(req.body.projectSummary) {
                    course.projectSummary = req.body.projectSummary;
                }
                if(req.body.projectDescription) {
                    course.projectDescription = req.body.projectDescription;
                }
                if(req.body.projectWebsite) {
                    course.projectWebsite = req.body.projectWebsite;
                }
                if(req.body.projectRepository) {
                    course.projectRepository = req.body.projectRepository;
                }

                // Store updated course in database 
                course.save((err, updatedCourse) => {
                    // If there was an error
                    if(err) {
                        // Send error message
                        res.send(err);
                    } 
                    else {
                        // Redirect to index
                        res.redirect("/");
                    }
                });
            }
        }
    });
});

// DELETE
app.delete("/api/courses/delete/:id", (req, res) => {

    // Get the id from id-parameter
    var deleteId = req.params.id;

    // Delete course that matches deleteId
    Courses.deleteOne({
        _id: deleteId
    }, (err, Courses) => {
        // If there was an error
        if(err) {
            // Send error message
            res.send(err);
        }

        // Redirect to index
        res.redirect("/");
    });
});

// Server
// Port for connection
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Servern är startad på port ${port}`);
});