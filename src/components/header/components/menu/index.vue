<template>
  <a-menu
    v-model:selectedKeys="currentKeys"
    v-model:openKeys="openKeys"
    :mode="mode"
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
          :class="{
            'is-pc-menu': mode === 'horizontal',
            'is-phone-menu': mode === 'inline',
          }"
        >
          <a @click="jumpToPage(subItem)">
            {{ $t(subItem.name) }}
          </a>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { IMenu } from '@/interface/menu';
import {
  geHeaderKeyValue,
  menuList,
  saveHeaderKeyValue,
} from '@/components/header/tools';

defineProps({
  mode: {
    type: String,
    default: 'horizontal',
  },
});

const currentKeys: any = ref<string[]>([]);
const openKeys: any = ref<string[]>([]);
const router = useRouter();

const jumpToPage = (item: any) => {
  router.push(item.path);
  saveHeaderKeyValue(item);
};

const initMenuList = (list: IMenu[], key: string | null) => {
  if (list) {
    list.forEach((item: any) => {
      item.openKeys = [] as any;
      if (key) {
        item.openKeys.push(key);
        item.openKeys.push(item.name);
      } else {
        item.openKeys.push(item.name);
      }
      initMenuList(item.menus, item.name);
    });
  }
};
initMenuList(menuList, null);

const titleList: IMenu[] = menuList;

const setCurrentKey = () => {
  currentKeys.value.length = 0;
  currentKeys.value.push(geHeaderKeyValue('currentKeys'));
};

const setOpenKey = () => {
  openKeys.value = geHeaderKeyValue('openKeys');
};

watch(
  () => router?.currentRoute?.value,
  (newValue: any) => {
    setCurrentKey();
  },
  { immediate: true }
);

defineExpose({ jumpToPage, setOpenKey });
</script>

<style lang="less">
@import '@/styles/base.less';

.header-menu {
  border: 0;
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
}

.ant-menu
  .ant-menu-item.ant-menu-item-only-child.ant-menu-item-selected
  .ant-menu-title-content
  a,
.ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-selected
  .ant-menu-submenu-title
  .ant-menu-title-content
  .header-title-item {
  color: @color-text;
}

// -----Pc
.is-pc-menu.ant-menu-horizontal .header-title-item {
  font-size: 0.9rem;
}

.is-pc-menu.header-menu-settings.app-text-font.ant-menu-item {
  margin: 8px;
}
.is-pc-menu.ant-menu-horizontal {
  background-color: transparent;
  border: 0;

  .ant-menu-item::after,
  .ant-menu-submenu-selected::after,
  .ant-menu-submenu::after {
    border: 0 !important;
  }

  .ant-menu-item a,
  .ant-menu-submenu-title {
    color: @color-text;
  }
}

.is-pc-menu.header-menu-settings {
  margin: 10px;
  border-radius: 8px;
  color: @color-text-dark;

  .ant-menu-title-content a:hover {
    color: @color-text !important;
  }
}

// -----Phone
.is-phone-menu.header-menu.header-title-item {
  font-size: 1.8rem;
}

.is-phone-menu.header-menu-settings.app-text-font.ant-menu-item {
  margin-left: 0;
}

.is-phone-menu.ant-menu-light.ant-menu-inline {
  background-color: transparent;
  border: 0;

  .ant-menu-item::after,
  .ant-menu-submenu-selected::after,
  .ant-menu-submenu::after {
    border: 0 !important;
  }

  .ant-menu-item a,
  .ant-menu-submenu-title {
    color: @color-text-dark;
  }
}

.is-phone-menu.header-menu-settings {
  margin: 10px;
  color: @color-text-dark;

  .ant-menu-title-content a:hover {
    color: @color-text !important;
  }
}
</style>
