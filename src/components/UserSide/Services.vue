<template>
  <div class="content-container">
    <h1>WE OFFER</h1>

    <!-- <div v-else class="cards">
      <div v-for="service in services" :key="service.id" class="card">
        <div class="img">
          <img :src="service.image_url" alt="Service Image" class="img-thumbnail" />
        </div>
        <div class="info">
          <h2>{{ service.service_title }}</h2>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div> -->

    <div class="cards">
      <div class="side-card">
        <div
          class="card"
          @click="goToContactUs('Computer Service & Repair')"
        >
          <div class="img">
            <img src="../../assets/computer-repair.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>Computer Service & Repair</h2>
            <p>
              Expert computer service and repair to fix hardware, software, and performance issues
              quickly and efficiently.
            </p>
          </div>
        </div>

        <div class="card"
        @click="goToContactUs('Free: Check up for Laptop & Desktop')"
        >
          <div class="img">
            <img src="../../assets/Laptop-check.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>Free: Check up for Laptop & Desktop</h2>
            <p>Get a free check-up for your laptop or desktop to ensure optimal performance and catch potential issues early.</p>
          </div>
        </div>
      </div>

      <div class="side-card">
        <div class="card"
        @click="goToContactUs('Software and Hardware Installation')"
        >
          <div class="img">
            <img src="../../assets/hardware-installation.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>Software and Hardware Installation</h2>
            <p>Professional software and hardware installation services to ensure your devices are set up and running smoothly.</p>
          </div>
        </div>

        <div class="card"
        @click="goToContactUs('Reformat & Reprogram')"
        >
          <div class="img">
            <img src="../../assets/reset.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>Reformat & Reprogram</h2>
            <p>Reliable reformat and reprogram services to restore your system’s performance and resolve software issues.</p>
          </div>
        </div>
      </div>

      <div class="line-card">
        <div class="card"
        @click="goToContactUs('Remove Viruses and Malware')"
        >
          <div class="img">
            <img src="../../assets/remove-viruses.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>Remove Viruses and Malware</h2>
            <p>Effective virus and malware removal to protect your device and restore its security and performance.</p>
          </div>
        </div>

        <div class="card"
        @click="goToContactUs('Networking')"
        >
          <div class="img">
            <img src="../../assets/networking.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>Networking</h2>
            <p>Expert networking solutions for seamless connectivity, setup, and troubleshooting of your home or office network.</p>
          </div>
        </div>

        <div class="card"
        @click="goToContactUs('CCTV Installation')"
        >
          <div class="img">
            <img src="../../assets/cctv.jpg" alt="Service Image" class="img-thumbnail" />
          </div>
          <div class="info">
            <h2>CCTV Installation</h2>
            <p>Enhancing security with professional setup of surveillance systems for homes and businesses.</p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToast } from 'vue-toastification'; 

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const goToContactUs = (serviceTitle) => {
  if (!authStore.isAuthenticated) {
    // Show popup and redirect to login page if not logged in
    toast.error('Please log in before proceeding', { timeout: 3000 });
    router.push('/login'); // Redirect to login or registration page
  } else {
    router.push({
      name: 'contact',
      query: { service: serviceTitle },
    });
  }
};

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
  // display: grid;
  // flex-direction: column;
  // justify-content: center;
  // align-items: start;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-template-columns: auto;
  // gap: 35px;
  // padding: 0 130px;
  // margin-bottom: 30px;
  // height: 50%;
  // align-items: stretch;

  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 0 130px;
  margin-bottom: 30px;
  transition: all 0.5s ease;

  .side-card, .line-card {
    display: flex;
    flex-direction: row;
    gap: 35px;
  }

  // .line-card {
    .card {
      flex: 1;
      padding: 25px;
      color: var(--light2);
      transition: all 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      background-color: var(--main-hover);
      border-radius: 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--main);
        border-radius: 20px;
      }

      .img {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 330px;
          object-fit: cover;
          object-position: center;
          align-content: center;
          border-radius: 10px;
        }
      }

      .info {
        h2 {
          font-size: 20px;
        }

        p {
          font-size: 15px;
        }
      }
    // }
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
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .side-card, .line-card {
      display: flex;
      flex-direction: column;
      gap: 35px;
    }
  }
}

@media (max-width: 768px) {
  .cards {
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

    .card {
      padding: 20px;

      .info {
        h2 {
          font-size: 18px;
        }

        p {
          font-size: 14px;
        }
      }
    }
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
          height: 260px;
        }
      }

      .info {
        h2 {
          font-size: 18px;
          padding-bottom: 5px;
        }

        p {
          font-size: 13px;
        }
      }
    }
  }
}
</style>