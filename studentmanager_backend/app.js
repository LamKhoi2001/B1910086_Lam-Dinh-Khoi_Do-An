const express = require("express");
const cors = require("cors");
const studentsRouter = require("./app/routes/student.route");
const ApiError = require("./app/api-error");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({message: "Chào mừng đến với ứng dụng quản lý sinh viên."});
});
app.use("/api/students", studentsRouter);
app.use((req, res, next) => {
    return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});
app.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Lỗi máy chủ nội bộ",
    });
});
module.exports = app;