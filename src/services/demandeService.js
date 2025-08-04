import axios from './api'

export const fetchDemandeList = () => {
  return axios.get('/demandes')
}

export function createDemande(data) {
  return axios.post('/demandes', data)
}

export function deleteDemande(demandeId) {
  return axios.delete(`/demandes/${demandeId}`)
}

export function updateDemande(demandeId, data) {
  return axios.put(`/demandes/${demandeId}`, data)
}
