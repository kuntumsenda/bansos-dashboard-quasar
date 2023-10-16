<template>
  <q-page>
    <div class="flex header-page--wrapper items-center">
      <h5>{{ $route.meta.title }}</h5>
      <q-chip size="lg" :color="$route.params.type=='new'?'blue-2':'amber-2'" :label="$route.params.type" :class="`q-ml-md ${$route.params.type=='new'?'text-blue-10':'text-amber-10'}`" />
    </div>
    <q-form ref="refForm" @submit="onSubmit($event)" @validation-error="errorValidationForm($event)">
      <div class="row q-col-gutter-x-lg q-my-lg q-col-gutter-y-sm">
        <div class="col-12 row text-primary items-center">
          <q-icon name="mdi-account-outline" size="24px" class="q-mr-sm"/>
          <h6 class="text-weight-regular">Infomarsi Pribadi</h6>
        </div>
        <div :id="`${form.name.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.name.id">{{ form.name.label }} (sesuai KTP) <span v-if="form.name.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.name.id" :ref="form.name.id"
            outlined dense :type="form.name.type"
            v-model="form.name.value"
            :placeholder="`Masukkan ${form.name.label}`"
            :disable="form.name.disabled"
            :rules="setRules(form.name.rules, form.name.label)"
          />
        </div>
        <div :id="`${form.nik.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.nik.id">{{ form.nik.label }} <span v-if="form.nik.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.nik.id" :ref="form.nik.id"
            outlined dense :type="form.nik.type"
            v-model="form.nik.value"
            :placeholder="`Masukkan ${form.nik.label}`"
            :disable="form.nik.disabled"
            :rules="setRules(form.nik.rules, form.nik.label)"
          />
        </div>
        <div :id="`${form.age.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.age.id">{{ form.age.label }} (>=25 Th)<span v-if="form.age.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.age.id" :ref="form.age.id"
            outlined dense :type="form.age.type"
            v-model="form.age.value"
            :placeholder="`Masukkan ${form.age.label}`"
            :disable="form.age.disabled"
            :rules="setRules(form.age.rules, form.age.label)"
          />
        </div>
        <div :id="`${form.kk.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.kk.id">{{ form.kk.label }} <span v-if="form.kk.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.kk.id" :ref="form.kk.id"
            outlined dense :type="form.kk.type"
            v-model="form.kk.value"
            :placeholder="`Masukkan ${form.kk.label}`"
            :disable="form.kk.disabled"
            :rules="setRules(form.kk.rules, form.kk.label)"
          />
        </div>
        <div :id="`${form.gender.id}-container`" :class="`col-md-6 col-12`">
          <div>
          <label :for="form.gender.id">{{ form.gender.label }} <span v-if="form.gender.rules.required" class="text-negative">*</span></label>
          </div>
          <q-radio v-for="gen in form.gender.options" :key="gen.value" v-model="form.gender.value" :rules="form.gender.rules" :disable="form.gender.disabled" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="gen.value" :label="gen.label" class="q-mr-md q-mb-md" />
        </div>
        <div :id="`${form.fileKTP.id}-container`" :class="`col-md-3 col-sm-5 col-6`">
          <label :for="form.fileKTP.id">{{ form.fileKTP.label }} <span v-if="form.fileKTP.rules.required" class="text-negative">*</span></label>
          <div class="text-caption text-grey1 text-left q-mb-sm">(Max: 2mb, Tipe: JPG/JPEG/PNG)</div>
          <uploadFile :id="form.fileKTP.id" accept=".jpg, .jpeg, .png" :src="form.fileKTP.value" @change="onChangeFile($event, form.fileKTP.id)" />
        </div>
        <div :id="`${form.fileKK.id}-container`" :class="`col-md-3 col-sm-6 col-12`">
          <label :for="form.fileKK.id">{{ form.fileKK.label }} <span v-if="form.fileKK.rules.required" class="text-negative">*</span></label>
          <div class="text-caption text-grey1 text-left q-mb-sm">(Max: 2mb, Tipe: JPG/JPEG/PNG)</div>
          <uploadFile :id="form.fileKK.id" accept=".jpg, .jpeg, .png" :src="form.fileKK.value" @change="onChangeFile($event, form.fileKK.id)" />
        </div>
      </div>
      <div class="row q-col-gutter-x-lg q-my-lg q-col-gutter-y-sm">
        <div class="col-12 row text-primary items-center">
          <q-icon name="mdi-home-outline" size="24px" class="q-mr-sm"/>
          <h6 class="text-weight-regular">Infomarsi Alamat</h6>
        </div>
        <div :id="`${form.province.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.province.id">{{ form.province.label }} <span v-if="form.province.rules.required" class="text-negative">*</span></label>
          <q-select
            :id="form.province.id" :ref="form.province.id"
            outlined dense
            use-input input-debounce="0" behavior="menu"
            v-model="form.province.value"
            :options="form.province.options"
            option-label="name"
            :placeholder="form.province.value?'':`Pilih ${form.province.label}`"
            :disable="form.province.disabled"
            :rules="setRules(form.province.rules, form.province.label)"
            :loading="form.province.loading"
            @filter="filterProvince"
            @update:model-value="onChangeSelect(form.province.id, form.province.value)"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div :id="`${form.state.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.state.id">{{ form.state.label }} <span v-if="form.state.rules.required" class="text-negative">*</span></label>
          <q-select
            :id="form.state.id" :ref="form.state.id"
            outlined dense
            use-input input-debounce="0" behavior="menu"
            v-model="form.state.value"
            :options="form.state.options"
            option-label="name"
            :placeholder="form.state.value?'':`Pilih ${form.state.label}`"
            :disable="form.state.disabled"
            :rules="setRules(form.state.rules, form.state.label)"
            :loading="form.state.loading"
            @filter="filterState"
            @update:model-value="onChangeSelect(form.state.id, form.state.value)"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div :id="`${form.district.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.district.id">{{ form.district.label }} <span v-if="form.district.rules.required" class="text-negative">*</span></label>
          <q-select
            :id="form.district.id" :ref="form.district.id"
            outlined dense
            use-input input-debounce="0" behavior="menu"
            v-model="form.district.value"
            :options="form.district.options"
            option-label="name"
            :placeholder="form.district.value?'':`Pilih ${form.district.label}`"
            :disable="form.district.disabled"
            :rules="setRules(form.district.rules, form.district.label)"
            :loading="form.district.loading"
            @filter="filterDistrict"
            @update:model-value="onChangeSelect(form.district.id, form.district.value)"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div :id="`${form.subDistrict.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.subDistrict.id">{{ form.subDistrict.label }} <span v-if="form.subDistrict.rules.required" class="text-negative">*</span></label>
          <q-select
            :id="form.subDistrict.id" :ref="form.subDistrict.id"
            outlined dense
            use-input input-debounce="0" behavior="menu"
            v-model="form.subDistrict.value"
            :options="form.subDistrict.options"
            option-label="name"
            :placeholder="form.subDistrict.value?'':`Pilih ${form.subDistrict.label}`"
            :disable="form.subDistrict.disabled"
            :rules="setRules(form.subDistrict.rules, form.subDistrict.label)"
            :loading="form.subDistrict.loading"
            @filter="filterSubDistrict"
            @update:model-value="onChangeSelect(form.subDistrict.id, form.subDistrict.value)"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div :id="`${form.address.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.address.id">{{ form.address.label }} <span v-if="form.address.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.address.id" :ref="form.address.id"
            outlined dense :type="form.address.type"
            counter bottom-slots
            :maxlength="form.address.maxLength"
            v-model="form.address.value"
            :placeholder="`Masukkan ${form.address.label}`"
            :disable="form.address.disabled"
            :rules="setRules(form.address.rules, form.address.label)"
          />
        </div>
        <div :id="`${form.rt.id}-container`" :class="`col-md-3 col-6`">
          <label :for="form.rt.id">{{ form.rt.label }} <span v-if="form.rt.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.rt.id" :ref="form.rt.id"
            outlined dense :type="form.rt.type"
            v-model="form.rt.value"
            :placeholder="`Masukkan ${form.rt.label}`"
            :hint="!form.rt.value?`Masukkan 000 bila tidak ada`:''"
            :disable="form.rt.disabled"
            :rules="setRules(form.rt.rules, form.rt.label)"
          />
        </div>
        <div :id="`${form.rw.id}-container`" :class="`col-md-3 col-6`">
          <label :for="form.rw.id">{{ form.rw.label }} <span v-if="form.rw.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.rw.id" :ref="form.rw.id"
            outlined dense :type="form.rw.type"
            v-model="form.rw.value"
            :placeholder="`Masukkan ${form.rw.label}`"
            :hint="!form.rw.value?`Masukkan 000 bila tidak ada`:''"
            :disable="form.rw.disabled"
            :rules="setRules(form.rw.rules, form.rw.label)"
          />
        </div>
      </div>
      <div class="row q-col-gutter-x-lg q-my-lg q-col-gutter-y-sm">
        <div class="col-12 row text-primary items-center">
          <q-icon name="mdi-currency-usd" size="24px" class="q-mr-sm"/>
          <h6 class="text-weight-regular">Infomarsi Penghasilan</h6>
        </div>
        <div :id="`${form.incomeBeforePandemic.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.incomeBeforePandemic.id">{{ form.incomeBeforePandemic.label }} <span v-if="form.incomeBeforePandemic.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.incomeBeforePandemic.id" :ref="form.incomeBeforePandemic.id"
            outlined dense :type="form.incomeBeforePandemic.type"
            v-model="form.incomeBeforePandemic.value"
            :placeholder="`Masukkan ${form.incomeBeforePandemic.label}`"
            :disable="form.incomeBeforePandemic.disabled"
            :rules="setRules(form.incomeBeforePandemic.rules, form.incomeBeforePandemic.label)"
            @focus="changeNumber(form.incomeBeforePandemic.value, form.incomeBeforePandemic.id)"
            @blur="changeToCurrency(form.incomeBeforePandemic.value, form.incomeBeforePandemic.id)"
          >
            <template v-slot:prepend>
              <span class="text-subtitle1">Rp.</span>
            </template>
          </q-input>
        </div>
        <div :id="`${form.incomeAfterPandemic.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.incomeAfterPandemic.id">{{ form.incomeAfterPandemic.label }} <span v-if="form.incomeAfterPandemic.rules.required" class="text-negative">*</span></label>
          <q-input
            :id="form.incomeAfterPandemic.id" :ref="form.incomeAfterPandemic.id"
            outlined dense :type="form.incomeAfterPandemic.type"
            v-model="form.incomeAfterPandemic.value"
            :placeholder="`Masukkan ${form.incomeAfterPandemic.label}`"
            :disable="form.incomeAfterPandemic.disabled"
            :rules="setRules(form.incomeAfterPandemic.rules, form.incomeAfterPandemic.label)"
            @focus="changeNumber(form.incomeAfterPandemic.value, form.incomeAfterPandemic.id)"
            @blur="changeToCurrency(form.incomeAfterPandemic.value, form.incomeAfterPandemic.id)"
          >
            <template v-slot:prepend>
              <span class="text-subtitle1">Rp.</span>
            </template>
          </q-input>
        </div>
        <div :id="`${form.reason.id}-container`" :class="`col-md-6 col-12`">
          <label :for="form.reason.id">{{ form.reason.label }} <span v-if="form.reason.rules.required" class="text-negative">*</span></label>
          <q-select
            :id="form.reason.id" :ref="form.reason.id"
            outlined dense
            v-model="form.reason.value"
            :options="form.reason.options"
            :disable="form.reason.disabled"
            :rules="setRules(form.reason.rules, form.reason.label)"
          >
            <template v-slot:selected-item>
              <span v-if="form.reason.value">{{ form.reason.value }}</span>
              <span v-else class="text-grey-6">Pilih {{ form.reason.label }}</span>
            </template>
          </q-select>
        </div>
        <div :id="`${form.anotherReason.id}-container`" v-if="form.reason.value === 'Lainnya'" :class="`col-md-6 col-12`">
          <label :for="form.anotherReason.id">{{ form.anotherReason.label }} <span class="text-negative">*</span></label>
          <q-input
            :id="form.anotherReason.id" :ref="form.anotherReason.id"
            outlined dense :type="form.anotherReason.type"
            v-model="form.anotherReason.value"
            :placeholder="`Masukkan ${form.anotherReason.label}`"
            :disable="form.anotherReason.disabled"
            :rules="setRules(form.anotherReason.rules, form.anotherReason.label)"
          />
        </div>
      </div>

      <q-checkbox size="md" v-model="isTnC" val="md" :label="tncText" class="q-mt-lg" />
      
      <div class="flex justify-center q-mt-xl q-mb-md">
        <q-btn label="Submit" type="submit" color="primary" style="width: 130px" />
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import emsifaService from 'src/services/emsifa'
import { useQuasar } from 'quasar'
import uploadFile from 'src/components/uploadFile/Index.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const $q = useQuasar()
const store = useStore()
const route = useRoute()
const router = useRouter()

const refForm = ref(null)
const refName = ref(null)

const form = ref({
  name: {
    id: 'name',
    type: 'text',
    value: '',
    label: 'Nama',
    rules: {
      required: true,
      minLength: 2
    },
    disabled: false
  },
  nik: {
    id: 'nik',
    type: 'number',
    value: null,
    label: 'Nomor Induk KTP (NIK)',
    rules: {
      required: true,
      length: 16
    },
    disabled: false
  },
  age: {
    id: 'age',
    type: 'number',
    value: null,
    label: 'Umur',
    rules: {
      required: true,
      age: true
    },
    disabled: false
  },
  kk: {
    id: 'kk',
    type: 'number',
    value: null,
    label: 'Nomor KK',
    rules: {
      required: true,
      length: 16
    },
    disabled: false
  },
  gender: {
    id: 'gender',
    value: null,
    label: 'Jenis Kelamin',
    options: [
      { value: 'male', label: 'Laki-laki'},
      { value: 'female', label: 'Perempuan'}
    ],
    rules: {
      required: true
    },
    errMessage: '',
    disabled: false
  },
  fileKTP: {
    id: 'fileKTP',
    value: null,
    file: null,
    label: 'Upload Foto KTP',
    rules: {
      required: true,
    },
    errMessage: '',
    disabled: false
  },
  fileKK: {
    id: 'fileKK',
    value: null,
    file: null,
    label: 'Upload Foto KK',
    rules: {
      required: true,
    },
    errMessage: '',
    disabled: false
  },
  province: {
    id: 'province',
    value: null,
    label: 'Provinsi',
    options: [],
    optionsTemp: [],
    rules: {
      required: true,
    },
    disabled: false,
    loading: false
  },
  state: {
    id: 'state',
    value: null,
    label: 'Kabupaten/Kota',
    options: [],
    optionsTemp: [],
    rules: {
      required: true,
    },
    disabled: true,
    loading: false
  },
  district: {
    id: 'district',
    value: null,
    label: 'Kecamatan',
    options: [],
    optionsTemp: [],
    rules: {
      required: true,
    },
    disabled: true,
    loading: false
  },
  subDistrict: {
    id: 'subDistrict',
    value: null,
    label: 'Kelurahan/Desa',
    options: [],
    optionsTemp: [],
    rules: {
      required: true,
    },
    disabled: true,
    loading: false
  },
  address: {
    id: 'address',
    type: 'textarea',
    value: '',
    label: 'Alamat',
    rules: {
      required: true,
      maxLength: 255
    },
    disabled: false
  },
  rt: {
    id: 'rt',
    value: null,
    label: 'RT',
    rules: {
      required: true,
      length: 3,
      number: true
    },
    disabled: false
  },
  rw: {
    id: 'rw',
    value: null,
    label: 'RW',
    rules: {
      required: true,
      length: 3,
      number: true
    },
    disabled: false
  },
  incomeBeforePandemic: {
    id: 'incomeBeforePandemic',
    type: 'text',
    value: null,
    label: 'Pendapatan Sebelum Pandemi (Rupiah)',
    rules: {
      required: true,
    },
    disabled: false
  },
  incomeAfterPandemic: {
    id: 'incomeAfterPandemic',
    type: 'text',
    value: null,
    label: 'Pendapatan Setelah Pandemi (Rupiah)',
    rules: {
      required: true,
    },
    disabled: false
  },
  reason: {
    id: 'reason',
    value: '',
    label: 'Alasan Membutuhkan Bantuan',
    options: [
      'Kehilangan pekerjaan',
      'Kepala keluarga terdampak atau korban Covid-19',
      'Tergolong fakir/miskin semenjak sebelum Covid-19',
      'Lainnya'
    ],
    rules: {
      required: true,
    },
    disabled: false
  },
  anotherReason: {
    id: 'anotherReason',
    type: 'text',
    value: '',
    label: 'Alasan Lainnya',
    rules: {
      required: true,
    },
    disabled: false
  }
})

const isTnC = ref(false)
const tncText = ref('Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.')

onMounted(() => {
  if(route.params.type !== 'new'){
    $q.notify({ type: 'info', caption: 'Fitur Belum Tersedia' })
    router.go(-1)
    return
  }
  getJSONEmsifa({
    service: 'getProvinces',
    id: form.value.province.id,
    title: form.value.province.label
  })
})

function setRules(rules, label){
  let newRules = []
  if(rules.required){
    newRules.push(val => (val && val.length > 0 || val && val != {}  || val && val != null) || `${label} wajib diisi`)
  }
  if(rules.minLength){
    newRules.push(val => val && val.length > rules.minLength || `Masukkan ${label} minimal ${rules.minLength+1}  karakter`)
  }
  if(rules.maxLength){
    newRules.push(val => val && val.length <= rules.maxLength || `Masukkan ${label} maksimal ${rules.maxLength}  karakter}`)
  }
  if(rules.length){
    newRules.push(val => val && String(val.length) == rules.length || `Masukkan ${label} ${rules.length} karakter`)
  }
  if(rules.age){
    newRules.push(val => val > 0 && val >= 25 || 'Umur minimal 25 Tahun')
    newRules.push(val => val > 0 && val < 120 || 'Umur Invalid')
  }
  return newRules
}

function onChangeSelect(type, value){
  if(type == 'province'){
    form.value.state.value = ''
    form.value.district.value = ''
    form.value.district.options = []
    form.value.subDistrict.value = ''
    form.value.subDistrict.options = []
    if(!value){
      form.value.state.disabled = true
      form.value.district.disabled = true
      form.value.subDistrict.disabled = true
    }
    getJSONEmsifa({
      service: 'getStates',
      value: form.value.province.value.id&&form.value.province.value.id,
      id: form.value.state.id,
      title: form.value.state.label
    })
    return
  }
  if(type == 'state'){
    form.value.district.value = ''
    form.value.subDistrict.value = ''
    form.value.subDistrict.options = []
    if(!value){
      form.value.district.disabled = true
      form.value.subDistrict.disabled = true
    }
    getJSONEmsifa({
      service: 'getDistricts',
      value: form.value.state.value.id,
      id: form.value.district.id,
      title: form.value.district.label
    })
    return
  }
  if(type == 'district'){
    form.value.subDistrict.value = ''
    if(!value){
      form.value.subDistrict.disabled = true
    }
    getJSONEmsifa({
      service: 'getSubDistricts',
      value: form.value.district.value.id,
      id: form.value.subDistrict.id,
      title: form.value.subDistrict.label
    })
    return
  }
}

async function getJSONEmsifa(payload){
  form.value[payload.id].loading = true
  try{
    const res = await emsifaService[payload.service](payload.value&&payload.value)
    form.value[payload.id].loading = false
    if(res.data && res.data.length){
      form.value[payload.id].options = res.data
      form.value[payload.id].optionsTemp = res.data
      form.value[payload.id].disabled = false
      return
    }
  }catch(e){
    form.value[payload.id].loading = false
  }
}

function filterProvince (val, update) {
  if (val === '') {
    update(() =>  form.value.province.options = form.value.province.optionsTemp )
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    form.value.province.options = form.value.province.optionsTemp.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
  })
}
function filterState (val, update) {
  if (val === '') {
    update(() =>  form.value.state.options = form.value.state.optionsTemp )
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    form.value.state.options = form.value.state.optionsTemp.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
  })
}
function filterDistrict (val, update) {
  if (val === '') {
    update(() =>  form.value.district.options = form.value.district.optionsTemp )
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    form.value.district.options = form.value.district.optionsTemp.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
  })
}
function filterSubDistrict (val, update) {
  if (val === '') {
    update(() =>  form.value.subDistrict.options = form.value.subDistrict.optionsTemp )
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    form.value.subDistrict.options = form.value.subDistrict.optionsTemp.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
  })
}
function scrollInto(element){
  var headerOffset = document.querySelector('.q-header').offsetHeight;
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}
async function errorValidationForm(e){
  const element = document.getElementById(e.$attrs.id+'-container')
  scrollInto(element)
  $q.notify({ type: 'negative', timeout: 3000, caption: 'Masih ada inputan yang belum diisi atau tidak valid' })
}
async function onSubmit(){
  if(!form.value.fileKTP.file){
    $q.notify({ type: 'negative', timeout: 3000, caption: 'Anda belum upload foto KTP' })
    return
  }
  if(!form.value.fileKK.file){
    $q.notify({ type: 'negative', timeout: 3000, caption: 'Anda belum upload foto KK' })
    return
  }
  if(!isTnC.value){
    $q.notify({ type: 'negative', timeout: 3000, caption: 'Anda belum ceklis pernyataan diatas' })
    return 
  }
  let payload = {}
  for (const key in form.value) {
    payload[key] = form.value[key].value
  }
  payload.fileKTP = form.value.fileKTP.file
  payload.fileKK = form.value.fileKK.file
  console.log(payload)
  await store.dispatch('bansosStore/submitFormBansosCovid', payload)
  setTimeout(() => {
    $q.notify({
      type: 'positive',
      caption: 'Data berhasil di submit'
    })
  }, 4000);
}
function changeNumber(number, id){
  if(number){
    const splitVal = number.split('.')
    let string = splitVal.join('')
    form.value[id].value = parseFloat(string)
  }
}
function changeToCurrency(number, id){
  if(number){
    form.value[id].value = parseInt(number).toLocaleString('id-ID')
  }
}
function onChangeFile(e, id){
  let formData = new FormData();
  formData.append("file", e.file);
  form.value[id].file = formData
  form.value[id].value = e.url
}
</script>