module.exports = function(app) {
  
  // Note : Not a good practice to place logics in the routes.
  // Commonly each handler has its own js file.
  
  var studentDatabase = {};
  
  app.get('/', function(req, res) {
    var studentId = req.query.studentId;
    
    if (!studentId) {
      res.status(400).json({
        code: 400,
        message: "Bad Request. Invalid studentId"
      });
      return;
    }

    if (!(studentId in studentDatabase)) {
      res.status(404).json({
        code: 404,
        message: "Not Found. Student not found in the database."
      });
      return;
    } 

    res.json(studentDatabase[studentId]);
  });

  app.post('/', function(req, res) {
    var body = req.body;

    var studentId = body['studentId'];
    var studentName = body['studentName'];

    if (!studentId) {
      res.status(400).json({
        code: 400,
        message: "Bad Request. Invalid studentId"
      });
      return;
    }

    if (studentId in studentDatabase) {
      res.status(409).json({
        code: 409,
        message: "Conflict. StudentId already exists in the database."
      });
      return;
    }

    var student = {
      "studentId" : studentId,
      "studentName" : studentName
    };

    studentDatabase[studentId] = student;
    res.json({
      message: "Created student (" + studentId +")"
    });
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
