<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import portfolioData from '@/data/portfolio.json'
import { isSoundEnabled, playClickSound, playHoverSound, toggleSound } from '@/utils/audio'

const props = defineProps({
  lenis: {
    type: Object,
    default: null,
  },
})

const { navigation } = portfolioData
const navItems = navigation.links

const isScrolled = ref(false)
const isOpen = ref(false)
const activeSection = ref('')

const updateNavigation = () => {
  isScrolled.value = window.scrollY > 30

  const scrollPosition = window.scrollY + 200
  const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    if (sections[index].offsetTop <= scrollPosition) {
      activeSection.value = sections[index].id
      break
    }
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

const handleResize = () => {
  if (window.innerWidth >= 768 && isOpen.value) {
    closeMenu()
  }
}

const closeMenu = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  if (props.lenis) {
    props.lenis.start()
  }
}

const openMenu = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  if (props.lenis) {
    props.lenis.stop()
  }
}

const toggleMenu = () => {
  playClickSound()
  if (isOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

const scrollToSection = (id) => {
  playClickSound()
  closeMenu()

  // Wait for body scroll unlock before executing smooth scroll
  setTimeout(() => {
    const target = document.getElementById(id)
    if (!target) return

    if (props.lenis) {
      props.lenis.scrollTo(target, { offset: -70, duration: 1.0 })
    } else {
      const navOffset = window.innerWidth >= 640 ? 80 : 64
      const y = target.getBoundingClientRect().top + window.pageYOffset - navOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, 60)
}

onMounted(() => {
  updateNavigation()
  window.addEventListener('scroll', updateNavigation, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavigation)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})

watch(isOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  if (props.lenis) {
    if (value) {
      props.lenis.stop()
    } else {
      props.lenis.start()
    }
  }
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="[
      isOpen
        ? 'bg-[#090a0c] border-b border-hairline shadow-2xl'
        : isScrolled
          ? 'bg-[#090a0c]/90 backdrop-blur-md border-b border-hairline'
          : 'bg-transparent border-b border-hairline/30',
    ]"
  >
    <div class="editorial-shell">
      <nav class="flex h-16 items-center justify-between gap-4 sm:h-20" aria-label="Main Navigation">
        <!-- Brand / Name -->
        <a
          href="#home"
          class="flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-chalk transition-colors hover:text-signal focus-visible:ring-2 focus-visible:ring-signal focus:outline-none sm:text-lg shrink-0"
          @click.prevent="scrollToSection('home')"
          @mouseenter="playHoverSound"
        >
          <span class="size-2 rounded-full bg-signal"></span>
          <span>{{ navigation.brand }}</span>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden items-center gap-1 font-mono text-xs uppercase tracking-widest md:flex">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="relative px-3.5 py-2 text-silver transition-colors duration-200 hover:text-chalk focus-visible:ring-2 focus-visible:ring-signal focus:outline-none"
            :class="{ 'text-chalk font-bold': activeSection === item.id }"
            @click.prevent="scrollToSection(item.id)"
            @mouseenter="playHoverSound"
          >
            <span>{{ item.label }}</span>
            <span
              v-if="activeSection === item.id"
              class="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-signal"
            ></span>
          </a>
        </div>

        <!-- Right Side: Sound Toggle + Contact CTA + Mobile Menu Button -->
        <div class="flex items-center gap-2.5 sm:gap-3">
          <!-- Minimalist Sound Toggle -->
          <button
            type="button"
            class="hidden border border-hairline bg-surface/80 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-silver transition-colors hover:border-signal hover:text-chalk sm:inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-signal focus:outline-none"
            @click="toggleSound"
            @mouseenter="playHoverSound"
            :aria-label="isSoundEnabled ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects'"
          >
            <span class="size-1.5 rounded-full" :class="isSoundEnabled ? 'bg-signal animate-ping' : 'bg-dim'"></span>
            <span>AUDIO: {{ isSoundEnabled ? 'ON' : 'OFF' }}</span>
          </button>

          <!-- Contact CTA Desktop -->
          <a
            :href="navigation.cta.href"
            data-magnetic
            aria-label="Scroll to contact section"
            class="hidden border border-hairline-strong bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-chalk transition-all duration-300 hover:border-signal hover:bg-signal hover:text-white focus-visible:ring-2 focus-visible:ring-signal focus:outline-none sm:inline-flex"
            @click.prevent="scrollToSection('contact')"
            @mouseenter="playHoverSound"
          >
            {{ navigation.cta.label }}
          </a>

          <!-- Polished Animated Hamburger Button (44px Touch Target) -->
          <button
            type="button"
            class="group flex size-11 items-center justify-center border transition-all duration-300 md:hidden focus-visible:ring-2 focus-visible:ring-signal focus:outline-none touch-manipulation active:scale-95"
            :class="isOpen ? 'border-signal bg-surface-elevated' : 'border-hairline bg-surface hover:border-chalk'"
            :aria-expanded="isOpen"
            :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
            aria-controls="mobile-nav-drawer"
            @click="toggleMenu"
          >
            <!-- 3-Line Animated Icon to X Transition -->
            <div class="relative flex h-3.5 w-5 flex-col justify-between" aria-hidden="true">
              <!-- Top Bar -->
              <span
                class="block h-[1.5px] w-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                :class="isOpen ? 'translate-y-[6px] rotate-45 bg-signal' : 'bg-chalk group-hover:bg-signal'"
              ></span>

              <!-- Middle Bar -->
              <span
                class="block h-[1.5px] w-full rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                :class="isOpen ? 'opacity-0 scale-x-0' : 'bg-chalk group-hover:bg-signal'"
              ></span>

              <!-- Bottom Bar -->
              <span
                class="block h-[1.5px] w-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
                :class="isOpen ? '-translate-y-[6px] -rotate-45 bg-signal' : 'bg-chalk group-hover:bg-signal'"
              ></span>
            </div>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Drawer Menu with Solid Opaque Background & Coordinated Entrance -->
    <Transition name="drawer">
      <div
        v-if="isOpen"
        id="mobile-nav-drawer"
        class="fixed inset-x-0 top-16 z-40 flex flex-col justify-between bg-[#090a0c] px-6 py-8 border-b border-hairline sm:top-20 h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] overflow-y-auto"
      >
        <div class="space-y-6">
          <!-- Top Utility Bar inside Drawer -->
          <div class="flex items-center justify-between border-b border-hairline/60 pb-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">// NAVIGATION DIRECTORY</p>
            <button
              type="button"
              class="font-mono text-[11px] uppercase tracking-wider text-silver flex items-center gap-1.5 transition-colors hover:text-signal"
              @click="toggleSound"
            >
              <span class="size-1.5 rounded-full" :class="isSoundEnabled ? 'bg-signal' : 'bg-dim'"></span>
              <span>AUDIO: {{ isSoundEnabled ? 'ON' : 'OFF' }}</span>
            </button>
          </div>

          <!-- Staggered Navigation Links List -->
          <div class="divide-y divide-hairline border-b border-hairline">
            <a
              v-for="(item, index) in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="nav-link-item flex items-center justify-between py-4 text-xl sm:text-2xl font-bold uppercase tracking-tight text-chalk transition-all duration-300 hover:text-signal active:text-signal"
              :class="{ 'text-signal': activeSection === item.id }"
              :style="{ transitionDelay: isOpen ? `${index * 40 + 60}ms` : '0ms' }"
              @click.prevent="scrollToSection(item.id)"
            >
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs text-dim">[0{{ index + 1 }}]</span>
                <span>{{ item.label }}</span>
              </div>
              <span class="font-mono text-xs text-dim transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        <!-- Bottom Action CTA -->
        <div class="pt-6">
          <a
            :href="navigation.cta.href"
            class="flex w-full items-center justify-center border border-signal bg-signal py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-signal-hover active:bg-signal-hover"
            @click.prevent="scrollToSection('contact')"
          >
            {{ navigation.cta.label }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Mobile Drawer Transition */
.drawer-enter-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-leave-active {
  transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.drawer-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.drawer-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Staggered Navigation Items Reveal */
.drawer-enter-active .nav-link-item {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from .nav-link-item {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active,
  .drawer-leave-active,
  .drawer-enter-active .nav-link-item {
    transition: opacity 0.15s ease-in-out !important;
    transform: none !important;
  }
}
</style>
