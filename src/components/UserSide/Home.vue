<template>
    <div class="['content', { 'content-expanded': !isSidebarVisible }]">
        <div class="cards">
            <div class="code-card">
                <div class="con-container">
                    <div class="contact-info">
                        <h3>Your Code: {{ code }}</h3>
                        <div v-if="isLoading">
                            <p>Loading status...</p>
                        </div>

                        <div v-if="errorMessage" class="error">
                            <p>{{ errorMessage }}</p>
                        </div>

                        <div class="user-inqui">
                            <h4>Your Inquiry:</h4>
                            <button v-for="repair in repairs" :key="repair.id" @click="viewRepair(repair)">
                                <i class="bx bx-show"></i>
                            </button>
                            <p class="comment-box">{{ description }}</p>
                            <p v-if="descriptionUpdatedAt" class="timestamp">Updated on: {{ formattedDescriptionUpdatedAt }}</p>
                        </div>

                        <div class="admin-respond" v-if="comments.length && status !== 'Unrepairable'">
                            <h4>Admin Notes:</h4>
                            <div v-for="(item, index) in comments" :key="item.id" class="comment-box">
                                <p>{{ item.comment }}</p>
                                <p class="timestamp">{{ formatDate(item.created_at) }}</p>
                            </div>
                        </div>

                        <div class="admin-respond" v-if="status === 'Unrepairable' && comments.length">
                            <h4>Unrepairable (Admin Note)</h4>
                            <div v-for="(item, index) in comments" :key="item.id" class="comment-box">
                                <p>{{ item.comment }}</p>
                                <p class="timestamp">{{ formatDate(item.created_at) }}</p>
                            </div>
                        </div>

                        <div v-else>
                            <div v-if="statusUpdateVisible">
                                <div class="timeline-container">
                                    <div class="code">
                                        <h2>Status Update</h2>
                                    </div>

                                    <div v-if="status === 'Cancelled' || status === 'Unrepairable'" class="status-message">
                                        <p v-if="status === 'Cancelled'">Repair Cancelled.</p>
                                    </div>

                                    <div v-else>
                                        <div v-if="!onGoingUpdatedAt && !finishedUpdatedAt && !finishedStatusAvailable && !readyForPickupUpdatedAt && !completedUpdatedAt">
                                            <p class="no-updates-message">No updates yet, please wait for the admin's response.</p>
                                        </div>

                                        <div class="timeline-item" v-if="onGoingUpdatedAt" :class="{ active: isActive('On-Going') }">
                                            <div class="timeline-dot"></div>
                                            <div class="timeline-content">
                                                <p class="timeline-location">Device Received</p>
                                                <p>Updated on: {{ formattedOnGoingUpdatedAt }} <br>Your repair status is: On-going</p>
                                            </div>
                                        </div>

                                        <div class="timeline-item" v-if="finishedUpdatedAt || finishedStatusAvailable" :class="{ active: isActive('Finished') }">
                                            <div class="timeline-dot"></div>
                                            <div class="timeline-content">
                                                <p class="timeline-location">Repair Finished</p>
                                                <p>Updated on: {{ formattedFinishedUpdatedAt }} <br>Your device has been successfully repaired.</p>
                                            </div>
                                        </div>

                                        <div class="timeline-item" v-if="readyForPickupUpdatedAt" :class="{ active: isActive('Ready-for-Pickup') }">
                                            <div class="timeline-dot"></div>
                                            <div class="timeline-content">
                                                <p class="timeline-location">Ready for Pickup</p>
                                                <p>Updated on: {{ formattedReadyForPickupUpdatedAt }} <br>Our shop is open from 9 AM to 5 PM.<br>You can pick up your device from our shop at any time now.</p>
                                            </div>
                                        </div>

                                        <div class="timeline-item" v-if="completedUpdatedAt" :class="{ active: isActive('Completed') }">
                                            <div class="timeline-dot"></div>
                                            <div class="timeline-content">
                                                <p class="timeline-location">Repair Completed</p>
                                                <p>Updated on: {{ formattedCompletedUpdatedAt }} <br>The device has been successfully returned, and the process is now complete.</p>
                                            </div>
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

                        <div class="line-card">
                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/Laptop-check.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2>Free Check up for Laptop & Desktop</h2>
                                        <p>Inquire now, and get a free check-up for your laptop or desktop. Available for all your technical needs</p>
                                        <div class="buttons">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="side-card">
                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/computer-repair.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2 class="h2-1">Computer Repair</h2>
                                        <p class="p1">
                                            Expert computer repair to fix hardware, software, and performance issues quickly and efficiently.
                                        </p>
                                        <div class="buttons">
                                            <button @click="goToContactForm1('Computer Repair')"><i class='bx bxs-edit-alt'></i> Inquire Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/hardware-installation.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2 class="h2-1">Software and Hardware Installation</h2>
                                        <p class="p1">Professional software and hardware installation services to ensure your devices are set up and running smoothly.</p>
                                        <div class="buttons">
                                            <button @click="goToContactForm1('Software and Hardware Installation')"><i class='bx bxs-edit-alt'></i> Inquire Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- More Services -->
                        <div class="side-card">
                            
                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/reset.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2 class="h2-1">Reformat & Reprogram</h2>
                                        <p class="p1">Reliable reformat and reprogram services to restore your system’s performance and resolve software issues.</p>
                                        <div class="buttons">
                                            <button @click="goToContactForm1('Reformat & Reprogram')"><i class='bx bxs-edit-alt'></i> Inquire Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/remove-viruses.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2 class="h2-1">Remove Viruses and Malware</h2>
                                        <p class="p1">Effective virus and malware removal to protect your device and restore its security and performance.</p>
                                        <div class="buttons">
                                            <button @click="goToContactForm1('Remove Viruses and Malware')"><i class='bx bxs-edit-alt'></i> Inquire Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="side-card">

                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/networking.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2 class="h2-1">Networking</h2>
                                        <p class="p1">Expert networking solutions for seamless connectivity, setup, and troubleshooting of your home or office network.</p>
                                        <div class="buttons">
                                            <button @click="goToContactUsForm3('Networking')"><i class='bx bxs-edit-alt'></i> Inquire Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card1">
                                <div class="img">
                                    <img src="../../assets/cctv.jpeg" alt="Service Image" class="img-thumbnail" />
                                    <div class="overlay">
                                        <h2 class="h2-1">CCTV Installation</h2>
                                        <p class="p1">Enhancing security with professional setup of surveillance systems for homes and businesses.</p>
                                        <div class="buttons">
                                            <button @click="goToContactUsForm3('CCTV Installation')"><i class='bx bxs-edit-alt'></i> Inquire Now</button>
                                        </div>
                                    </div>
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
const finishedStatusAvailable = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const token = authStore.access_token;
const comments = ref([]);
const comment = ref('');
const description = ref('');

const repairs = ref([]);

const descriptionUpdatedAt = ref(null);
const adminCommentUpdatedAt = ref(null);

const goToContactForm1 = (serviceTitle) => {
    router.push({
        name: 'form-1',
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

        const productInfos = response.data.data.productInfos || [];
        const allComments = productInfos.flatMap(info => info.comments || []);
        comments.value = allComments
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);
        description.value = response.data.data.description && response.data.data.description.trim() ? response.data.data.description : '';
        
        if (status.value === 'Ready-for-Pickup' && !finishedUpdatedAt.value) {
            finishedStatusAvailable.value = true;
        }

        if (status.value === "Responded") {
            statusUpdateVisible.value = false; 
        } else {
            statusUpdateVisible.value = true;
        }
    
    } catch (error) {
        errorMessage.value = 'No status found. Click Ticket to submit a question or request a repair.';
    } finally {
        isLoading.value = false;
    }
};

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details/my-list/repair`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data.map(repair => ({
      ...repair,
      user: repair.user || { first_name: 'N/A', last_name: 'N/A' },
      description: repair.description || 'No description available',
    }));

    repairs.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    showToast("error", "Failed to load records. Please try again.");
  }
};

const viewRepair = (repair) => {
    if (!repair || !repair.description) {
        console.error("Repair object or description is undefined");
        return;
    }

    const description = repair.description.toLowerCase();
    
    if (description.includes("networking") || description.includes("cctv installation")) {
        router.push({ name: 'user-inquiries-view', params: { id: repair.id } });
    } else {
        router.push({ name: 'user-form', params: { id: repair.id, view: 'view' } });
    }
};

onMounted(() => {
    fetchHomeStatus();
    fetchRepairs();
});

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
    transition: all 0.5s ease;
    margin-left: 20px;
    padding-right: 2.3pc;
    position: relative;
    
    .code-card {
        padding: 60px 26px;
        background-color: var(--header);
        color: var(--light2);
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        flex-basis: 30%;
        min-height: 83vh;
        height: 100%;
        position: sticky;
        top: 6.4pc;
        z-index: 10;

        .con-container {
            display: flex;
            align-items: start;
            width: auto;
            transition: all 0.3s ease-out;
        }

        .contact-info {
            width: 100%;

            h3 {
                margin-bottom: 20px;
                font-size: 19px;
            }

            h2 {
                margin-bottom: 15px;
                font-size: 19px;
            }

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
                padding-left: 35px;
                margin-bottom: 20px;

                &.active .timeline-dot {
                background-color: #4CAF50;
                }
            }

            .timeline-dot {
                width: 17px;
                height: 17px;
                border-radius: 50%;
                background-color: #ccc;
                position: absolute;
                left: 0;
            }

            .timeline-content {
                p {
                    margin: 0;
                    font-size: 14px;
                }

                .timeline-location {
                    font-weight: bold;
                    font-size: 18px;
                }
            }
        }

        .user-inqui {
            position: relative;
            h4 {
                font-size: 19px;
            }

            button {
                display: flex;
                align-items: center;
                padding: 5px 10px;
                position: absolute;
                right: 0;
                margin-right: 10px;
                margin-top: 21px;
            }
        }

    }
    .service-card {
        flex: 1;
        color: var(--light2);
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        gap: 15px;
        flex-basis: 100%;
        border-radius: 5px;

        flex-grow: 1;
        padding: 0 20px;

        .side-card {
            display: flex;
            gap: 20px;
        }

        .cards1 {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        h1 {
            margin-bottom: 4px;
            margin-top: 2px;
            color: var(--header);
        }

        .card1 {
            flex: 1;
            color: var(--light2);
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            border-radius: 20px;

            position: relative;
            overflow: hidden;
            border-radius: 10px;

            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                z-index: 1;
                border-radius: 8px;

                h2 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .h2-1 {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 16px;
                    line-height: 1.5;
                }

                .p1 {
                    font-size: 12px;
                    line-height: 1.5;
                }

                .buttons {
                    display: flex;
                    gap: 10px;

                    button {
                        padding: 10px 20px;
                        background-color: var(--header);
                        border: none;
                        color: white;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease-in-out;
                        margin-top: 18px;

                        button:hover {
                            background-color: var(--main-hover);
                        }
                    }
                }
            }


            &:hover {
                border-radius: 5px;
            }

            .img {
                display: flex;
                justify-content: center;
                width: 100%;
                margin-bottom: 10px;

                position: relative;

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
        padding: 13px;
        border-radius: 5px;
        margin-top: 10px;
        font-style: italic;
        font-size: 14px;
        color: #333;
        max-width: 100%;
        word-wrap: break-word;
    }
}

@media (max-width: 700px) {
    .cards {
        .code-card {
            position: unset;
            height: auto;
            min-height: auto;
        }
    }
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
            .side-card {
                display: flex;
                flex-direction: column;
            }
        
            .cards1 {
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
</style>