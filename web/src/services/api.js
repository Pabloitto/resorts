import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:3001'

export const doRequest = async (options) => {
  const axionPayload = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    ...options
  }

  const response = await Axios(axionPayload)

  return response.data
}

export const saveResort = (resort) => (
  doRequest({
    url: '/resorts',
    method: 'POST',
    data: resort
  })
)

export const getResorts = () => (
  doRequest({ url: '/resorts' })
)

export const saveUser = (user) => (
  doRequest({
    url: '/users',
    method: 'POST',
    data: user
  })
)

export const getUsers = () => (
  doRequest({ url: '/users' })
)
