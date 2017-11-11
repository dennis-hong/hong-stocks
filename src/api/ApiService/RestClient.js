import axios from 'axios'
import UrlParameter from '../../utils/UrlParameter'
import { INVALID_JSON_ERROR, FETCH_REQUEST_ERROR } from 'constants/Error'

export default class ApiService {

  constructor () {
    this._makeHeaders = this._makeHeaders.bind(this)
    this._safeParseJson = this._safeParseJson.bind(this)
    this._safeStringifyJson = this._safeStringifyJson.bind(this)
    this._getToken = this._getToken.bind(this)
    this._getAxios = this._getAxios.bind(this)
    this._isResponseSuccess = this._isResponseSuccess.bind(this)
  }

  get (url, params = {}, timeout) {
    return this._getAxios(url, 'GET', undefined, params, timeout)
  }

  delete (url, payload) {
    return this._getAxios(url, 'DELETE', payload)
  }

  post (url, payload) {
    return this._getAxios(url, 'POST', payload)
  }

  patch (url, payload) {
    return this._getAxios(url, 'PATCH', payload)
  }

  _getAxios (url, method, payload, params = {}, timeout) {
    const config = {
      headers: this._makeHeaders(),
      url: UrlParameter.makeUrl(url, params),
      withCredentials: true,
      transformRequest: [(data) => this._safeStringifyJson(data)],
      method: method
    }

    if (payload) config['data'] = payload
    if (timeout) config['timeout'] = timeout

    return axios.request(config)
      .then(response => {
        if (response.data) {
          const apiResult = this._safeParseJson(response.data)
          if (this._isResponseSuccess(response.status)) {
            return apiResult
          } else {
            return Promise.reject(apiResult)
          }
        }
      })
      .catch((e) => {
        if (e.response) {
          return Promise.reject(e.response.data)
        } else {
          FETCH_REQUEST_ERROR.message = e.message
          return Promise.reject(FETCH_REQUEST_ERROR)
        }
      })
  }

  _makeHeaders () {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const token = this._getToken()
    if (token) headers['x-dds-authorization'] = token
    return headers
  }

  _getToken () {
    return this._safeParseJson(localStorage.getItem('redux'))
  }

  _safeParseJson (text) {
    let apiResult
    try {
      apiResult = JSON.parse(text)
    } catch (e) {
      apiResult = (INVALID_JSON_ERROR.message = text)
    }
    return apiResult
  }

  _safeStringifyJson (payload) {
    let stringJson
    try {
      stringJson = JSON.stringify(payload)
    } catch (e) {
      stringJson = payload || undefined
    }
    return stringJson
  }

  _isResponseSuccess (status) {
    return status >= 200 && status < 300
  }
}
