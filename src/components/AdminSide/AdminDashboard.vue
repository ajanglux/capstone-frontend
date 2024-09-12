<template>
    <div class="content">
        <div class="cards">
            <div class="card">
                <div class="info">
                    <p> Total Number of Pending Repairs </p>
                    <h1> 12 </h1>
                </div>
            </div>

            <div class="card">
                <div class="info">
                    <p> Total Number of Inquiries </p>
                    <h1> 23 </h1>
                </div>
            </div>

            <div class="card">
                <div class="info">
                    <p> Total Number of Services </p>
                    <h1> 23 </h1>
                </div>
            </div>

            <div class="card">
                <div class="info">
                    <p> Total Number of Clients </p>
                    <h1> 23 </h1>
                </div>
            </div>
        </div>

        <div class="charts">
            <div class="pie-chart">
                <h1> Total ewan </h1>
                <div class="pie">
                    <PieChart />
                </div>
            </div>
            <div class="bar-chart">
                <h1> Total ewan </h1>
                <div class="bar">
                    <BarChart />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '../layouts/BarChart.vue';
import PieChart from '../layouts/PieChart.vue';

export default {
  name: 'App',
  components: { BarChart, PieChart }
}
    
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
        border-radius: 5px;
        background-color: var(--grey);
        color: var(--light2);
        box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.322);
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;

        }
    }
}

.charts {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    padding: 40px 0;
    gap: 15px;
    width: 100%;

    .pie-chart {
        background-color: var(--white);
        padding: 30px;
        width: 100%;
        border-radius: 10px;

        .pie {
            width: 50%;
            margin-inline: auto;
        }
    }

    .bar-chart {
        background-color: var(--white);
        padding: 30px;
        width: 100%;
        border-radius: 10px;

        .bar {
            width: 100%;
        }
    }
}

</style>