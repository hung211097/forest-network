export function saveItem(key, value){
  window.localStorage.setItem(key, value)
}

export function loadItem(key){
  let res = window.localStorage.getItem(key)
  return res
}

export function removeItem(key){
  window.localStorage.removeItem(key)
}
