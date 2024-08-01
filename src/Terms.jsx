import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";


const Terms = () => {

    return (
        <div>
            <Navigation />
            <div className="terms-services">
                <h2>PlusExchange Terms of Service Agreement</h2>
                <h3>Introduction</h3>
                This Terms of Service Agreement ("Agreement") is a legally binding contract between you ("User") and PlusExchanges ("Company," "we," "our," or "us"). This Agreement governs your use of our platform ("Application") that facilitates transactions through various payment platforms, including but not limited to PayPal, Cash App, Venmo, Zelle, Apple Pay, and major cryptocurrencies.

                By using our Application, you automatically agree to the terms of service and user agreements of PayPal, Cash App, Venmo, Zelle, Apple Pay, and any other platforms we support. By using our Application, you automatically agree to comply with and be bound by the terms and conditions of this Agreement. If you do not agree with these terms, do not use the Application.

                <h4> 1. Use of the Application</h4>
                <h5>1.1 Eligibility</h5>
                You must operate a verified PayPal, Cash App, Venmo, Zelle, or Apple Pay account, or a wallet for major cryptocurrencies, to use our Application. By using the Application, you represent and warrant that you meet these requirements.

                <h5>1.2 Account Registration</h5>
                To use the Application, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

                <h5>1.3 User Responsibility for Transaction Details</h5>
                You are solely responsible for ensuring the accuracy of all transaction details, including but not limited to your platform usernames, recipient usernames, amounts, and any other required information. If you input incorrect information and the transaction proceeds, it will be considered final and irreversible. We are not liable for any losses incurred due to user error in entering transaction details. While you may attempt to dispute a transaction, once it has been completed, we cannot guarantee any refund or reversal.

                <h5>1.4 Account Bans</h5>
                To use our payment services, you must create an account with accurate personal information. You are responsible for maintaining account security. We may suspend or terminate your account for any violations.

                <h4> 2. Transactions</h4>
                <h5> 2.1 Payment Services</h5>
                The Application enables you to submit and process payments through third-party payment processors, including PayPal, Cash App, Venmo, Zelle, Apple Pay, and major cryptocurrencies. You acknowledge that we do not process payments directly and that all transactions are subject to the terms and conditions of the respective payment processors.

                <h5>2.2 Transaction Accuracy</h5>
                You are responsible for ensuring the accuracy of all transaction details, including the recipient's information, the transaction amount, and any other pertinent details. We are not liable for any errors or losses resulting from inaccurate or incomplete transaction information provided by you.

                <h5>2.3 Transaction Limits</h5>
                Your transactions may be subject to limits imposed by us or the third-party payment processors. These limits may be adjusted based on various factors, including regulatory requirements and risk assessments.

                <h5> 2.4 Payments</h5>
                Our services allow you to send and receive payments through various methods like bank accounts, debit/credit cards, and third-party payment processors. Applicable fees may apply.

                <h4>3. Fees</h4>
                <h5>3.1 Service Fees</h5>
                We may charge fees for certain transactions or services provided through the Application. Any applicable fees will be disclosed to you prior to the completion of the transaction. By completing the transaction, you agree to pay the disclosed fees. No PlusExchanges service fees will be undisclosed or hidden from you.

                <h5>3.2 Third-Party Vendor Fees</h5>
                You acknowledge that the third-party payment processors may charge additional fees for transactions conducted through their platforms. These fees are governed by the terms and conditions of the respective payment processors. By using our Application, you automatically agree to any terms of service and user agreements of those respective payment processors. It's important to understand that these platform fees are charged to businesses like us by PayPal, Cash App, Venmo, Zelle, and Apple Pay, and do not benefit PlusExchanges directly.

                PayPal charges 2.99% of the transaction amount
                Cash App charges 2.75% of the transaction amount
                Venmo charges 1.9% of the transaction amount plus $0.10
                <h5> 3.3 Pricing Breakdown</h5>
                For transaction amounts under $25, the fee is $0.25 per transaction plus any additional platform fees.
                For amounts over $25, the fee is 1% of the transaction amount (capped at $25) plus any additional platform fees.

                <h4> 4. User Conduct</h4>
                <h5>4.1 Prohibited Activities</h5>
                You agree not to engage in any of the following prohibited activities:

                Using the Application for any illegal or unauthorized purpose
                Attempting to gain unauthorized access to other users' accounts or our systems
                Engaging in fraudulent or deceptive practices
                Violating any applicable laws or regulations in the United States regarding financial activities
                You may not use our services for any illegal or unauthorized purposes. This includes fraud, money laundering, funding illegal activities, or violating intellectual property rights.
                <h5> 4.2 Termination</h5>
                We reserve the right to suspend or terminate your access to the Application at our sole discretion if we believe you have violated this Agreement or engaged in any prohibited activities.

                <h4> 5. Privacy</h4>
                Your use of the Application is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using the Application, you consent to the practices described in our Privacy Policy.

                <h4> 6. Disclaimers and Limitation of Liability</h4>
                <h5>6.1 Disclaimers</h5>
                The Application is provided on an “as-is” and “as-available” basis. We make no warranties, express or implied, regarding the Application's operation or the information, content, or materials included therein. We disclaim all warranties, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.

                <h5>6.2 Limitation of Liability</h5>
                In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Application. Our total liability to you for any claims arising from your use of the Application shall not exceed the amount paid by you, if any, for accessing and using the Application.

                <h5> 6.3 Account Loss</h5>
                We are not responsible for any losses in account access or imposed limits for PayPal, Cash App, Venmo, Zelle, and Apple Pay. We are also not responsible for recovering these accounts of these services.

                <h4> 7. Intellectual Property and Dispute Resolution</h4>
                <h5>7.1 Intellectual Property</h5>
                Our services are protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services.

                <h5> 7.2 Modifications to Service</h5>
                We reserve the right to modify, suspend, or discontinue any part of our service at any time. We are not liable to you or any third party for any such modifications, suspension, or discontinuation. A notice will be provided in that scenario.

                <h5>7.3 Dispute Resolution</h5>
                Any disputes arising from or relating to these Terms of Service or our services shall be resolved through binding arbitration in accordance with PlusExchanges.

                <h4>8. Changes to the Agreement</h4>
                We may modify this Agreement from time to time. We will notify you of any changes by posting the revised Agreement on the Application and updating the “Last Updated” date. Your continued use of the Application after any such changes constitutes your acceptance of the new terms.

                These Terms of Service constitute the entire agreement between you and us regarding our services and supersede any prior agreements. By using our payment services, you agree to these Terms of Service. We may modify these terms at any time, and your continued use of our services following any changes constitutes your acceptance of the revised terms.
            </div>
        </div>
    );
};

export default Terms;
