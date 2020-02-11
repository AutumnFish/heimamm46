// 操纵token的key 一般用 常量 加大写 (大部分都这么做)
const TOKENKEY = 'heimammToken';

// 设置token
export function setToken(token) {
  window.localStorage.setItem(TOKENKEY, token);
}
// 获取token
export function getToken() {
  // 获取到token之后为了让调用getToken函数的用户获取到值，必须要返回
  return window.localStorage.getItem(TOKENKEY);
}
// 移除token
export function removeToken() {
  window.localStorage.removeItem(TOKENKEY);
}
