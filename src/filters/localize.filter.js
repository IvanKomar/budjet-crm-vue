import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'
const locales = {
  'ru-RU': ru, 
  'en-US': en
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-Ru'
  return locales[locale][key] || `[localize error]: key ${key} not found`
 
}