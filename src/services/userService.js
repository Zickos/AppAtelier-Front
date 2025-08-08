import api from "./api";

export function fetchInfoPersonnel(userId) {
  return api.get(`/users/${userId}`);
}

export function fetchUserList() {
  return api.get(`/users/`);
}

export function fetchUserMecanicienList() {
  return api.get(`/indexMecanicien/`);
}

export function fetchUserMagasinierList() {
  return api.get(`/indexMagasinier/`);
}

export function fetchUserOnlyList() {
  return api.get(`/indexUsers`);
}
