module.exports = function(app) {
  // Note : Not a good practice to place logics in the routes.
  // Commonly each handler has its own js file.
  
  // TODO a hashmap as a database
  

  // TODO get endpoint to get a student by using query param of studentId
  app.get('/', function(req, res) {
    // store query param student id in a variable
    var studentId = req.query.studentId;
    
    // TODO make sure student id is valid / provided
    if (!studentId) {

    }

    // TODO check if student id is in the database
    if (!(studentId in studentDatabase)) {
    } 

    // TODO respond the data in json format
  });


  // TODO a post endpoint t ocreate student and store them in databse
  app.post('/', function(req, res) {
    var body = req.body;

    // store the student infromation in variables 
    var studentId = body['studentId'];
    var studentName = body['studentName'];

    // TODO check if student id is valid
    if (!studentId) {
    }

    // TODO studentId is in the database, make sure there is no conflict
    if (studentId in studentDatabase) {
    }

    var student = {
      "studentId" : studentId,
      "studentName" : studentName
    };

    // store student into the database, key : studentId
    studentDatabase[studentId] = student;

    // TODO response to client

  });

  app.delete('/', function(req, res) {
    var body = req.body;

    var studentId = body['studentId'];
    if (!(studentId in studentDatabase)) {
      res.status(404).json({
        code: 404,
        message: "Not found. Student is not found in the database"
      });
      return;
    }

    delete studentDatabase[studentId];

    res.json({
      message: "Successfully delete student (" + studentId + ")"
    });
  });
};
