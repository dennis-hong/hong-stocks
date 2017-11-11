import { Map } from 'immutable'

export function makeUrl (url, params) {
  return url + '?' + getParameter(params)
}

function getParameter (orgParam) {
  const param = (orgParam instanceof Map) ? orgParam : Map(orgParam)
  return param.filter((x, _) => x !== null && x !== undefined).map((x, y) => y + '=' + encodeURIComponent(x)).join('&')
}

const UrlParameter = {
  makeUrl
}

export default UrlParameter
