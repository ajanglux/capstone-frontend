<template>
  <div class="content-container">
    <h1>WE OFFER</h1>

    <div v-if="errors" class="error">
      {{ errors }}
    </div>

    <div v-else class="cards">
      <div v-for="service in services" :key="service.id" class="card">
        <div class="img">
          <img :src="service.image_url" alt="Service Image" class="img-thumbnail" />
        </div>
        <div class="info">
          <h2>{{ service.service_title }}</h2>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';

const services = ref([]);
const errors = ref(null);

const fetchServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services`);
    services.value = response.data.data;
  } catch (error) {
    errors.value = error.response?.data?.message || 'Error fetching services';
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  background: var(--header);
  min-height: 100vh;
  width: 100vw;

  h1 {
    font-family: 'Poppins';
    font-size: 3.5em;
    margin: 100px 0 18px 40px;
    color: var(--light);
  }

  .error {
    text-align: center;
  }
}

.cards {
  display: grid;
  justify-content: center;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 30px;
  padding: 0 100px;
  margin-bottom: 30px;
  height: 50%;
  align-items: stretch;
  transition: all 0.5s ease;

  .card {
    flex: 1;
    padding: 20px;
    color: var(--light2);
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;

    &:hover {
      background-color: var(--main-hover);
      border-radius: 20px;
    }

    .img {
      width: 100%;
      margin-bottom: 10px;

      img {
        width: 100%;
        height: 350px;
        object-fit: cover;
        object-position: center;
        align-content: center;
        border-radius: 10px;
      }
    }

    .info {
      h2 {
        font-size: 35px;
      }
    }
  }
}

@media (max-width: 1265px) {
  .cards {
    gap: 20px;

    .card {
      .img {
        img {
          height: 300px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .cards {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;

    .card {
      .img {
        img {
          height: 400px;
        }
      }
    }
  }
}

@media (max-width: 570px) {
  .content-container {
    h1 {
      font-size: 3em;
    }
  }

  .cards {
    padding: 0 50px;
  }
}

@media (max-width: 500px) {
  .content-container {
    h1 {
      font-size: 2.5em;
      margin: 90px 0 18px 40px;
      color: var(--light);
    }
  }
  .cards {
    padding: 0 30px;

    .card {
      .img {
        img {
          height: 300px;
        }
      }

      .info {
        h2 {
          font-size: 26px;
          padding-bottom: 5px;
        }
      }
    }
  }
}
</style>