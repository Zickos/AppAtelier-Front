import axios from './api'

export const fetchRetrofitList = () => {
  return axios.get('/retrofits')
}

export function createRetrofit(data) {
  return axios.post('/retrofits', data)
}

export function deleteRetrofit(retrofitId) {
  return axios.delete(`/retrofits/${retrofitId}`)
}

export function updateRetrofit(retrofitId, data) {
  return axios.put(`/retrofits/${retrofitId}`, data)
}
