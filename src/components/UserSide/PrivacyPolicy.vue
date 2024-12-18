<template>
    <div class="terms">
        <div class="terms-content">
            <h1>Privacy Policy</h1>
            <p>Welcome to techfixph.com, your trusted partner for all your device repair needs. By using our services, 
                you agree to abide by the following Privacy Policy. Please read these terms carefully before proceeding.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>1. Information We Collect</h2>
            <p>We collect the following types of information:
                <br> • <strong>Personal Information:</strong> Your name, email address, and phone number.
                <br> • <strong>Device Information:</strong> Details about your computer or device, including specifications and issues you report.
                <br> • <strong>Technical Information:</strong> IP addresses, browser types, and operating systems, where applicable.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information you provide to:
                <br> • Facilitate and manage your repair booking requests.
                <br> • Diagnose and resolve computer-related issues based on the details you provide.
                <br> • Communicate updates, confirmations, or questions about your repair bookings.
                <br> • Improve and personalize our services based on user feedback and analytics.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>3. Data Retention</h2>
            <p>We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Once no longer needed, your information will be securely deleted or anonymized.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>4. Data Storage and Security</h2>
            <p>
                <br> • Your data is stored locally on secure systems to prevent unauthorized access.
                <br> • We implement reasonable security measures, including encryption and access controls, to safeguard your information against loss, theft, and unauthorized disclosure.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>5. Sharing Your Information</h2>
            <p>We do not sell, rent, or share your information with third parties unless required by law or with your explicit consent. If sharing is necessary to provide a service, we ensure that your data is protected by appropriate agreements.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>6. Your Rights</h2>
            <p>You have the following rights regarding your personal data:
                <br> • <strong>Access and Update:</strong> You can request access to or updates of your personal information stored in our system.
                <br> • <strong>Deletion:</strong> You may request that we delete your personal information, subject to legal and operational requirements.
                <br> • <strong>Data Portability:</strong> You may request a copy of your personal data in a structured, machine-readable format.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>7. Cookies and Tracking</h2>
            <p>If our system uses cookies or similar technologies to enhance user experience, we will notify you and provide options for managing your preferences. These cookies may include session cookies for tracking user activity within the site.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>8. International Data Transfers</h2>
            <p>If your data is transferred outside your country of residence, we ensure that it is protected under applicable privacy standards and legal safeguards.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>9. Compliance with Regulations</h2>
            <p>We comply with applicable privacy laws and regulations, including fair use policies, to ensure your data is handled responsibly and transparently.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>10. Updates to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of significant changes through the platform or via email.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>11. Contact Us</h2>
            <p>For any questions, concerns, or feedback about this Privacy Policy or how your data is handled, please contact us through the platform or at our official support email:
                <br> • <strong>Email:</strong> raymart.williams@brandcomph.com
                <br> • <strong>Phone:</strong> +639661908734
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

    .privacy-policy {
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

        .privacy-policy {
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
