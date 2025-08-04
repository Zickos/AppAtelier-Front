import api from './api'

export function fetchInfoPersonnel(userId) {
  return api.get(`/users/${userId}`)
}

export function fetchUserList() {
  return api.get(`/users/`)
}

export function fetchUserOnlyList() {
  return api.get(`/indexUsers`)
}

