<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white">
        <form @submit.prevent="handleLogin" class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-gray-800">
            <h1 class="text-2xl font-bold text-center text-gray-900 mb-6">Login</h1>
            <div class="mb-4">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email:</label>
                <input type="email" id="email" v-model="email" placeholder="Enter your email"
                    class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required />
            </div>
            <div class="mb-4">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Enter your password"
                    class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required />
            </div>
            <p v-if="errorMessage" class="text-sm text-red-500 mb-4">{{ errorMessage }}</p>
            <button type="submit"
                class="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
            </button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
    if (!email.value || !password.value) {
        errorMessage.value = 'Both fields are required.';
        return;
    }
    if (!validateEmail(email.value)) {
        errorMessage.value = 'Invalid email format.';
        return;
    }

    // Mock API request for authentication
    const mockCredentials = { email: 'user@example.com', password: 'password123' };
    if (email.value === mockCredentials.email && password.value === mockCredentials.password) {
        localStorage.setItem('authToken', 'mock-token'); // Save mocked token
        router.push('/listings'); // Redirect to the listings page
    } else {
        errorMessage.value = 'Invalid email or password.';
    }
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
</script>