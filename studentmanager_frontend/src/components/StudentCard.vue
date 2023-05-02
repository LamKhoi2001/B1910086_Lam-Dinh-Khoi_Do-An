<script>
    export default {
        props: {
            student: { type: Object, required: true },
        },
    };
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Họ & Tên SV:</strong> {{ student.name }}
        </div>
        <div class="p-1">
            <strong>MSSV:</strong> {{ student.mssv }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong> {{ student.email }}
        </div>
        <div class="p-1">
            <strong>Lớp:</strong> {{ student.lop }}
        </div>
        <div class="p-1">
            <strong>Khóa:</strong> {{ student.khoa }}
        </div>
        <div class="p-1">
            <strong>Ngành:</strong> {{ student.nganh }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong> {{ student.phone }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong> {{ student.address }}
        </div>
        <div class="p-1">
            <strong>Đánh dấu sinh viên:&nbsp;</strong>
            <i v-if="student.favorite" class="fas fa-check-circle"></i>
            <i v-else class="fas fa-times-circle"></i>
        </div>
    </div>
</template>