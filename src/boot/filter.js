// leave the export, even if you don't use it
export default ({ Vue }) => {
  // ellipsis text
  Vue.filter('ellipsis', function (string, max) {
    if(string) {
      let val = (string.length > max) ? string.slice(0, max) + '...' : string
      return val
    }
    return string
  })
}
