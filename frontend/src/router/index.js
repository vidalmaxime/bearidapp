import {createWebHistory, createRouter} from "vue-router";
import home from "../views/home/home.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: home,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/Register.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
