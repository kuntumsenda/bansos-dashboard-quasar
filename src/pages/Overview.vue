<template>
  <q-page>
    <div class="row wrap justify-between header-page--wrapper">
      <h5>{{ $route.meta.title }}</h5>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
