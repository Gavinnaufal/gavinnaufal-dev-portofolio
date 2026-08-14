<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'

const cursorDot = ref(null)
const cursorRing = ref(null)
const cursorText = ref('')
const isHovering = ref(false)
const isViewing = ref(false)
const isVisible = ref(false)

let mouseMoveHandler = null
let mouseLeaveHandler = null
let mouseEnterHandler = null
let clickHandler = null

onMounted(() => {
  // Only enable on pointer-capable non-touch devices
  if (!window.matchMedia('(pointer: fine)').matches) return

  const dot = cursorDot.value
  const ring = cursorRing.value
  if (!dot || !ring) return

  // High performance GSAP quickTo setters
  const setDotX = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' })
  const setDotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' })
  const setRingX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power2.out' })
  const setRingY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power2.out' })

  mouseMoveHandler = (e) => {
    isVisible.value = true
    const { clientX, clientY, target } = e

    setDotX(clientX)
    setDotY(clientY)
    setRingX(clientX)
    setRingY(clientY)

    // Check hovered elements for context-aware cursor
    const interactiveTarget = target.closest('a, button, [data-magnetic], [data-cursor], .project-row')
    if (interactiveTarget) {
      const cursorMode = interactiveTarget.getAttribute('data-cursor')
      if (cursorMode === 'view' || interactiveTarget.classList.contains('project-row')) {
        isViewing.value = true
        isHovering.value = false
        cursorText.value = 'VIEW ↗'
      } else {
        isHovering.value = true
        isViewing.value = false
        cursorText.value = ''
      }
    } else {
      isHovering.value = false
      isViewing.value = false
      cursorText.value = ''
    }
  }

  mouseLeaveHandler = () => {
    isVisible.value = false
  }

  mouseEnterHandler = () => {
    isVisible.value = true
  }

  clickHandler = () => {
    if (ring) {
      gsap.fromTo(ring, { scale: 0.75 }, { scale: 1, duration: 0.25, ease: 'power2.out' })
    }
  }

  window.addEventListener('mousemove', mouseMoveHandler, { passive: true })
  window.addEventListener('mouseleave', mouseLeaveHandler, { passive: true })
  window.addEventListener('mouseenter', mouseEnterHandler, { passive: true })
  window.addEventListener('mousedown', clickHandler, { passive: true })
})

onBeforeUnmount(() => {
  if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
  if (mouseLeaveHandler) window.removeEventListener('mouseleave', mouseLeaveHandler)
  if (mouseEnterHandler) window.removeEventListener('mouseenter', mouseEnterHandler)
  if (clickHandler) window.removeEventListener('mousedown', clickHandler)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-[999] overflow-hidden hidden md:block"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    aria-hidden="true"
  >
    <!-- Micro Center Dot -->
    <div
      ref="cursorDot"
      class="fixed -top-1 -left-1 size-2 rounded-full bg-signal transition-opacity duration-200 will-change-transform"
      :class="{ 'opacity-0 scale-0': isViewing || isHovering, 'opacity-100 scale-100': !isViewing && !isHovering }"
    ></div>

    <!-- Smooth Follower Ring / Pill -->
    <div
      ref="cursorRing"
      class="fixed -top-4 -left-4 flex items-center justify-center rounded-full transition-all duration-300 ease-out will-change-transform"
      :class="[
        isViewing
          ? 'size-20 -top-10 -left-10 bg-signal text-white font-mono text-[10px] font-bold shadow-xl scale-100'
          : isHovering
            ? 'size-12 -top-6 -left-6 border-2 border-signal bg-signal/15 backdrop-blur-[1px] scale-100'
            : 'size-8 border border-white/40 bg-transparent scale-100',
      ]"
    >
      <span v-if="isViewing" class="tracking-wider uppercase animate-pulse">
        {{ cursorText }}
      </span>
    </div>
  </div>
</template>
