export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('authToken');
    if (!token && to.path === '/listings') {
        return navigateTo('/login'); // Redirect to login
    }
});
