import axios from './api'

export const fetchVehicleList = () => {
  return axios.get('/vehicles')
}

export const fetchTypeVehicleList = () => {
  return axios.get('/typevehicles')
}


export function createVehicle(data) {
  return axios.post('/vehicles', data)
}

export function deleteVehicle(vehicleId) {
  return axios.delete(`/vehicles/${vehicleId}`)
}

export function updateVehicle(vehicleId, data) {
  return axios.put(`/vehicles/${vehicleId}`, data)
}
