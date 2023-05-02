<template>
    <div v-if="student" class="page">
        <h4>Chỉnh Sửa Thông Tin</h4>
        <StudentForm
            :student="student"
            @submit:student="updateStudent"
            @delete:student="deleteStudent"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import StudentForm from "@/components/StudentForm.vue";
import StudentService from "@/services/student.service";
export default {
    components: {
        StudentForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            student: null,
            message: "",
        };
    },
    methods: {
        async getStudent(id) {
            try {
                this.student = await StudentService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateStudent(data) {
            try {
                await StudentService.update(this.student._id, data);
                this.message = "Thông tin sinh viên được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteStudent() {
            if (confirm("Bạn muốn xóa sinh viên này?")) {
                try {
                    await StudentService.delete(this.student._id);
                    this.$router.push({ name: "studentmanager" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getStudent(this.id);
        this.message = "";
    },
};
</script>