<template>
    <div :class="['content', { 'content-expanded': !isSidebarVisible }]">
        <div class="cards">
            <div class="card">
                <div class="img">
                </div>
                <div class="info">
                    <h1> Sample </h1>
                    <p> sample ulit kasi ayoko na ng yoko </p>
                </div>
            </div>

            <div class="card">
                <div class="img">
                </div>
                <div class="info">
                    <h1> Sample </h1>
                    <p> sample ulit kasi ayoko na ng yoko </p>
                </div>
            </div>

            <div class="card">
                <div class="img">
                </div>
                <div class="info">
                    <h1> Sample </h1>
                    <p> sample ulit kasi ayoko na ng yoko </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { isSidebarVisible } from '../../stores/store.js';
</script>

<style scoped>
.cards {
    display: flex;
    gap: 30px;
    width: 100%;
    align-items: stretch;
    transition: all 0.5s ease;

    .card {
        width: 100%;
        flex: 1;
        padding: 20px;
        background-color: var(--grey);
        color: var(--light2);
        box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.322);
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
    }
}

</style>