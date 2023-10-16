<template>
  <q-page>
    <div class="row wrap justify-between header-page--wrapper">
      <h5>{{ $route.meta.title }}</h5>
      <q-btn label="Input Baru" color="white" flat class="bg-primary" @click="$router.push({ name: 'bansosCovidForm', params: {type: 'new'} })"></q-btn>
    </div>
    <q-table
      flat
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const columns = ref([
  {
    name: 'no',
    required: true,
    label: 'No.',
    align: 'left',
    field: 'no',
    format: val => `${val}`,
    sortable: false
  },
  { name: 'nik', align: 'left', label: 'Nomor Induk KTP (NIK)', field: 'nik', sortable: false },
  { name: 'name', label: 'Nama', align: 'left', field: 'name', sortable: false },
  { name: 'province', label: 'Provinsi', field: 'province' },
  { name: 'state', label: 'Kabupaten/Kota', field: 'state' },
  { name: 'incomeBeforePandemic', label: 'Penghasilan Sebelum Pandemi', field: 'incomeBeforePandemic' },
  { name: 'incomeAfterPandemic', label: 'Penghasilan Setelah Pandemi', field: 'incomeAfterPandemic', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'action', label: 'Action', field: 'action', sortable: false, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rows = ref([
  {
    no: 1,
    nik: '1234567890123456',
    name: 'Dummy Name',
    province: 'DKI Jakarta',
    state: 'Jakarta Selatan',
    incomeBeforePandemic: 3000000,
    incomeAfterPandemic: 2000000,
  },
])
</script>