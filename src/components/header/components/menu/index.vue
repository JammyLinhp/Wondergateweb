<template>
  <ul class="moo-menu-horizontal">
    <li class="moo-menu-title-item" v-for="(item, index) in titleList" :key="index + 'title'" @click="openMenu($event, item)">
      <template v-if="item.menus">
        <span class="moo-menu-title-text"> {{ $t(item.name) }}</span>
        <ul class="moo-menu moo-menu-vertical" :class="{ 'moo-menu-visible': item.openMenuKey }">
          <li
            class="moo-menu-sub"
            v-for="subItem in item.menus"
            :class="{ 'moo-menu-sub-selected': isSelected(subItem) }"
            :key="subItem.currentKey"
            @click="jumpToPage(subItem)"
          >
            {{ $t(subItem.name) }}
          </li>
        </ul>
      </template>
      <template v-else>
        <span class="moo-menu-title-text" @click="jumpToPage(item)">{{ $t(item.name) }}</span>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { IMenu } from '@/interface/menu';
import { geHeaderKeyValue, menuList, saveHeaderKeyValue } from '@/components/header/tools';

defineProps({
  mode: {
    type: String,
    default: 'horizontal',
  },
});

const currentKey: any = ref<string[]>([]);
const openKeys: any = ref<string[]>([]);
const router = useRouter();

const jumpToPage = (item: any) => {
  router.push(item.path);
  saveHeaderKeyValue(item);
};

const closeMenu = () => {
  titleList.forEach((item: any) => {
    item.openMenuKey = false;
  });
};

const openMenu = (event: any, item: any) => {
  event.stopPropagation();
  closeMenu();
  item.openMenuKey = true;
};

const initMenuList = (list: IMenu[], key: string | null) => {
  if (list) {
    list.forEach((item: any) => {
      item.openKeys = [] as any;
      if (key) {
        item.openKeys.push(key);
        item.openKeys.push(item.currentKey);
      } else {
        item.openKeys.push(item.currentKey);
      }
      initMenuList(item.menus, item.currentKey);
    });
  }
};
initMenuList(menuList, null);

const titleList: IMenu[] = reactive(menuList);

const setCurrentKey = () => {
  currentKey.value = geHeaderKeyValue('currentKey') || '';
};

const setOpenKey = () => {
  openKeys.value = geHeaderKeyValue('openKeys');
};

const isSelected = (item: any) => {
  return openKeys.value?.includes(item.currentKey);
};

document.addEventListener('click', function () {
  closeMenu();
});

watch(
  () => router?.currentRoute?.value,
  () => {
    setCurrentKey();
    setOpenKey();
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

.moo-menu-horizontal {
  display: flex;
  line-height: 46px;
  border: 0;
  box-shadow: none;
  margin: 0;
}

.moo-menu-title-item {
  position: relative;
  margin-right: 10px;
  padding-right: 20px;
  cursor: pointer;

  &:last-child {
    padding-right: 0;
  }
}

.moo-menu-title-text {
  height: 100%;
  line-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0px;
  color: @color-text;
}

.moo-menu-vertical {
  overflow-x: hidden;
  overflow-y: auto;
}

.moo-menu-sub {
  line-height: 26px;
  font-weight: 600;
  margin: 8px;
  position: relative;
  display: block;
  padding: 8px 15px;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    color: @color-text;
  }
}

.moo-menu-sub-selected {
  background-color: #e6fffe;
  color: @color-text;
}

// -----Pc
.moo-menu {
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 1000;
  background: transparent;
  border-radius: 2px;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 0;
  text-align: left;
  list-style: none;
  background: #fff;
  outline: none;
  transform: scale(0);
}

.moo-menu-visible {
  transform: scale(1);
  transition: all 0.1s ease-in-out;
}

// -----Phone
</style>
