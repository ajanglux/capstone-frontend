<template>
    <div class="terms">
        <div class="terms-content">
            <h1>Terms and Contidition</h1>
            <p>Welcome to our techfixph.com, your trusted partner for all your device repair needs. By using our services, 
                you agree to abide by the following terms and conditions. Please read these terms carefully before proceeding.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using our platform, you agree to be bound by these terms and conditions, along with our Privacy Policy. 
                If you do not agree to these terms, you may not use our services.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>2. Services Provided</h2>
            <p>
                Our platform provides a comprehensive system for device repairs, including:

                <br> • Exploring a wide range of shop offers.

                <br> • Submitting devices for repair.

                <br> • Receiving a unique tracking code for real-time repair progress updates.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>3. User Responsibilities</h2>
            <p>As a user, you agree to:

                <br> • Provide accurate and complete information when submitting your device for repair or making inquiries.

                <br> • Safeguard the unique tracking code provided to you. The code is necessary to track the progress of your repair.

                <br> • Use the platform responsibly and refrain from any actions that may disrupt the services or harm other users.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>4. Repair Tracking</h2>
            <p>Once you submit your device for repair, you will receive a unique tracking code. This code allows you to:

                <br> • Monitor the progress of your repair in real-time.

                <br> •  Access repair updates securely.

                <br> • The platform will not be responsible for any issues arising from the misuse or unauthorized sharing of the tracking code.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>5. Shop Offers and Services</h2>
            <p>WOur platform curates a wide range of repair shop offers to help you find the best service options. 
                While we strive to ensure accuracy and quality, we do not guarantee or take responsibility for the services provided by third-party repair shops.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>6. Communication and Inquiries</h2>
            <p>Our platform facilitates direct communication between users and repair shops. 
                While we provide the tools to make this process seamless, we are not liable for the content or outcome of these communications.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>7. Limitation of Liability</h2>
            <p>We aim to provide a hassle-free and smooth experience; however, we are not responsible for:

                <br> • Delays, damages, or issues caused by third-party repair shops.

                <br> • Any loss or damage resulting from unauthorized access to your tracking code.

                <br> • Errors, interruptions, or disruptions in our platform’s functionality.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>8. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the platform if you violate 
                these terms and conditions or engage in activities deemed harmful to our services or other users.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>9. Modifications</h2>
            <p>We may update these terms and conditions from time to time. 
                Any changes will be communicated via the platform or other appropriate channels. Continued use of our services constitutes acceptance of the revised terms.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>10. Governing Law</h2>
            <p>These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which our platform operates.
            </p>
        </div>
        <div class="terms-conditions">
            <h2>11. Contact Us</h2>
            <p>For any questions, concerns, or feedback about these terms and conditions, please contact us through the platform or at our official support email.

                <br>Thank you for trusting us with your device repair needs. We are committed to providing you with the best possible experience!
            </p>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.terms {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 60px;

    .terms-content {
        padding: 20px 0;

        h1 {
            text-align: center;
            padding-bottom: 10px;
        }
    }

    .terms-conditions {
        padding: 15px 0;

        h2 {
            padding-bottom: 10px;
        }
    }
}

@media (max-width:600px) {
    .terms {
        padding: 90px 40px;

        .terms-content {
            h1 {
                font-size: 20px;
            }

            p {
                font-size: 15px;
            }
        }

        .terms-conditions {
            h2 {
                font-size: 18px;
            }

            p {
                font-size: 14px;
            }
        }
    }
}

</style>