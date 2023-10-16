<template>
  <div style="width: 200px">
    <div style="border: 1px solid; border-radius: 4px;">
      <div class="img--preview">
        <img v-if="src" id="img" :src="src" alt="">
        <img v-else id="img" src="~/assets/noImage.png" alt="">
      </div>
      <div class="file-picker--wrapper" style="width: 200px;">
        <input :id="id" type="file" class="input--file" :accept="accept" @change="inputOnChange">
        <div class="label--picker q-py-sm flex justify-center">
          <span>Pilih Gambar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const emit = defineEmits(['change'])
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  accept:{
    type: String,
    default: '.jpg, .jpeg, .png'
  },
  src: {
    type: String,
    default: ''
  }
})
const f = ref(null)
const inputOnChange = (e) => {
  const selectSize = Math.round((e.target.files[0].size / 1024));
  if(selectSize > 1024){
    $q.notify({
      type: 'negative',
      timeout: 3000,
      caption: 'File yang dipilih terlalu besar. Maksimum file upload 2 mb'
    })
    return
  }
  let file = e.target.files[0]
  const url = URL.createObjectURL(file)
  emit('change', {file: file, url: url})
}
</script>