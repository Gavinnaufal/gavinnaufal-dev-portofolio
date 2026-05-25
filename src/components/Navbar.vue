<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navItems } from '../data/portfolio'

const isScrolled = ref(false)
const isOpen = ref(false)
const activeSection = ref('home')

const updateNavigation = () => {
  isScrolled.value = window.scrollY > 18

  const scrollPosition = window.scrollY + 160
  const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    if (sections[index].offsetTop <= scrollPosition) {
      activeSection.value = sections[index].id
      break
    }
  }
}

const closeMenu = () => {
  isOpen.value = false
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    closeMenu()
  }
}

onMounted(() => {
  updateNavigation()
  window.addEventListener('scroll', updateNavigation, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavigation)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})

watch(isOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 transition duration-500 min-[360px]:px-4 min-[360px]:pt-4 sm:px-5 sm:pt-3">
    <nav
      class="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between rounded-3xl border px-4 py-3 transition duration-500 min-[360px]:px-5 min-[360px]:py-4 sm:rounded-2xl sm:px-5 sm:py-3"
      :class="
        isScrolled || isOpen
          ? 'border-line bg-white/80 shadow-soft backdrop-blur-xl'
          : 'border-transparent bg-white/0'
      "
      aria-label="Main navigation"
    >
      <a href="#home" class="flex min-h-12 items-center gap-3" @click="closeMenu">
        <span class="block text-sm font-bold uppercase text-ink">
          <img src="@/assets/images/logo-nav.png" alt="" class="size-12 sm:size-16">
        </span>
      </a>

      <div class="hidden items-center gap-1 rounded-full border border-line bg-white/70 p-1 shadow-sm backdrop-blur lg:flex">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="relative rounded-full px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:text-ink xl:px-5"
          :class="{ 'text-ink': activeSection === item.id }"
        >
          <span class="relative z-10">{{ item.label }}</span>
          <span
            v-if="activeSection === item.id"
            class="absolute inset-0 rounded-full border border-line bg-white shadow-sm"
            aria-hidden="true"
          ></span>
        </a>
      </div>

      <a href="#contact" class="button-secondary hidden min-h-10 px-5 lg:inline-flex">Let's Talk</a>

      <button
        class="grid size-14 place-items-center rounded-3xl border border-line bg-white/85 shadow-sm backdrop-blur transition hover:bg-white sm:size-11 sm:rounded-2xl lg:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <span class="relative h-4 w-7 sm:h-3.5 sm:w-5">
          <span
            class="absolute left-0 top-0 h-0.5 w-7 rounded-full bg-ink transition duration-300 sm:w-5"
            :class="{ 'top-2 rotate-45 sm:top-1.5': isOpen }"
          ></span>
          <span
            class="absolute bottom-0 left-0 h-0.5 w-7 rounded-full bg-ink transition duration-300 sm:w-5"
            :class="{ 'bottom-[7px] -rotate-45 sm:bottom-1.5': isOpen }"
          ></span>
        </span>
      </button>
    </nav>

    <div class="pointer-events-none fixed inset-0 z-10 lg:hidden">
      <button
        class="absolute inset-0 bg-ink/20 backdrop-blur-sm transition duration-300"
        :class="isOpen ? 'pointer-events-auto opacity-100' : 'opacity-0'"
        type="button"
        aria-label="Close navigation menu"
        @click="closeMenu"
      ></button>

      <div
        class="pointer-events-auto absolute right-3 top-24 flex max-h-[calc(100dvh-7rem)] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-white/95 p-3 shadow-lift backdrop-blur-xl transition duration-300 ease-out min-[360px]:right-4 min-[360px]:w-[calc(100vw-2rem)] sm:right-5 sm:top-24"
        :class="isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'"
      >
        <div class="overflow-y-auto overscroll-contain pr-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="flex min-h-14 items-center justify-between gap-4 rounded-2xl px-5 py-4 text-lg font-bold leading-none text-muted transition hover:bg-soft hover:text-ink"
            :class="{ 'bg-soft text-ink': activeSection === item.id }"
            @click="closeMenu"
          >
            {{ item.label }}
            <span v-if="activeSection === item.id" class="size-2.5 shrink-0 rounded-full bg-accent"></span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
