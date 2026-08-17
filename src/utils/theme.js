import { ref } from 'vue'

const THEME_KEY = 'portfolio-theme'

export const isDark = ref(false)

export function initTheme() {
  if (typeof window === 'undefined') return
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
}

export function toggleTheme() {
  if (typeof window === 'undefined') return
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}

export function setTheme(dark) {
  if (typeof window === 'undefined') return
  isDark.value = !!dark
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}
