export function valueFromId(id) {
  return document.getElementById(id).value;
}

export function resetValueById(id) {
  document.getElementById(id).value = "";
}
