export const AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i
export const SEEK_ON_PLAY_EXPIRY = 5000

export function canPlay(url) {
  if (url instanceof Array) {
    for (let item of url) {
      if (typeof item === 'string' && canPlay(item)) {
        return true
      }
      if (canPlay(item.src)) {
        return true
      }
    }
    return false
  }
  return AUDIO_EXTENSIONS.test(url)
}

export function omit(object, ...arrays) {
  const omitKeys = [].concat(...arrays)
  const output = {}
  const keys = Object.keys(object)
  for (let key of keys) {
    if (omitKeys.indexOf(key) === -1) {
      output[key] = object[key]
    }
  }
  return output
}

export function isObject(val) {
  if (val === null) return false
  return typeof val === 'function' || typeof val === 'object'
}
