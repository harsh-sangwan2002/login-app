<template>
    <div class="bg-gradient-to-br from-blue-900 to-gray-900 text-white min-h-screen p-4">
        <h1 class="text-2xl font-bold mb-4">Listings</h1>

        <!-- Filter and Sort -->
        <div class="flex gap-4 mb-4">
            <input v-model="filter" type="text" placeholder="Search by name..." class="border rounded p-2" />
            <select v-model="sortKey" class="border rounded p-2">
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
            </select>
        </div>

        <!-- Listings -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="item in paginatedItems" :key="item.id"
                class="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition transform hover:scale-105">
                <!-- Display Image -->
                <div class="w-full h-56 overflow-hidden rounded-lg mb-4">
                    <img :src="item.image" alt="Item Image" class="w-full h-full object-cover" />
                </div>
                <h2 class="font-bold text-lg">{{ item.name }}</h2>
                <p class="text-gray-400">Price: ${{ item.price }}</p>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
                Previous
            </button>
            <p>Page {{ currentPage }} of {{ totalPages }}</p>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Sample data or fetch it from an API
const items = ref([]);
const filter = ref('');
const sortKey = ref('name');
const currentPage = ref(1);
const itemsPerPage = 3;
const router = useRouter();
const pexelsApiKey = 'hnMkPlz0aQQtkGNRt14zfj3XEOt07tZjkNbERPiWAvK8tZqK1CRuMO7V'; // Replace with your Pexels API Key

// Fetch Pexels images and mock item data
const fetchItems = async () => {
    try {
        const response = await axios.get('https://api.pexels.com/v1/curated', {
            headers: {
                Authorization: pexelsApiKey,
            },
        });

        // Mock data - use actual fetched data here
        items.value = response.data.photos.map((photo, index) => ({
            id: index + 1,
            name: `Item ${index + 1}`,
            price: Math.floor(Math.random() * 500) + 50, // Random price
            image: photo.src.medium, // Use image URL from Pexels
        }));
    } catch (error) {
        console.error('Error fetching Pexels images:', error);
    }
};

// Filter and sort items
const filteredAndSortedItems = computed(() => {
    let filtered = items.value.filter((item) =>
        item.name.toLowerCase().includes(filter.value.toLowerCase())
    );

    if (sortKey.value === 'name') {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey.value === 'price') {
        filtered = filtered.sort((a, b) => a.price - b.price);
    }

    return filtered;
});

// Paginate items
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedItems.value.slice(start, end);
});

const totalPages = computed(() =>
    Math.ceil(filteredAndSortedItems.value.length / itemsPerPage)
);

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

// Ensure that localStorage is accessed only on the client-side
if (process.client) {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        router.push('/login');
    }
}

// Fetch items on component mount
onMounted(fetchItems);
</script>

<style scoped>
/* You can add custom styles for cards, etc., if necessary */
</style>