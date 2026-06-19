<template>
  <div class="layout-background-2">
    <Header></Header>
    <div class="layout-background-2 app-header-distance"></div>
  </div>
  <div
    class="layout-background-2 app-header-distance contact-banner"
    :style="{
      backgroundImage: `url(${ContactImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '30rem',
    }"
  >
    <div class="about-title-wrap contact-title-wrap">
      <div class="layout-content">
        <h1 class="app-title-text app-title-font app-color-text contact-main-title">
          {{ $t('moo.contact.title') }}
        </h1>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text about-title-description contact-main-description"
          v-html="$t('moo.contact.toBegin')"
        ></div>
      </div>
    </div>
  </div>
  <div class="contact-information">
    <div class="layout-content">
      <div class="structure-left-right">
        <div class="structure-left">
          <h2 class="app-title-text app-title-font app-color-text-main">{{ $t('moo.contact.keepInTouch') }}</h2>
          <p class="app-description-text app-detail-font app-color-text-grey contact-form-description">
            {{ $t('moo.contact.youWant') }}
          </p>
        </div>
        <div class="structure-right">
          <a-form layout="vertical">
            <a-form-item label="Your name">
              <a-input :value="formData.name" @input="handleNameInput" :placeholder="$t('moo.contact.name')">
                <template #suffix>
                  <user-outlined />
                </template>
              </a-input>
              <div v-if="errorMessages.name" class="error-message">{{ errorMessages.name }}</div>
            </a-form-item>
            <a-form-item label="Email">
              <a-input :value="formData.email" @input="handleEmailInput" :placeholder="$t('moo.contact.enterEmail')">
                <template #suffix>
                  <mail-outlined />
                </template>
              </a-input>
              <div v-if="errorMessages.email" class="error-message">{{ errorMessages.email }}</div>
            </a-form-item>
            <a-form-item label="Phone">
              <div class="phone-input-container">
                <a-select v-model:value="selectedPrefix" class="phone-prefix-select" @change="handlePrefixChange" show-search>
                  <a-select-option v-for="prefix in phonePrefixes" :key="prefix.value" :value="prefix.value">
                    {{ prefix.label }}
                  </a-select-option>
                </a-select>
                <a-input
                  :value="formData.phone"
                  @input="handlePhoneInput"
                  :placeholder="$t('moo.contact.phone')"
                  class="phone-input"
                >
                  <template #suffix>
                    <phone-outlined />
                  </template>
                </a-input>
              </div>
              <div v-if="errorMessages.phone" class="error-message">{{ errorMessages.phone }}</div>
            </a-form-item>
            <a-form-item label="Your message">
              <a-textarea
                :value="formData.message"
                @input="handleMessageInput"
                :placeholder="$t('moo.contact.message')"
                rows="4"
              >
              </a-textarea>
              <div v-if="errorMessages.message" class="error-message">{{ errorMessages.message }}</div>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="submitForm" :loading="loading" :disabled="loading" class="contact-submit-btn">
                {{ $t('moo.contact.submit') }}
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
  <div class="layout-content"><a-divider /></div>
  <div class="layout-content">
    <div class="structure-percentage-width-50 float-text-content">
      <a-tabs>
        <template :key="index" v-for="(item, index) in informationList">
          <a-tab-pane style="height: 400px">
            <template #tab>{{ item.title }}</template>
            <a-row :gutter="5">
              <a-col :span="9">
                <div>{{ $t('moo.contact.email') }} :</div>
              </a-col>
              <a-col :span="15">
                <div>
                  {{ 'info@wondergate.io' }}
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="5" class="layout-content-subspacing-small">
              <a-col :span="9">
                <div>{{ $t('moo.contact.companyName') }} :</div>
              </a-col>
              <a-col :span="15">
                <div>
                  {{ item?.name }}
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="5" class="layout-content-subspacing-small">
              <a-col :span="9">
                <div>{{ $t('moo.contact.officeAddress') }} :</div>
              </a-col>
              <a-col :span="15">
                <div>
                  {{ item?.description }}
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="5" class="layout-content-subspacing-small" v-if="item.title === 'Hong Kong'">
              <a-col :span="9">
                <div>{{ $t('moo.contact.companyRegistrationNumber') }} :</div>
              </a-col>
              <a-col :span="12">
                <div>3311511</div>
              </a-col>
            </a-row>
            <a-row :gutter="5" class="layout-content-subspacing-small" :wrap="true">
              <a-col :span="9">
                <div>{{ $t('moo.contact.userService') }} :</div>
              </a-col>
              <a-col :span="15">
                <div class="linebreak" v-html="item?.userService"></div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </template>
      </a-tabs>
    </div>
  </div>
  <Footer :is-display-button="false"></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import FloatStructure from '@/components/structure/left-rigth/float/index.vue';
import ContactImage from '@/assets/images/contact-us/img_contact_us.jpeg';
import { ref, getCurrentInstance, onMounted, nextTick } from 'vue';
import { submitFeedback, getPhoneAreaCode } from '@/utils/api';
import { message, Modal } from 'ant-design-vue';
import { ICard } from '@/interface/home';
const { proxy } = getCurrentInstance() as any;
const informationList = ref<ICard[]>([
  {
    title: 'Hong Kong',
    name: 'Wondergate Co., Limited',
    description: 'FLAT/RM 121 1/F LIVEN HOUSE NOS.61-63 KING YIP STREET KWUN TONG',
    userService:
      'Services for Hong Kong users are regulated under Hong Kong law, including but not limited to: <i>Payment Systems and Stored Value Facilities Ordinance (Cap. 584), Anti-Money Laundering and Counter-Terrorist Financing Ordinance (Cap. 615)</i>, and other applicable regulations.',
  },
  {
    title: 'Canada',
    name: 'WONDERGATE FINTECH INC.',
    description: '44322 YALE RD UNIT 3B #198 CHILLIWACK BC V2R 4H1 CANADA',
    userService:
      'Services for Canadian users comply with: <i>The Constitution of Canada, Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA), Payment Services Act</i>, and other relevant provincial and federal laws.\nUsers from other jurisdictions must ensure compliance with their local money transmission regulations before using our services.',
  },
  {
    title: 'America',
    name: 'Wondergate Limited',
    description: '1401 21ST ST STE R  SACRAMENTO, CA 95811',
    userService:
      'Services in the United States are governed by U.S. federal law, including: <i>Bank Secrecy Act (BSA), Electronic Fund Transfer Act (Regulation E)</i>, and other relevant statutes. These services are not available to users in U.S.-sanctioned jurisdictions.',
  },
]);

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

// 手机号前缀选项
const phonePrefixes: any = ref([]);

// 选中的手机号前缀
const selectedPrefix: any = ref('');

// 加载状态，防止重复提交
const loading = ref(false);

// 验证函数
const validateName = (value: string) => {
  if (!value) {
    return '';
  }
  if (value.length > 30) {
    return 'Name can only contain up to 30 characters';
  }
  return '';
};

const validateEmail = (value: string) => {
  if (!value) {
    return '';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  if (value.length > 100) {
    return 'Email can only contain up to 100 characters';
  }
  return '';
};

const validatePhone = (value: string) => {
  if (!value) {
    return '';
  }
  if (!/^\d+$/.test(value)) {
    return 'Phone number can only contain digits';
  }
  if (value.length > 20) {
    return 'Phone number can only contain up to 20 characters';
  }
  return '';
};

const validateMessage = (value: string) => {
  if (!value) {
    return '';
  }
  if (value.length > 300) {
    return 'Message can only contain up to 300 characters';
  }
  return '';
};

// 实时验证
const errorMessages = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

// 监听输入变化进行实时验证
const handleNameInput = (e: any) => {
  formData.value.name = e.target.value;
  errorMessages.value.name = validateName(e.target.value);
};

const handleEmailInput = (e: any) => {
  formData.value.email = e.target.value;
  errorMessages.value.email = validateEmail(e.target.value);
};

const handlePhoneInput = (e: any) => {
  formData.value.phone = e.target.value;
  errorMessages.value.phone = validatePhone(e.target.value);
};

const handleMessageInput = (e: any) => {
  formData.value.message = e.target.value;
  errorMessages.value.message = validateMessage(e.target.value);
};

// 处理前缀选择变化
const handlePrefixChange = (value: string) => {
  selectedPrefix.value = value;
};

// 提交表单
const submitForm = async () => {
  // 最终验证
  const nameError = validateName(formData.value.name);
  const emailError = validateEmail(formData.value.email);
  const phoneError = validatePhone(formData.value.phone);
  const messageError = validateMessage(formData.value.message);

  errorMessages.value = {
    name: nameError,
    email: emailError,
    phone: phoneError,
    message: messageError,
  };

  // 检查是否有错误
  if (nameError || emailError || phoneError || messageError) {
    message.error(proxy.$t('moo.contact.pleaseFixTheErrorsBeforeSubmitting'));
    return;
  }

  // 检查必填项
  if (!formData.value.name) {
    errorMessages.value.name = 'Name is required';
  }
  if (!formData.value.email) {
    errorMessages.value.email = 'Email is required';
  }
  if (!formData.value.phone) {
    errorMessages.value.phone = 'Phone is required';
  }
  if (!formData.value.message) {
    errorMessages.value.message = 'Message is required';
  }
  
  // 检查是否有错误
  if (errorMessages.value.name || errorMessages.value.email || errorMessages.value.phone || errorMessages.value.message) {
    return;
  }

  // IP限制：5分钟内最多提交2次
  const checkSubmissionLimit = async () => {
    try {
      // 获取真实IP地址
      let ip = '127.0.0.1'; // 默认值
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ip = data.ip;
      } catch (ipError) {
        console.error('Error fetching IP:', ipError);
        // 如果获取IP失败，使用默认值
      }

      const storageKey = `contact_submission_${ip}`;

      const submissionData = localStorage.getItem(storageKey);
      if (submissionData) {
        const data = JSON.parse(submissionData);
        const now = Date.now();
        const fiveMinutesAgo = now - 5 * 60 * 1000;

        // 过滤掉5分钟前的提交记录
        const recentSubmissions = data.filter((timestamp: number) => timestamp > fiveMinutesAgo);

        if (recentSubmissions.length >= 2) {
          message.error(proxy.$t('moo.contact.editSuccessfullyTip'));
          return false;
        }

        // 添加新的提交记录
        recentSubmissions.push(now);
        localStorage.setItem(storageKey, JSON.stringify(recentSubmissions));
      } else {
        // 第一次提交
        localStorage.setItem(storageKey, JSON.stringify([Date.now()]));
      }
      return true;
    } catch (error) {
      // 本地存储出错时，跳过限制检查
      console.error('Local storage error:', error);
      return true;
    }
  };

  // 检查提交限制
  // const canSubmit = await checkSubmissionLimit();
  // if (!canSubmit) {
  //   return;
  // }

  loading.value = true;
  const loadingInstance = message.loading('Submitting...', 1);

  try {
    const res = await submitFeedback({ ...formData.value, prefixPhone: selectedPrefix.value });
    loadingInstance();
    // 显示确认弹窗
    Modal.success({
      title: 'Submission Success',
      content: 'Your message has been submitted successfully.',
      onOk() {
        window.location.reload();
      },
      okText: 'OK',
      centered: true,
    });
  } catch (error) {
    loadingInstance();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // 初始化 selectedPrefix 为 +86
  selectedPrefix.value = '+86';

  //获取区号
  getPhoneAreaCode().then((res: any) => {
    phonePrefixes.value = res.map((item: any) => ({
      value: item.code,
      label: item.code,
    }));
  });
});
</script>

<style lang="less" scoped>
@import '@/styles/base';
.about-title-wrap {
  text-align: center;
  padding: 3.7rem 0;
}

.about-title-description {
  padding-top: 3.7rem;
}

/* 联系我们页面专用样式 */
.contact-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}

.contact-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
}

.contact-main-title {
  text-align: center;
}

.contact-main-description {
  text-align: center;
  max-width: 800px; /* 限制最大宽度，使文本更美观 */
  margin: 0 auto;
}

/* 联系表单样式 */
.contact-information {
  padding: 4rem 0;
  background: @color-white;
}

.structure-left-right {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  align-items: flex-start;
}

.structure-left {
  flex: 1;
  min-width: 300px;
  padding-top: 2rem;
}

.structure-right {
  flex: 1;
  min-width: 300px;
}

.contact-form-description {
  margin-top: 2rem;
  line-height: 1.6;
}

.contact-submit-btn {
  border-radius: 2rem;
  margin-top: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.error-message {
  color: #ff4d4f !important;
  font-size: 0.675rem;
  margin-top: 0.5rem;
  line-height: 1.4;
  display: block;
}

/* 手机号输入框布局 */
.phone-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.phone-input-container .ant-select {
  width: 80px !important;
  flex-shrink: 0;
}

.phone-input-container .ant-input {
  flex: 1 !important;
  min-width: 0;
}

/* 响应式设计 */
@media (max-width: 770px) {
  .phone-input-container {
    flex-direction: column;
    align-items: stretch;
  }

  .phone-prefix-select {
    width: 100%;
  }

  .phone-input {
    width: 100%;
  }
}

/* 响应式设计 */
@media (max-width: 770px) {
  .structure-left-right {
    flex-direction: column;
  }

  .structure-left,
  .structure-right {
    width: 100%;
  }

  .contact-information {
    padding: 2rem 0;
  }
}
.ant-tabs-top > .ant-tabs-nav::before,
.ant-tabs-bottom > .ant-tabs-nav::before,
.ant-tabs-top > div > .ant-tabs-nav::before,
.ant-tabs-bottom > div > .ant-tabs-nav::before {
  border: 0;
}

:deep(.ant-tabs-tab) {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
}

.contact-description {
  padding: 1.65rem 0 0.8rem;
}

.linebreak {
  white-space: pre-line;
}

.linebreak i {
  font-style: italic !important;
}
.content-font {
  font-size: 1rem;
}
</style>
