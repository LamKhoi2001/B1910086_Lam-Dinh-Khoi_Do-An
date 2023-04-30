const { ObjectId } = require("mongodb");
class StudentService {
  constructor(client) {
    this.Student = client.db().collection("students");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractStudentData(payload) {
    const student = {
      name: payload.name,
      mssv: payload.mssv,
      email: payload.email,
      lop: payload.lop,
      khoa: payload.khoa,
      nganh: payload.nganh,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    // Remove undefined fields
    Object.keys(student).forEach((key) => student[key] === undefined && delete student[key]);
    return student;
  }

  async create(payload) {
    const student = this.extractStudentData(payload);
    const result = await this.Student.findOneAndUpdate(student, { $set: { favorite: student.favorite === true } }, { returnDocument: "after", upsert: true });
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Student.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Student.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractStudentData(payload);
    const result = await this.Student.findOneAndUpdate(filter, { $set: update }, { returnDocument: "after" });
    return result.value;
  }

  async delete(id) {
    const result = await this.Student.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  
  async deleteAll() {
    const result = await this.Student.deleteMany({});
    return result.deletedCount;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }
}
module.exports = StudentService;
