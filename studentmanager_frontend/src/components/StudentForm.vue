<template>
    <div class="bg-info">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng Dụng Quản Lý Sinh Viên</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'studentmanager' }" class="nav-link">
                    Trở về Danh sách sinh viên
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
    <div class="container">
    <Form
        @submit="submitStudent"
        :validation-schema="studentFormSchema"
    >
        <div class="form-group">
            <label for="name">Họ & Tên SV</label>
            <Field
            name="name"
            type="text"
            class="form-control"
            v-model="studentLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="mssv">Mã Số SV</label>
            <Field
            name="mssv"
            type="text"
            class="form-control"
            v-model="studentLocal.mssv"
            />
            <ErrorMessage name="mssv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field
            name="email"
            type="email"
            class="form-control"
            v-model="studentLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="lop">Lớp</label>
            <Field
            name="lop"
            type="text"
            class="form-control"
            v-model="studentLocal.lop"
            />
            <ErrorMessage name="lop" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="khoa">Khóa</label>
            <Field
            name="khoa"
            type="text"
            class="form-control"
            v-model="studentLocal.khoa"
            />
            <ErrorMessage name="khoa" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="nganh">Ngành</label>
            <Field
            name="nganh"
            type="text"
            class="form-control"
            v-model="studentLocal.nganh"
            />
            <ErrorMessage name="nganh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field
            name="phone"
            type="tel"
            class="form-control"
            v-model="studentLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
            name="address"
            type="text"
            class="form-control"
            v-model="studentLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="studentLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Đánh dấu sinh viên</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-danger">Lưu</button>
                <button
                    v-if="studentLocal._id"
                    type="button"
                    class="ml-2 btn btn-danger"
                    @click="deleteStudent"> Xóa
            </button>
        </div>
    </Form>
</div>
</div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:student", "delete:student"],
    props: {
        student: { type: Object, required: true }
    },
    data() {
        const studentFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Vui lòng nhập họ tên sinh viên.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            mssv: yup
                .string()
                .required("Vui lòng nhập mã số sinh viên.")
                .min(8, "Mã số phải có ít nhất 8 ký tự."),     
            email: yup
                .string()
                .required("Vui lòng nhập email sinh viên.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),

            lop: yup
                .string()
                .required("Vui lòng nhập mã lớp (Ví dụ: DI19V7A1).")
                .min(8, "Mã lớp phải ít nhất 8 ký tự."),
            khoa: yup
                .string()
                .required("Vui lòng nhập khóa học (Ví dụ: K45).")
                .min(3, "Tên khóa phải ít nhất 3 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            nganh: yup
                .string()
                .required("Vui lòng nhập tên ngành.")
                .min(2, "Tên ngành phải ít nhất 2 ký tự."),            
            phone: yup
                .string()
                .required("Vui lòng nhập số điện thoại.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            address: yup
                .string()
                .required("Vui lòng nhập địa chỉ.")
                .max(200, "Địa chỉ tối đa 200 ký tự."),
        });
        return {
            studentLocal: this.student,
            studentFormSchema,
        };
    },
    methods: {
        submitStudent() {
            this.$emit("submit:student", this.studentLocal);
        },
        deleteStudent() {
            this.$emit("delete:student", this.studentLocal.id);
        },
    },
};
</script>

<style scoped>
    @import "@/assets/form.css";
</style>