import { createWebHistory, createRouter } from "vue-router";
import StudentManager from "@/views/StudentManager.vue";

const routes = [
    {
        path: "/",
        name: "studentmanager",
        component: StudentManager,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/students/:id",
        name: "student.edit",
        component: () => import("@/views/StudentEdit.vue"),
        props: true
    },
    {
        path: "/students/add",
        name: "student.add",
        component: () => import("@/views/StudentAdd.vue"),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;