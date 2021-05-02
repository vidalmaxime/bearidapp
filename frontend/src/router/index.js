import { createWebHistory, createRouter } from "vue-router";
import home from "../views/home/home.vue";
import inference from "../views/inference/inference.vue";
// import Login from '../components/Login.vue'
// import Register from '../components/Register.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: home,
    },
    {
        path: "/inference/:animal",
        name: "inference",
        component: inference,
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