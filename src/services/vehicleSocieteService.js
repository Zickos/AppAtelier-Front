import axios from './api'

export const fetchVehicleList = () => {
  return axios.get('/vehiclessociete')
}

export function createVehicle(data) {
  return axios.post('/vehiclessociete', data)
}

export function deleteVehicle(vehicleId) {
  return axios.delete(`/vehiclessociete/${vehicleId}`)
}

export function updateVehicle(vehicleId, data) {
  return axios.put(`/vehiclessociete/${vehicleId}`, data)
}
