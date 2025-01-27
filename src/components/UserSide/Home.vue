<template>
    <div class="['content', { 'content-expanded': !isSidebarVisible }]">
        <div class="cards">
            <div class="card">
                <div class="con-container">
                    <div class="contact-info">
                        <h2>Status update</h2>
                        <div v-if="isLoading">
                            <p>Loading status...</p>
                        </div>

                        <div v-if="errorMessage" class="error">
                            <p>{{ errorMessage }}</p>
                        </div>

                        <!-- Show status updates or comment based on the status -->
                        <div class="admin-respond" v-if="status === 'Responded'">
                            <h4>Admin Respond</h4>
                            <p class="comment-box"> {{ comment }}</p>

                            <!-- <p>Your inquiry message: {{ inquiryMessage }}</p> -->
                        </div>

                        <div v-else>
                            <div v-if="statusUpdateVisible">
                                <div class="timeline-container">
                                    <div class="code">
                                        <h3>Code: {{ code }}</h3>
                                        <!-- <p>Save our code for status checking without logging in.</p> -->
                                    </div>

                                    <div class="timeline-item" :class="{ active: isActive('On-Going') }">
                                        <div class="timeline-dot"></div>
                                        <div class="timeline-content">
                                            <p class="timeline-location">Device Received</p>
                                            <p v-if="onGoingUpdatedAt">Updated on: {{ formattedOnGoingUpdatedAt }} <br>Your repair status is: On-going</p>
                                            <p v-else>Not Yet available</p>
                                        </div>
                                    </div>

                                    <div class="timeline-item" :class="{ active: isActive('Finished') }">
                                        <div class="timeline-dot"></div>
                                        <div class="timeline-content">
                                            <p class="timeline-location">Repair Finished</p>
                                            <p v-if="finishedUpdatedAt || finishedStatusAvailable">Updated on: {{ formattedFinishedUpdatedAt }} <br>Your device has been successfully repaired.</p>
                                            <p v-else>Not Yet available</p>
                                        </div>
                                    </div>

                                    <div class="timeline-item" :class="{ active: isActive('Ready-for-Pickup') }">
                                        <div class="timeline-dot"></div>
                                        <div class="timeline-content">
                                            <p class="timeline-location">Ready for Pickup</p>
                                            <p v-if="readyForPickupUpdatedAt">Updated on: {{ formattedReadyForPickupUpdatedAt }} <br>Our shop is open from 9 AM to 5 PM.<br>You can pick up your device from our shop at any time now.</p>
                                            <p v-else>Not Yet available</p>
                                        </div>
                                    </div>

                                    <div class="timeline-item" :class="{ active: isActive('Completed') }">
                                        <div class="timeline-dot"></div>
                                        <div class="timeline-content">
                                            <p class="timeline-location">Repair Completed</p>
                                            <p v-if="completedUpdatedAt">Updated on: {{ formattedCompletedUpdatedAt }} <br>The device has been successfully returned, and the process is now complete.</p>
                                            <p v-else>Not Yet available</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="card2">
                <div class="content-container">
                    <h1>WE OFFER</h1>
                    <div class="cards1">
                        <!-- Services -->
                        <div class="side-card">
                            <div class="card1" @click="goToContactUs('Computer Service & Repair')">
                                <div class="img">
                                    <img src="../../assets/computer-repair.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Computer Service & Repair</h2>
                                    <p>Expert computer service and repair to fix hardware, software, and performance issues quickly and efficiently.</p>
                                </div>
                            </div>

                            <div class="card1" @click="goToContactUs('Free: Check up for Laptop & Desktop')">
                                <div class="img">
                                    <img src="../../assets/Laptop-check.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Free: Check up for Laptop & Desktop</h2>
                                    <p>Get a free check-up for your laptop or desktop to ensure optimal performance and catch potential issues early.</p>
                                </div>
                            </div>
                        </div>

                        <!-- More Services -->
                        <div class="side-card">
                            <div class="card1" @click="goToContactUs('Software and Hardware Installation')">
                                <div class="img">
                                    <img src="../../assets/hardware-installation.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Software and Hardware Installation</h2>
                                    <p>Professional software and hardware installation services to ensure your devices are set up and running smoothly.</p>
                                </div>
                            </div>

                            <div class="card1" @click="goToContactUs('Reformat & Reprogram')">
                                <div class="img">
                                    <img src="../../assets/reset.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Reformat & Reprogram</h2>
                                    <p>Reliable reformat and reprogram services to restore your system’s performance and resolve software issues.</p>
                                </div>
                            </div>
                        </div>

                        <!-- More Services -->
                        <div class="line-card">
                            <div class="card1" @click="goToContactUs('Remove Viruses and Malware')">
                                <div class="img">
                                    <img src="../../assets/remove-viruses.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Remove Viruses and Malware</h2>
                                    <p>Effective virus and malware removal to protect your device and restore its security and performance.</p>
                                </div>
                            </div>

                            <div class="card1" @click="goToContactUs('Networking')">
                                <div class="img">
                                    <img src="../../assets/networking.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Networking</h2>
                                    <p>Expert networking solutions for seamless connectivity, setup, and troubleshooting of your home or office network.</p>
                                </div>
                            </div>

                            <div class="card1" @click="goToContactUs('CCTV Installation')">
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
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToast } from 'vue-toastification'; 
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';

const code = ref('');
const status = ref(null);
const onGoingUpdatedAt = ref(null);
const finishedUpdatedAt = ref(null);
const readyForPickupUpdatedAt = ref(null);
const completedUpdatedAt = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);
const finishedStatusAvailable = ref(false); // New reactive variable


const router = useRouter();
const authStore = useAuthStore();
const token = authStore.access_token;
const toast = useToast();
const comment = ref('');

const goToContactUs = (serviceTitle) => {
  if (!authStore.isAuthenticated) {
    toast.error('Please log in before proceeding', { timeout: 3000 });
    router.push('/login');
  } else {
    router.push({
      name: 'contact',
      query: { service: serviceTitle },
    });
  }
};

const statusUpdateVisible = ref(true);

const fetchHomeStatus = async () => {
  status.value = null;
  onGoingUpdatedAt.value = null;
  finishedUpdatedAt.value = null;
  readyForPickupUpdatedAt.value = null;
  completedUpdatedAt.value = null;
  comment.value = '';
  code.value = '';
  errorMessage.value = '';
  isLoading.value = true;
  finishedStatusAvailable.value = false; // Reset on each fetch
  try {
      
      const headers = getHeaderConfig(token);
      const response = await axios.get(`${BASE_URL}/customer-details/home/status`, headers);
      console.log(response)
      status.value = response.data.data.status;
      onGoingUpdatedAt.value = response.data.data.on_going_updated_at;
      finishedUpdatedAt.value = response.data.data.finished_updated_at;
      readyForPickupUpdatedAt.value = response.data.data.ready_for_pickup_updated_at;
      completedUpdatedAt.value = response.data.data.completed_updated_at;
      code.value = response.data.data.code;

    // Check if the comment exists and is not empty
      comment.value = response.data.data.comment && response.data.data.comment.trim() ? response.data.data.comment : '';
      if (status.value === 'Ready-for-Pickup' && !finishedUpdatedAt.value) {
        finishedStatusAvailable.value = true; // Set to available if condition met
      }

      // Check if status is "Responded", hide status updates
      if (status.value === "Responded") {
            statusUpdateVisible.value = false;  // Hide status updates when "Responded"
        } else {
            statusUpdateVisible.value = true;   // Show status updates for all other statuses
        }
   
  } catch (error) {
    errorMessage.value = 'No status found.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchHomeStatus);

const formattedOnGoingUpdatedAt = computed(() => formatDate(onGoingUpdatedAt.value));
const formattedFinishedUpdatedAt = computed(() => formatDate(finishedUpdatedAt.value));
const formattedReadyForPickupUpdatedAt = computed(() => formatDate(readyForPickupUpdatedAt.value));
const formattedCompletedUpdatedAt = computed(() => formatDate(completedUpdatedAt.value));

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  }
  return '';
};

const isActive = (checkStatus) => {
  const order = ['On-Going', 'Finished', 'Ready-for-Pickup', 'Completed'];
  const currentIndex = order.indexOf(status.value);
  const checkIndex = order.indexOf(checkStatus);
  return checkIndex <= currentIndex;
};

</script>

<style scoped>
.cards {
    display: flex;
    margin-top: 6pc;
    margin-bottom: 2pc;
    gap: 30px;
    width: 100%;
    align-items: stretch;
    transition: all 0.5s ease;
    margin-left: 20px;
    padding-right: 2.3pc;
    position: relative;
    
    .card {
        padding: 50px;
        background-color: var(--header);
        color: var(--light2);
        /* box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.322); */
        border-radius: 20px;
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        height: 100vh;

        position: sticky;
        top: 6pc;
        z-index: 10;

        .con-container {
            display: flex;
            align-items: start;
            width: auto;
            transition: all 0.3s ease-out;
        }

        .contact-info {

            button {
                background-color: var(--main);
                color: white;
                border: none;
                border-radius: 3px;
                margin-left: 10px;
                padding: 1px 8px;
                font-size: 16px;
                cursor: pointer;
            }

            input {
                font-family: 'Poppins';
                width: 400px;
                padding: 10px;
                margin-top: 5px;
                margin-bottom: 15px;
                border-radius: 5px;
                border: 1px solid #ccc;
                outline: none;

                &:focus {
                border: 1px solid var(--header);
                }
            }

            .code {
                padding-bottom: 20px;

                p {
                    font-size: 12px;
                }
            }

            .timeline-container {
                display: flex;
                flex-direction: column;
                gap: 0px;
                margin-top: 20px;
            }

            .timeline-item {
                display: flex;
                align-items: center;
                position: relative;
                padding-left: 40px;
                margin-bottom: 20px;

                &.active .timeline-dot {
                background-color: #4CAF50;
                }
            }

            .timeline-dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #ccc;
                position: absolute;
                left: 0;
            }

            .timeline-content {
                p {
                margin: 0;
                }

                .timeline-location {
                font-weight: bold;
                font-size: 18px;
                }
            }
        }

    }
    .card2 {
        flex: 1;
        padding: 25px;
        color: var(--light2);
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        background-color: var(--header);
        border-radius: 20px;

        flex-grow: 1;
        padding: 20px;

        .card1 {
            flex: 1;
            padding: 25px;
            color: var(--light2);
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            background-color: var(--header);
            border-radius: 20px;
            cursor: pointer;

            &:hover {
                background-color: var(--main-hover);
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
        }
    }

    .admin-respond {
        padding: 15px 0;
    }

    .comment-box {
        background-color: #f3f3f3;
        padding: 15px;
        border-left: 4px solid #4CAF50;
        border-radius: 5px;
        margin-top: 10px;
        font-style: italic;
        font-size: 16px;
        color: #333;
        max-width: 100%;
        word-wrap: break-word;
    }

}

</style>