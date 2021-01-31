import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:3001'

export const getResorts = () => (
  Axios.get('/resorts').then((response) => response.data)
)

export const getUsers = () => (
  Axios.get('/users').then((response) => response.data)
)
