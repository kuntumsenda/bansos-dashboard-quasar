<template>
  <q-drawer
    v-model="props.isOpen"
    show-if-above
    class="bg-secondary"
    :width="250"
  >
    <q-btn v-if="props.isOpen" flat icon="mdi-chevron-left-circle" color="accent" size="30px" style="position: absolute; top: 50px; right: -41px;" @click="$emit('closeDrawer')" class="ham--btn"></q-btn>
    <div class="flex justify-center logo--wrapper">
      <img src="~/assets/logo.png" alt="kemensos_ri">
    </div>
    <q-list class="q-mt-lg q-mx-md list--menu">
      <template v-for="(item, index) in $store.state.user.navMenu" :key="index">
        <q-expansion-item
          v-if="item.children"
          default-opened
          :class="`expand--menu ${$route.path.includes(item.path)?'expand--menu--active text-black text-weight-medium':''}`"
        >
          <template v-slot:header>
            <div class="row items-center q-col-gutter-x-md">
              <q-icon :color="$route.path.includes(item.path)?'black':'blue-grey-4'" size="20px" :name="item.icon" />
              <span>{{ item.menuText }}</span>
            </div>
            <q-space></q-space>
          </template>
          <q-item v-for="child in item.children" :key="child.name" clickable v-ripple :class="`submenu ${$route.path.includes(child.path)? 'text-accent text-weight-medium':''}`" @click="$router.push({name: child.name})">
            <q-item-section>{{ child.menuText }}</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item clickable v-else v-ripple @click="$router.push({name: item.name})" :class="`${$route.name == item.name? 'text-accent text-weight-medium':''}`">
          <div class="row items-center q-col-gutter-x-md">
            <q-icon :color="$route.name == item.name? 'accent':'blue-grey-4'" size="20px" :name="item.icon" />
            <span>{{ item.menuText }}</span>
          </div>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})
</script>
<style lang="scss" scoped>
.logo--wrapper{
  padding: 12px 0;
}
</style>