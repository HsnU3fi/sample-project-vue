
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home/Home.vue';
import LoginView from '../views/login/Login.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            beforeEnter(to, from, next) {
                const userData = localStorage.getItem("userData");
                if (userData) {
                    next("/");
                } else {
                    next();
                }
            }
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter(to, from, next) {
                const userData = localStorage.getItem("userData");
                if (!userData) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
    ],
});

export default router;