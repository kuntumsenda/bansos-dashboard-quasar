import routesOptions from "src/router/routes"

export const namespaced = true

export const state = {
  haveVisiting: localStorage.getItem('haveVisiting') || false,
  profile: {
    username: 'kuntumse',
    fullName: 'Kuntum Chaera Senda',
    avatar: 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Images.png',
    roleName: 'staff kepala daerah'
  },
  accessPermission: ['overview', 'bansosCovidData', 'bansosCovidForm'],
  navMenu: []
}
export const getters = {}
export const mutations = {
  SET_NAV_MENU(state) {
    let routes = []
    routesOptions[0].children.forEach(x => {
      if(x.menuText){
        if(x.children){
          let subChild = []
          x.children.forEach(y => {
            if(y.menuText) subChild.push(y)
          })
          x.children = subChild
          routes.push(x)
        }else routes.push(x)
      }
    })
    let menu = []
    if(!state.accessPermission || !state.accessPermission.length) return navMenu = menu
    menu = routes.filter(item => {
      if(item.children && item.children.length){
        let subMenu = []
        item.children.forEach(child => {
          state.accessPermission.forEach(key => {
            if(key.toLowerCase() === child.name.toLowerCase()) return subMenu.push(child)
          }) 
        })
        let menuTemp = item
        menuTemp['isExpand'] = false
        menuTemp.children = []
        menuTemp.children = subMenu
        if(menuTemp && menuTemp.children.length) return menuTemp
      }else{
        let menu2 = []
        menu2 = state.accessPermission.filter(name => name === item.name)
        if(menu2.length) return item
      }
    })
    state.navMenu = menu
  },
  SET_IS_EXPAND_MENU(state, payload){
    state.navMenu[payload].isExpand = !state.navMenu[payload].isExpand
  }
}
export const actions = {}

export default {
  namespaced, state, getters, mutations, actions
}
