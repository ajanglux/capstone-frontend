<template>
<div class="landing-page">
    <header>
        <div class="left-side">
            <img class="app-logo" src="/src/assets/techfix-no.png" alt="TechFix Logo">
            <h3>TechFix</h3>
        </div>
        <div class="button-container">
            <router-link class="button" active-class="active" to="/">
                <span class="text">Home</span>
            </router-link>
            <router-link class="button" active-class="active" to="/services">
                <span class="text">Services</span>
            </router-link>
            <router-link class="button" active-class="active" to="/checkstatus">
                <span class="text">Status</span>
            </router-link>
            <router-link class="button" active-class="active" to="/contact">
                <span class="text">Contact</span>
            </router-link>
        </div>
    </header>
</div> 
</template>
<script setup>

</script>

<style lang="scss" scoped>
header {
    background-color: var(--header);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    font-size: 1em;

    .left-side {
        display: flex;

        img {
            width: 50px;
            height: auto;
        }
    }

    h3 {
        align-items: center;
        color: azure;
        padding-left: 10px;
        display: flex;
        align-items: center;
    }
}

.button-container { 
    display: flex;
    gap: 10px; 
    margin-right: 20px;
}

.button { 
    font-family: 'Poppins';
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 10px;
    background-color: var(--main);
    text-decoration: none;
    display: flex;
}

.button:hover { 
    background-color: var(--main-hover);
}

@media (max-width: 500px) {
    header {
        padding: 20px;
        font-size: 0.8em;

        .left-side {
            img {
                width: 40px;
            }
        }

        h3 {
            padding-left: 8px;
        }
    }

    .button-container { 
        display: flex;
        gap: 5px;
        margin-right: 0;
    }

    .button { 
        padding: 5px 10px;
        font-size: 14px;
    }
}

@media (max-width: 430px) {
    header {
        padding: 20px 15px;
        font-size: 0.8em;

        .left-side {
            img {
                width: 30px;
            }
        }

        h3 {
            padding-left: 4px;
        }
    }

    .button-container { 
        gap: 5px;
    }

    .button {
        border-radius: 7px;
        padding: 3px 5px;
        font-size: 14px;
    }
}

// @media (max-width: 400px) {
//     header {
//         padding: 20px 15px;
//         font-size: 0.8em;

//         .left-side {
//             img {
//                 width: 30px;
//             }
//         }

//         h3 {
//             padding-left: 4px;
//         }
//     }

//     .button-container { 
//         gap: 5px;
//     }

//     .button {
//         border-radius: 7px;
//         padding: 3px 5px;
//         font-size: 14px;
//     }
// }
</style>