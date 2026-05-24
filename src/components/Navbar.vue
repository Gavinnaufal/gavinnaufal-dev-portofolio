<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
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

onMounted(() => {
  updateNavigation()
  window.addEventListener('scroll', updateNavigation, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavigation)
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 transition duration-500 sm:px-5">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition duration-500 sm:px-5"
      :class="
        isScrolled || isOpen
          ? 'border-line bg-white/80 shadow-soft backdrop-blur-xl'
          : 'border-transparent bg-white/0'
      "
      aria-label="Main navigation"
    >
      <a href="#home" class="flex items-center gap-3" @click="closeMenu">
        <span class="hidden text-sm font-bold uppercase text-ink sm:block"><img src="@/assets/images/logo-nav.png" alt="" class="size-16"></span>
      </a>

      <div class="hidden items-center gap-1 rounded-full border border-line bg-white/70 p-1 shadow-sm backdrop-blur lg:flex">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="relative rounded-full px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:text-ink"
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
        class="grid size-11 place-items-center rounded-2xl border border-line bg-white/80 shadow-sm backdrop-blur transition hover:bg-white lg:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <span class="relative h-3.5 w-5">
          <span
            class="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-ink transition duration-300"
            :class="{ 'top-1.5 rotate-45': isOpen }"
          ></span>
          <span
            class="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-ink transition duration-300"
            :class="{ 'bottom-1.5 -rotate-45': isOpen }"
          ></span>
        </span>
      </button>
    </nav>

    <div
      class="mx-auto max-w-7xl overflow-hidden px-1 transition-all duration-500 lg:hidden"
      :class="isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="mt-3 rounded-2xl border border-line bg-white/90 p-2 shadow-soft backdrop-blur-xl">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-soft hover:text-ink"
          :class="{ 'bg-soft text-ink': activeSection === item.id }"
          @click="closeMenu"
        >
          {{ item.label }}
          <span v-if="activeSection === item.id" class="size-2 rounded-full bg-accent"></span>
        </a>
      </div>
    </div>
  </header>
</template>
