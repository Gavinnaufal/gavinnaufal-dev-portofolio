<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'

const cursorWrap = ref(null)
const isVisible = ref(false)
const isHovering = ref(false)
const isViewingProject = ref(false)
const isPressed = ref(false)

let mouseMoveHandler = null
let mouseLeaveHandler = null
let mouseEnterHandler = null
let mouseDownHandler = null
let mouseUpHandler = null

onMounted(() => {
  // Only enable on desktop pointer-capable devices with hover support
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isFinePointer) return

  // Add active class to root element so custom cursor styles apply only when supported
  document.documentElement.classList.add('has-custom-cursor')

  const wrap = cursorWrap.value
  if (!wrap) return

  // High performance GSAP quickTo setters on GPU transforms
  const setX = gsap.quickTo(wrap, 'x', { duration: isReducedMotion ? 0.01 : 0.08, ease: 'power2.out' })
  const setY = gsap.quickTo(wrap, 'y', { duration: isReducedMotion ? 0.01 : 0.08, ease: 'power2.out' })

  mouseMoveHandler = (e) => {
    isVisible.value = true
    const { clientX, clientY, target } = e

    setX(clientX)
    setY(clientY)

    if (!target) return

    // Context-aware interaction detection
    const projectTarget = target.closest('.project-row, [data-cursor="view"]')
    const interactiveTarget = target.closest('a, button, [role="button"], [data-magnetic], input, select, textarea, .nav-link-item')

    if (projectTarget) {
      isViewingProject.value = true
      isHovering.value = false
    } else if (interactiveTarget) {
      isHovering.value = true
      isViewingProject.value = false
    } else {
      isHovering.value = false
      isViewingProject.value = false
    }
  }

  mouseLeaveHandler = () => {
    isVisible.value = false
  }

  mouseEnterHandler = () => {
    isVisible.value = true
  }

  mouseDownHandler = () => {
    isPressed.value = true
  }

  mouseUpHandler = () => {
    isPressed.value = false
  }

  window.addEventListener('mousemove', mouseMoveHandler, { passive: true })
  document.addEventListener('mouseleave', mouseLeaveHandler, { passive: true })
  document.addEventListener('mouseenter', mouseEnterHandler, { passive: true })
  window.addEventListener('mousedown', mouseDownHandler, { passive: true })
  window.addEventListener('mouseup', mouseUpHandler, { passive: true })
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
  if (mouseLeaveHandler) document.removeEventListener('mouseleave', mouseLeaveHandler)
  if (mouseEnterHandler) document.removeEventListener('mouseenter', mouseEnterHandler)
  if (mouseDownHandler) window.removeEventListener('mousedown', mouseDownHandler)
  if (mouseUpHandler) window.removeEventListener('mouseup', mouseUpHandler)
})
</script>

<template>
  <div
    ref="cursorWrap"
    class="pointer-events-none fixed top-0 left-0 z-[80] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    style="transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);"
    aria-hidden="true"
  >
    <!-- State 01: Default Micro Dot (•) -->
    <div
      v-if="!isHovering && !isViewingProject"
      class="size-2 rounded-full bg-chalk shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="{ 'scale-50': isPressed, 'scale-100': !isPressed }"
    ></div>

    <!-- State 02: Interactive Link / Button Hover (◯) -->
    <div
      v-else-if="isHovering && !isViewingProject"
      class="flex size-6 items-center justify-center rounded-full border border-signal bg-signal/10 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-[0.5px]"
      :class="{ 'scale-75': isPressed, 'scale-100': !isPressed }"
    >
      <span class="size-1 rounded-full bg-signal"></span>
    </div>

    <!-- State 03: Project Hover Compact Badge [ VIEW ↗ ] -->
    <div
      v-else-if="isViewingProject"
      class="flex items-center gap-1.5 border border-signal/80 bg-[#090a0c]/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-chalk shadow-lg transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-sm"
      :class="{ 'scale-90': isPressed, 'scale-100': !isPressed }"
    >
      <span class="size-1 rounded-full bg-signal animate-pulse"></span>
      <span>VIEW</span>
      <span class="text-signal text-[11px]">↗</span>
    </div>
  </div>
</template>

<style>
/* Hide native cursor ONLY on devices supporting custom cursor */
@media (hover: hover) and (pointer: fine) {
  html.has-custom-cursor,
  html.has-custom-cursor body,
  html.has-custom-cursor a,
  html.has-custom-cursor button,
  html.has-custom-cursor [role="button"] {
    cursor: none !important;
  }

  html.has-custom-cursor input,
  html.has-custom-cursor textarea,
  html.has-custom-cursor select {
    cursor: auto !important;
  }
}
</style>

