export function getAccessToken() {
  return sessionStorage.getItem("token");
}

export function setAccessToken(token:string) {
  sessionStorage.setItem("token", token);
}

export function removeAccessToken() {
  sessionStorage.clearItem("token");
}