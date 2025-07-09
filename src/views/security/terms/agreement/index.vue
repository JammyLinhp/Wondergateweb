<template>
    <Header></Header>
    <div class="layout-background-2 app-header-distance">
        <div class="terms-title-wrap">
            <div class="layout-content">
                <div class="app-title-text app-title-font app-color-text">
                    {{ $t('moo.terms.title') }}
                </div>
                <div class="app-description-text-smaller app-detail-font app-color-text terms-title-description">
                    {{ $t('moo.terms.titleDescription') }}
                </div>
            </div>
        </div>
    </div>

    <div>
        <div class="terms-content layout-content" >
            <div class="menu-container">
                <div class="menu-header">
                    <span class="vertical-line" :class="{ active: isVerticalLineActive }"></span>
                    <h2 class="general-title app-description-text">General</h2>
                </div>
                <ul class="sub-menu">
                    <li class="sub-menu-item " v-for="(item) in subMenuList" 
                    @click="handleSubMenuClick">
                    {{ item }}</li>
                </ul>
            </div>
            <div class="sub-content">
                <div class="content-title app-text-font">{{ $t('moo.terms.subTitle') }}</div>
                <div class="content-title-time">{{ $t('moo.terms.subTitleTime') }}</div>
                <div class="content-title-intro" v-html="$t('moo.terms.subTitleIntro')"></div>
                
                <div class="document-section">
                    <h2>Definitions</h2>
                    <ol class="clause-list">
                        <li>"Wondergate," "We," or "Our" refers to Wondergate Limited.</li>
                        <li>"Customer," "You," or "Your" refers to the legal entity or individual using our Services.</li>
                        <li>"Services" refers to collection, remittance, foreign exchange, and other services provided through our platform or system.</li>
                        <li>"Platform" refers to any website, portal, or system operated by Wondergate to provide the Services.</li>
                        <li>"Transaction" means any payment, transfer, or financial operation conducted through our Services.</li>
                    </ol>
                    <br>
                    <h2>User Eligibility and Registration</h2>
                    <ol class="clause-list">
                        <li>You must be at least 18 years old (or the legal age of majority in your jurisdiction) and capable of entering into legally binding contracts. If registering as a legal entity, you must ensure that the entity is legally established, validly existing, and that the laws of its place of registration permit the use of the Services.</li>
                        <li>We may require identity verification (KYC) and adherence to applicable anti-money laundering (AML) regulations. We reserve the right to refuse or limit access to Services based on compliance requirements.</li>
                    </ol>
                    <br>
                    <h2>Client Obligations</h2>
                    <ol class="clause-list">
                        <li>You agree to provide accurate and complete information at the time of registration and throughout your relationship with Wondergate.</li>
                        <li>You must not use the Services for any illegal, unauthorized, or high-risk activities, as defined by our internal policies and applicable regulatory requirements.</li>
                        <li>You agree to comply with all applicable laws, including anti-money laundering (AML) and counter-terrorist financing (CTF) requirements.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    </ol>
                    <br>
                    <h2>Service Provision</h2>
                    <ol class="clause-list">
                        <li>Services are provided on a commercially reasonable efforts basis. We do not guarantee uninterrupted or error-free operation of the Platform.</li>
                        <li>Wondergate reserves the right to suspend or terminate Services if we suspect non-compliance, illegal activity, or fraudulent behavior. Such suspension or termination may occur without prior notice and without liability for any resulting losses.</li>
                        <li>Certain jurisdictions or high-risk transactions may be subject to restrictions.</li>
                    </ol>
                    <br>
                    <h2>Fees and Settlement</h2>
                    <ol class="clause-list">
                        <li>All applicable fees and settlement terms will be detailed in your Merchant Service Agreement or Pricing Addendum.</li>
                        <li>Fees are subject to change with thirty (30) days’ prior notice, provided via our website or email. Continued use of the Services after such notice constitutes your acceptance of the revised fees.</li>
                    </ol>
                    <br>
                    <h2>Compliance and Monitoring</h2>
                    <ol class="clause-list">
                        <li>Wondergate conducts ongoing transaction monitoring and may request additional documentation at any time.</li>
                        <li>You authorize us to conduct due diligence in accordance with our AML policies, including background checks and transaction reviews.</li>
                    </ol>
                    <br>
                    <h2>Data Protection</h2>
                    <ol class="alone-list">
                        <li>We collect, store, and process your personal data in accordance with our Privacy Policy. By using the Services, you consent to such processing and acknowledge that you have reviewed the Privacy Policy.</li>
                        
                    </ol>
                    <br>
                    <h2>Intellectual Property</h2>
                    <ol class="alone-list">
                        <li>All content on the Platform is owned by or licensed to Wondergate. You may not copy, reproduce, or distribute any materials without our prior written consent.</li>
                    </ol>
                    <br>
                    <h2>Limitation of Liability</h2>
                    <ol class="clause-list">
                        <li>We are not liable for:<br>1.Losses resulting from system errors, fraud, or unauthorized access.<br>2.Actions of third parties, including but not limited to delays in banking systems, internet service provider outages, etc.</li>
                        <li>The Services are provided “as is” and “as available,” without any express or implied warranties, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.<br>Wondergate shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with your use of the Services.</li>
                    </ol>
                    <br>
                    <h2>Termination</h2>
                    <ol class="alone-list">
                        <li>Either party may terminate the Services with prior written notice. Wondergate may suspend or terminate Services immediately upon discovering a breach of these Terms or any applicable law or regulation.</li>
                    </ol>
                    <br>
                    <h2>Governing Law</h2>
                    <ol class="alone-list">
                        <li>These Terms shall be governed by the laws of the Hong Kong Special Administrative Region. Any disputes shall be subject to the exclusive jurisdiction of the courts of Hong Kong.</li>
                    </ol>
                    <br>
                    <h2>Amendments</h2>
                    <ol class="alone-list">
                        <li>We may amend these Terms from time to time. The latest version will be made available on our official website and shall become effective upon posting.</li>
                    </ol>

                </div>
                
                <div class="content-title-intro">If you have any questions regarding these Terms, please contact us at:<br>&nbsp;&nbsp;&nbsp;&nbsp;support@wondergate.io</div>

            </div>
        </div>
    </div>

    <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import { ref } from 'vue';


const isVerticalLineActive = ref(true);
const subMenuList = ref(['User Agreement']);

const handleSubMenuClick = () => {
    isVerticalLineActive.value = true;
};



</script>

<style scoped lang="less">
.terms-title-wrap {
    padding: 3.2rem 0 5rem 0;
    text-align: center;
}
.terms-title-description{ 
    padding-top: 3.8rem;
}
.terms-content {
    display: flex;
    justify-content: space-between;
}

/* ----菜单样式---- */ 

.menu-container {
    width: 20%;
    padding-top: 4rem;
    padding-right: 20px;
}

.menu-header {
    display: flex;
    text-align: center;
    cursor: default;
}

.vertical-line {
    display: inline-block;
    width: 0.2rem;
    height: 1.23rem;
    background-color: transparent;
    transition: background-color 0.3s ease;
    margin-top: 0.2rem;
    margin-right: 0.5rem;
    border-radius: 46px;
}

.vertical-line.active {
    background: linear-gradient(180deg, rgba(0, 220, 255, 0.56) 0%, rgba(20, 193, 220, 0.62) 42%, #15DFFF 100%);
}

.general-title {
    font-weight: 500;
    color: #302C3E;
}

.sub-menu {
    list-style: none;
    padding: 0;
    margin-top: -0.5rem;
}

.sub-menu-item {
    padding-left: 0.67rem;
    color: #00BBD8;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 0.8rem;
}

.sub-menu-item:hover {
    color: #007bff;
}

/* ----内容样式---- */ 

.sub-content {
    width: 80%;
    padding: 3rem 0;
}
.content-title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 500;
    margin: 10px 0;
}
.content-title-time {
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 20px 0;
}
.content-title-intro {
    font-weight: 500;
    font-size: 0.8rem
}
.document-section {
    counter-reset: section 0;
    margin-bottom: 30px;
    margin-top: 30px;
}
.document-section h2 {
    counter-increment: section;
    font-size: 0.8rem;
    font-weight: 800;
    position: relative;
    padding-left: 1.3rem;
}
.document-section h2::before {
    content: counter(section) ".";
    position: absolute;
    left: 0;
    font-weight: 800;
    color: #000000;
}
.clause-list {
    list-style: none;
    counter-reset: clause 0;
    padding-left: 0px;
    text-indent: 0;
}
.clause-list li {
    counter-increment: clause;
    position: relative;
    padding-left: 1.54rem;
    font-weight: 500;
    margin: 2px 0;
    font-size: 0.8rem;
}
.clause-list li::before {
    content: counter(section) "." counter(clause);
    position: absolute;
    left: 0;
    color: #000000;
    font-weight: 800;
}
.alone-list {
    padding-left: 0;
    font-weight: 500;
}

</style>