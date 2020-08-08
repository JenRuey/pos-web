export const SAVE_TEMP_USER = "SAVE_TEMP_USER";
export const SAVE_LOGIN_USER = "SAVE_LOGIN_USER";

export function saveTemporaryUser(payload) {
  return { type: SAVE_TEMP_USER, payload };
}

export function saveLoginUser(payload) {
  return { type: SAVE_LOGIN_USER, payload };
}
