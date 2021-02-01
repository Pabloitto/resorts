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

export const saveOrUpdateResort = (id, resort) => {
  let url = '/resorts'
  let method = 'POST'

  if (id) {
    url += `/${id}`
    method = 'PATCH'
  }

  return doRequest({
    url,
    method,
    data: resort
  })
}

export const getResorts = () => (
  doRequest({ url: '/resorts' })
)

export const deleteResort = (id) => (
  doRequest({
    url: `/resorts/${id}`,
    method: 'DELETE'
  })
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
