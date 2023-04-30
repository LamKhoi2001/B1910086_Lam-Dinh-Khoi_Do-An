const StudentService = require("../services/student.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name cannot be empty"));
  }

  try {
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occured " + req.body.email));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const studentService = new StudentService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await studentService.findByName(name);
    } else {
      documents = await studentService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occured "));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Student not found "));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Error retrieving student id: ${req.params.id}`));
  }

  // res.send({ message: "findOne" });
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(404, "Data to update can not be empty"));
  }

  try {
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.update(req.params.id, req.body);
    return res.send("student was updated successfully");
  } catch (error) {
    return next(new ApiError(500, `Error updating student id: ${req.params.id}`));
  }
  // res.send({ message: "update" });
};

exports.delete = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const document = await studentService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Student not found "));
    }
    res.send({ message: "student was deleted successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete student id: ${req.params.id}`));
  }

  // res.send({ message: "delete" });
};

exports.deleteAll = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const deleteCount = await studentService.deleteAll();
    return res.send({
      message: `delete all ${deleteCount} students.`,
    });
  } catch (error) {
    return next(new ApiError(500, `Error delete all students.`));
  }
  // res.send({ message: "deleteAll" });
};

exports.findAllFavorites = async (req, res, next) => {
  try {
    const studentService = new StudentService(MongoDB.client);
    const documents = await studentService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, `Error find all favorites.`));
  }
  // res.send({ message: "findAllFavorites" });
};
