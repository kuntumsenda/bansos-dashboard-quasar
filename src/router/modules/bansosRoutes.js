const bansos = [
  {
    path: 'bansos',
    name: 'bansos',
    menuText: 'Bantuan Sosial',
    icon: 'mdi-charity',
    children: [
      {
        path: 'covid',
        name: 'bansosCovidData',
        menuText: 'Covid 19',
        component: () => import('pages/bansos/covid/Index.vue'),
        meta: {
          requiresAuth: true,
          title: 'Data Bantuan Sosial Covid 19',
          breadCrumbs: [
            { text: 'Bantuan Sosial' },
            { text: 'Data Bansos Covid 19' }
          ]
        },
      },
      {
        path: 'covid/input-form/:type',
        name: 'bansosCovidForm',
        component: () => import('pages/bansos/covid/Form.vue'),
        meta: {
          requiresAuth: true,
          title: 'Form Bantuan Sosial Covid 19',
          breadCrumbs: [
            { text: 'Bantuan Sosial' },
            { text: 'Data Bansos Covid 19', to: { name: 'bansosCovid'} },
            { text: 'Form' },
          ]
        },
      },
    ]
  },
]

export default bansos