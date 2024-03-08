import axios from 'axios'

const baseURL = 'http://localhost:4001'

const axiosClient = axios.create({
  baseURL, // Adjust this based on your API URL
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
