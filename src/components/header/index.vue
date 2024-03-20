<template>
  <div id="header" class="header-wrap layout-content">
    <div class="header-inner layout-content layout-two-side-center">
      <div class="header-logo" @click="onLogoClick">
        <img v-if="isDark" src="../../assets/images/logo_dark.png" alt="logo" />
        <img
          v-if="!isDark"
          src="../../assets/images/logo_light.png"
          alt="logo"
        />
      </div>
      <div
        class="header-title layout-all-center header-menu-settings"
        :class="{ 'dark-logo': isDark }"
      >
        <a-menu
          v-model:selectedKeys="currentKeys"
          mode="horizontal"
          triggerSubMenuAction="click"
          class="app-text-font header-menu"
        >
          <template v-for="item in titleList">
            <a-menu-item :key="item.name" v-if="!item.menus">
              <a @click="jumpToPage(item)" class="header-title-item">
                {{ $t(item.name) }}
              </a>
            </a-menu-item>
            <a-sub-menu :key="String(item.name)" v-else>
              <template #title>
                <div class="header-title-item">
                  {{ $t(item.name) }}
                </div>
              </template>
              <a-menu-item
                v-for="subItem in item.menus"
                :key="subItem.name"
                class="header-menu-settings app-text-font"
              >
                <a @click="jumpToPage(subItem)">
                  {{ $t(subItem.name) }}
                </a>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-menu>
        <!--        </RouterLink>-->
        <!--        <div :class="{-->
        <!--                  'layout-background-1': !isDark,-->
        <!--                  'layout-background-2': isDark,-->
        <!--                  'app-color-text':isDark,-->
        <!--                  'app-color-text-dark': !isDark,-->
        <!--                  'header-title-language':true-->
        <!--           }">-->
        <!--          {{ $t('language') }}-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// props
import { IMenu } from "@/interface/menu";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { menuList } from "@/components/header/tools";

defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
});

const currentKeys: any = ref<string[]>([]);
const saveKey: any = "header_key";
const router = useRouter();

const onLogoClick = () => {
  jumpToPage({
    path: "/index",
    name: "home",
  });
};

// const onSubMenuClick = () => {
//   console.log(saveKey.value);
// };

const jumpToPage = (item: any) => {
  router.push(item.path);
  window.localStorage.setItem(saveKey, item.name);
};

const titleList: IMenu[] = menuList;

onMounted(() => {
  currentKeys.value.length = 0;
  currentKeys.value.push(window.localStorage.getItem(saveKey));
});
</script>

<style lang="less">
@import "@/styles/base.less";

.header-wrap {
  position: relative;

  .header-inner {
    width: 100%;
    height: @header-height;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    .header-logo {
      width: 160px;
      height: @header-height;
      line-height: @header-height;
      cursor: pointer;

      img {
        height: 2rem;
      }
    }

    .header-title {
      flex: 1;

      .header-title-language {
        padding: 0.2rem 1rem;
        margin-left: 15px;
        line-height: 30px;
        text-align: center;
        font-size: 0.75rem;
        border-radius: 2rem;
        cursor: pointer;
      }
    }
  }
}

// 调整菜单配置
.ant-menu-submenu > .ant-menu {
  border-radius: 15px !important;

  .header-menu-settings {
    margin: 10px !important;
    border-radius: 8px;
    color: @color-text-dark;

    .ant-menu-title-content a:hover {
      color: @color-text !important;
    }
  }

  .ant-menu-item-selected .ant-menu-title-content a {
    color: @color-text;
  }
}

.header-menu-settings {
  .ant-menu-horizontal > .ant-menu-item a,
  .ant-menu-submenu-title {
    color: @color-text;
  }

  .header-menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    border: 0;
    background-color: transparent;

    .ant-menu-item::after,
    .ant-menu-submenu-selected::after,
    .ant-menu-submenu::after {
      border: 0 !important;
    }

    .header-title-item {
      font-size: 0.9rem;
    }
  }
}

.dark-logo {
}

.dark-logo.header-menu-settings {
  .ant-menu-horizontal > .ant-menu-item a,
  .ant-menu-submenu-title {
    color: inherit;
  }

  .ant-menu-item-selected {
    color: @color-text !important;
  }
}
</style>
