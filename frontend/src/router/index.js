import {createWebHistory, createRouter} from "vue-router";
import home from "../views/home/home.vue";
import firebase from "firebase";

const routes = [
    {
        path: "/",
        name: "home",
        component: home,
        meta: {
            requiresAuth: true
        }
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
    // {
    //     path:'*',
    //     redirect:'/'
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requireAuth && !currentUser){
        next({ name: 'Login'});
    }
    else if(!requireAuth && currentUser){
        next({ name: 'home'});
    }
    else {
        next();
    }
});


export default router;
