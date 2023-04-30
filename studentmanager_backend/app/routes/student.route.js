const express = require("express");
const students = require("../controllers/student.controller");

const router = express.Router();

router.route("/").get(students.findAll).post(students.create).delete(students.deleteAll);

router.route("/favorites").get(students.findAllFavorites);

router.route("/:id").get(students.findOne).put(students.update).delete(students.delete);

module.exports = router;