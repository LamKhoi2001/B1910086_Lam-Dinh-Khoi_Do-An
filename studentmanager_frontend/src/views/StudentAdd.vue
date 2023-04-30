<template>
    <div v-if="student" class="page">
        <h4>Thêm Sinh Viên</h4>
        <StudentForm
            :student="student"
            @submit:student="addStudent"
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
    data() {
        return {
            student: null,
            message: "",
        };
    },
    methods: {
        async addStudent(data) {
            try {
                await StudentService.create(data);
                this.message = "Thêm sinh viên thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.student = {};
        this.message = "";
    },
};
</script>