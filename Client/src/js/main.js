/*
Description: consuming courses web service with Vue.js & axios
Author: Albin Rönnkvist
*/



// Create new Vue instance
var vm = new Vue({
  // Initiate into "#app"
  el: '#app',
  // Initialize Properties and make them "reactive"
  data () {
    return {
      // GET courses
      courses: null,
      specificCourse: null,
      selectedCourseId: null,

      // POST courses & projects
      postCourseName: null,
      postTags: null,
      postSummary: null,
      postDescription: null,
      postCourseWebsite: null,
      postProjectName: null,
      postProjectTags: null,
      postProjectSummary: null,
      postProjectDescription: null,
      postProjectWebsite: null,
      postProjectRepository: null,

      // PUT courses & projects
      putCourseName: null,
      putTags: null,
      putSummary: null,
      putDescription: null,
      putCourseWebsite: null,
      putProjectName: null,
      putProjectTags: null,
      putProjectSummary: null,
      putProjectDescription: null,
      putProjectWebsite: null,
      putProjectRepository: null
    }
  },
  // Load in after app is mounted to DOM
  mounted () {
    this.getAllCourses();
  },
  // Methods
  methods: {

    // GET all courses, store in "course"
    getAllCourses() {
      var self = this;
      axios
      .get('https://albincourses.herokuapp.com/api/courses')
      .then(response => {
        self.courses = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
    },



    // GET specific course by id, store in "specificCourse"
    getSpecificCourse(id) {
      var self = this;
      axios
      .get('https://albincourses.herokuapp.com/api/courses/' + id)
      .then(response => {
        self.specificCourse = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
    },



    // POST new course
    addCourse() {
      var self = this;
      axios
      .post('https://albincourses.herokuapp.com/api/courses/add', 
      // Data
      {
        courseName: self.postCourseName,
        tags: self.postTags,
        summary: self.postSummary,
        description: self.postDescription,
        courseWebsite: self.postCourseWebsite,
        projects: [{
          projectName: self.postProjectName,
          projectTags: self.postProjectTags,
          projectSummary: self.postProjectSummary,
          projectDescription: self.postProjectDescription,
          projectWebsite: self.postProjectWebsite,
          projectRepository: self.postProjectRepository
        }]
      },
      // Config
      { 
        // Headers
        headers: {
          'X-HTTP-Method-Override': 'POST'
        }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response);
      });
    },



    // PUT course(update)
    updateCourse(id) {
      var self = this;
      axios
      .put('https://albincourses.herokuapp.com/api/courses/update/' + id, 
      // Data
      {
        courseName: self.putCourseName,
        tags: self.putTags,
        summary: self.putSummary,
        description: self.putDescription,
        courseWebsite: self.putCourseWebsite,
        projects: [{
          projectName: self.putProjectName,
          projectTags: self.putProjectTags,
          projectSummary: self.putProjectSummary,
          projectDescription: self.putProjectDescription,
          projectWebsite: self.putProjectWebsite,
          projectRepository: self.putProjectRepository
        }]
      },
      // Config
      { 
        // Headers
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response);
      });
    },
    // Set form data
    setFormData() {
      var self = this;
      self.putCourseName = self.specificCourse.courseName;
      self.putTags = self.specificCourse.tags;
      self.putSummary = self.specificCourse.summary;
      self.putDescription = self.specificCourse.description;
      self.putCourseWebsite = self.specificCourse.courseWebsite;
      self.putProjectName = self.specificCourse.projects[0].projectName;
      self.putProjectTags = self.specificCourse.projects[0].projectTags;
      self.putProjectSummary = self.specificCourse.projects[0].projectSummary;
      self.putProjectDescription = self.specificCourse.projects[0].projectDescription;
      self.putProjectWebsite = self.specificCourse.projects[0].projectWebsite;
      self.putProjectRepository = self.specificCourse.projects[0].projectRepository;
    },



    // DELETE course
    deleteCourse(id) {
      axios
      .delete('https://albincourses.herokuapp.com/api/courses/delete/' + id,
      // Config
      { 
        // Headers
        headers: {
          'X-HTTP-Method-Override': 'DELETE'
        }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response);
      });
    },



    // Reload page
    reloadPage(){
      window.location.reload();
    }
  }
})