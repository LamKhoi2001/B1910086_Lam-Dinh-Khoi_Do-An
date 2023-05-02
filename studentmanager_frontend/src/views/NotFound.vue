<template>

    <div class="page">
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
        <p class="text-center">
            Oops, không thể tìm thấy trang. Trở về
            <router-link to="/">Trang chủ.</router-link>
        </p>
    </div>
</template>