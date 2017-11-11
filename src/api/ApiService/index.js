import RestClient from './RestClient'
import ImageService from '../services/ImageService'

const restClient = new RestClient()
/* global __API_SERVER__ */
const API_URL = 'http://127.0.0.1:5000'

const imageService = new ImageService(restClient, API_URL)

export {
  imageService,
}

export default restClient
