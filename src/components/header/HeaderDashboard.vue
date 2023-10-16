<template>
  <q-header class="bg-secondary text-blue-grey-6">
    <q-toolbar class="q-py-md">
      <q-btn
      flat
      dense
      round
      size="20px"
      color="white"
      icon="mdi-menu"
      aria-label="Menu"
      class="ham--btn"
      @click="$emit('hamOnClick')"
      />
      <q-space/>
      <div class="left-side--wrapper row q-gutter">
        <q-btn round flat icon="mdi-bell-outline" class="bg-white q-mr-lg">
          <q-badge floating color="accent" rounded />
        </q-btn>
        <div class="q-mr-sm">
          <div>{{ $store.state.user.profile.fullName }}</div>
          <div class="text-accent text-capitalize text-caption">{{ $store.state.user.profile.roleName }}</div>
        </div>
        <q-avatar
          size="42px"
          class="overlapping bg-grey-9"
        >
          <img :src="$store.state.user.profile.avatar">
        </q-avatar>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script></script>
<style lang="scss" scoped>
.left-side--wrapper{
  border: 1.5px solid white;
  border-radius: 40px;
  padding: 2px;
}
</style>