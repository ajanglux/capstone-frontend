<template>
    <div class="terms">
        <div class="terms-content">
            <h1>Privacy Policy</h1>
            <p>Welcome to techfixph.com, your trusted partner for all your device repair needs. By using our services, 
                you agree to abide by the following Privacy Policy. Please read these terms carefully before proceeding.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>1. Introduction</h2>
            <p>Welcome to Techfix, a Computer Repair Management Platform developed for Brandcom I.T. Services. Your privacy is important to us. 
                This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our platform.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>2. Information We Collect</h2>
            <p>We collect the following types of information when you use Techfix:
                <br> • Personal Information: Name, contact details (email, phone number), and address.
                <br> • Device Information: Model, brand, serial number, and issue descriptions.
                <br> • Transaction Information: Repair history and service requests.
                <br> • Communication Data: Messages, inquiries, and feedback submitted through the platform.
                <br> • Technical Information: IP address, browser type, operating system, and usage data.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>3. How We Use Your Information</h2>
            <p>
                We use your information for the following purposes:

                <br> • To process repair requests and manage service records.
                <br> • To provide real-time tracking of repair progress.
                <br> • To communicate with you regarding service updates and inquiries.
                <br> • To improve our platform, services, and user experience.
                <br> • To ensure security, prevent fraud, and comply with legal obligations.

            </p>
        </div>
        <div class="privacy-policy">
            <h2>4. Sharing and Disclosure</h2>
            <p>
                We do not sell, trade, or rent your personal information. However, we may disclose your information if required by law, regulation, or legal process.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>5. Data Security</h2>
            <p>
                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is completely secure.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>6. Your Rights and Choices</h2>
            <p>You have the right to:
                <br> • Access, update, or delete your personal information.
                <br> • Opt-out of marketing communications.
                <br> • Request data portability, where applicable.
                <br> • Restrict or object to certain processing activities.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>If our system uses cookies or similar technologies to enhance user experience, we will notify you and provide options for managing your preferences. These cookies may include session cookies for tracking user activity within the site.
            </p>
        </div>
        <div class="privacy-policy">
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
                We may update this policy periodically. Any changes will be posted on this page with an updated effective date.
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
            <p>If you have any questions about this Privacy Policy, please contact us at:
                <br> • <strong>Brandcom I.T. Services</strong></p>
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
