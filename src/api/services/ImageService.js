export default class ImageService {
  constructor (restClient, API_URL) {
    this.apiClient = restClient
    this.baseUrl = API_URL
  }

  fetchValue (params = {}) {
    return this.apiClient.get(`${this.baseUrl}/`, params)
  }

  fetchImages (params = {}) {
    return this.apiClient.get(`${this.baseUrl}/images`, params)
  }

  fetchImage (imageId) {
    return this.apiClient.get(`${this.baseUrl}/images/${imageId}`)
  }

  deleteImage (imageId) {
    return this.apiClient.delete(`${this.baseUrl}/images/${imageId}`)
  }

  updateImage (imageUpdate) {
    return this.apiClient.patch(`${this.baseUrl}/images/${imageUpdate.id}`, imageUpdate)
  }

  fetchDiskFormats () {
    return this.apiClient.get(`${this.baseUrl}/images/diskFormats`)
  }

}
