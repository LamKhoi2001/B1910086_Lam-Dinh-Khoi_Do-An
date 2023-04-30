<template>
    <nav class="navbar navbar-expand bg-dark">
        <a href="/" class="navbar-brand">Ứng Dụng Quản Lý Sinh Viên</a>
        <Search v-model="searchText"/>
    </nav>
    <div class="container bg-light">
        <div class="page row bg-info">
            <div class="mt-3 col-md-12">
                <h4>
                    Sinh Viên
                    <i class="fas fa-address-book"></i>
                </h4>
                <StudentList
                    v-if="filteredStudentsCount > 0"
                    :students="filteredStudents"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có sinh viên nào.</p>
                <div class="mt-3 row justify-content-around align-items-center">
                    <button class="btn btn-sm btn-warning" @click="refreshList()">
                        <i class=""></i> Làm mới
                    </button>
                    <button class="btn btn-sm btn-success" @click="goToAddStudent">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button> 
                    <button class="btn btn-sm btn-danger" @click="removeAllStudents">
                        <i class="fas fa-trash-alt"></i> Xóa tất cả
                    </button>
                </div>
            </div>
            <div class="mt-3 col-md-12">
                <div v-if="activeStudent">
                    <h4 class="text-center">
                        Thông Tin Sinh Viên
                        <i class="fas fa-address-card"></i>
                    </h4>
                    <StudentCard :student="activeStudent" />
                    <router-link
                        :to="{
                            name: 'student.edit',
                            params: { id: activeStudent._id },
                        }"
                    >
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StudentCard from "@/components/StudentCard.vue";
import Search from "@/components/Search.vue";
import StudentList from "@/components/StudentList.vue";
import StudentService from "@/services/student.service";

export default {
    components: {
        StudentCard,
        Search,
        StudentList,
    },
    data() {
        return {
            students: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        studentStrings() {
            return this.students.map((student) => {
                const { name, mssv, email, lop, khoa, nganh, phone, address } = student;
                return [name, mssv, email, lop, khoa, nganh, phone, address].join("");
            });
        },
        filteredStudents() {
            if (!this.searchText) return this.students;
            return this.students.filter((_student, index) =>
                this.studentStrings[index].includes(this.searchText)
            );
        },
        activeStudent() {
            if (this.activeIndex < 0) return null;
            return this.filteredStudents[this.activeIndex];
        },
        filteredStudentsCount() {
            return this.filteredStudents.length;
        },
    },
    methods: {
        async retrieveStudents() {
            try {
                this.students = await StudentService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveStudents();
            this.activeIndex = -1;
        },
        async removeAllStudents() {
            if (confirm("Bạn muốn xóa tất cả Sinh viên?")) {
                try {
                    await StudentService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddStudent() {
            this.$router.push({ name: "student.add"});
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 700px;
}
</style>