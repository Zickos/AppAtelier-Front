import axios from './api'

export const fetchPlanningList = () => {
  return axios.get('/plannings')
}

export const fetchPlanningMecanoList = () => {
  return axios.get('/indexMecano')
}

export const fetchPlanningMagasinList = () => {
  return axios.get('/indexMagasin')
}

export function createPlanning(data) {
  return axios.post('/plannings', data)
}

export function deletePlanning(planningId) {
  return axios.delete(`/plannings/${planningId}`)
}

export function updatePlanning(planningId, data) {
  return axios.put(`/plannings/${planningId}`, data)
}
