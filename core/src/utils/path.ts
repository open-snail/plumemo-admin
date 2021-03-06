/**
 * 末尾添加'/'
 * @param  path 路径
 */
export function trailingSlash(path: string) {
  return path.endsWith('/') ? path : path + '/';
}

/**
 * 判断是否为绝对URL地址
 * @param {string} url URL字符串
 * @returns {boolean} true/false
 */
export function isAbsoluteUrl(url: string) {
  return /^(https?:\/\/|\/\/)[\w.]+\/?/gi.test(url);
}
