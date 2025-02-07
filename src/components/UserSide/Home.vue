<template>
    <div class="['content', { 'content-expanded': !isSidebarVisible }]">
        <div class="cards">
            <div class="code-card">
                <div class="con-container">
                    <div class="contact-info">
                        <h2>Status update</h2>
                        <div v-if="isLoading">
                            <p>Loading status...</p>
                        </div>

                        <div v-if="errorMessage" class="error">
                            <p>{{ errorMessage }}</p>
                        </div>

                        <div class="user-inqui">
                            <h4>Your Inquiry:</h4>
                            <p class="comment-box">{{ description }}</p>
                            <p v-if="descriptionUpdatedAt" class="timestamp">Updated on: {{ formattedDescriptionUpdatedAt }}</p>
                        </div>

                        <div class="admin-respond" v-if="status === 'Responded' || status === 'On-Going' || status === 'Finished' || status === 'Ready-for-Pickup' || status === 'Completed'">
                            <h4>Admin Note:</h4>
                            <p class="comment-box">{{ comment }}</p>
                            <p v-if="adminCommentUpdatedAt" class="timestamp">Updated on: {{ formattedAdminCommentUpdatedAt }}</p>
                        </div>

                        <div class="admin-respond" v-if="status === 'Unrepairable'">
                            <h4>Unrepairable (Admin Reason)</h4>
                            <p class="comment-box">{{ comment }}</p>
                            <p v-if="adminCommentUpdatedAt" class="timestamp">Updated on: {{ formattedAdminCommentUpdatedAt }}</p>
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

            <div class="service-card">
                <div class="content-container">
                    <h1>Pick a Service</h1>
                    <div class="cards1">
                        <!-- Services -->
                        <div class="side-card">
                            <div class="card1"
                                @click="goToContactForm1('Computer Service & Repair')"
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


                            <div class="card1" @click="goToContactForm1('Free: Check up for Laptop & Desktop')">
                                
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
                            <div class="card1"@click="goToContactForm1('Software and Hardware Installation')">
                                
                                <div class="img">
                                    <img src="../../assets/hardware-installation.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Software and Hardware Installation</h2>
                                    <p>Professional software and hardware installation services to ensure your devices are set up and running smoothly.</p>
                                </div>
                            </div>

                            <div class="card1" @click="goToContactForm1('Reformat & Reprogram')">
                               
                                <div class="img">
                                    <img src="../../assets/reset.jpg" alt="Service Image" class="img-thumbnail" />
                                </div>
                                <div class="info">
                                    <h2>Reformat & Reprogram</h2>
                                    <p>Reliable reformat and reprogram services to restore your system’s performance and resolve software issues.</p>
                                </div>
                            </div>
                        </div>

                        <div class="side-card">
                            <div class="card1" @click="goToContactForm1('Remove Viruses and Malware')">
                               
                               <div class="img">
                                   <img src="../../assets/remove-viruses.jpg" alt="Service Image" class="img-thumbnail" />
                               </div>
                               <div class="info">
                                   <h2>Remove Viruses and Malware</h2>
                                   <p>Effective virus and malware removal to protect your device and restore its security and performance.</p>
                               </div>
                           </div>

                           <div class="card1" @click="goToContactUsForm3('Networking')">
                               
                               <div class="img">
                                   <img src="../../assets/networking.jpg" alt="Service Image" class="img-thumbnail" />
                               </div>
                               <div class="info">
                                   <h2>Networking</h2>
                                   <p>Expert networking solutions for seamless connectivity, setup, and troubleshooting of your home or office network.</p>
                               </div>
                           </div>
                        </div>

                        <!-- More Services -->
                        <div class="line-card">
                            <div class="card1" @click="goToContactUsForm3('CCTV Installation')">
                                
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
                <!-- <InquireModal
                    :isModalOpen="isInquireModalOpen"
                    :serviceTitle="selectedService"
                    @closeModal="closeInquireModal"
                    /> -->
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted  } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
// import InquireModal from '../UserSide/ContactUs.vue';

// const InquireModal = defineAsyncComponent(() => import("../UserSide/ContactUs.vue"));

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
const comment = ref('');
const description = ref('');
// const isInquireModalOpen = ref(false);
// const selectedService = ref('');

const descriptionUpdatedAt = ref(null);
const adminCommentUpdatedAt = ref(null);

const goToContactForm1 = (serviceTitle) => {
    router.push({
        name: 'form-1',
        query: { service: serviceTitle },
    });
};

const goToContactUsForm2 = (serviceTitle) => {
    router.push({
        name: 'form-2', 
        query: { service: serviceTitle }, 
    });
};

const goToContactUsForm3 = (serviceTitle) => {
    router.push({
        name: 'form-3', 
        query: { service: serviceTitle },
    });
};

const statusUpdateVisible = ref(true);

const fetchHomeStatus = async () => {
    status.value = null;
    onGoingUpdatedAt.value = null;
    finishedUpdatedAt.value = null;
    readyForPickupUpdatedAt.value = null;
    completedUpdatedAt.value = null;
    descriptionUpdatedAt.value = null;
    adminCommentUpdatedAt.value = null;
    comment.value = '';
    code.value = '';
    description.value = '';
    errorMessage.value = '';
    isLoading.value = true;
    finishedStatusAvailable.value = false;

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
        descriptionUpdatedAt.value = response.data.data.description_updated_at;
        adminCommentUpdatedAt.value = response.data.data.admin_comment_updated_at;

        comment.value = response.data.data.comment && response.data.data.comment.trim() ? response.data.data.comment : '';
        description.value = response.data.data.description && response.data.data.description.trim() ? response.data.data.description : '';
        
        if (status.value === 'Ready-for-Pickup' && !finishedUpdatedAt.value) {
            finishedStatusAvailable.value = true; // Set to available if condition met
        }

        if (status.value === "Responded") {
            statusUpdateVisible.value = false;  // Hide status updates when "Responded"
        } else {
            statusUpdateVisible.value = true;   // Show status updates for all other statuses
        }
    
    } catch (error) {
        errorMessage.value = 'No status found. Click Ticket to submit a question or request a repair.';
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchHomeStatus);

const formattedDescriptionUpdatedAt = computed(() => formatDate(descriptionUpdatedAt.value));
const formattedAdminCommentUpdatedAt = computed(() => formatDate(adminCommentUpdatedAt.value));

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
    
    .code-card {
        padding: 50px;
        background-color: var(--header);
        color: var(--light2);
        border-radius: 20px;
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        height: 120vh;

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
            width: 100%;

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
    .service-card {
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

        .side-card {
            display: flex;
        }

        h1 {
            margin-bottom: 4px;
            margin-top: 2px;
        }

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
        border-radius: 5px;
        margin-top: 10px;
        font-style: italic;
        font-size: 16px;
        color: #333;
        max-width: 100%;
        word-wrap: break-word;
    }
}

@media (max-width: 500px) {
    .cards {
        display: flex;
        flex-direction:column;
        position: unset;
        
        .card {
            height: 100vh;
            position: unset;

        }
        .service-card {
            .cards1 {
                padding: 0 30px;
                .card1 {
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
    }
}
@media (max-width: 700px) {
    .dropdown {
    position: relative;
    display: inline-block;
    
    .dropdown-content {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        background-color: white;
        width: 150px;
        right: 0;
        border-radius: 8px;
        transform: translateY(-50px);
        display: contents;
        transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        }
    }

        .cards {
        display: flex;
        flex-direction:column;
        position: unset;
        
        .card {
            height: 100vh;
            position: unset;

            .con-container {
                text-align: center;
            }
        }
    }
}

</style>