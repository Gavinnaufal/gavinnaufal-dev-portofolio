<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['complete'])

const isFinished = ref(false)
const counter = ref(0)
const preloaderEl = ref(null)
const curtainTop = ref(null)
const curtainBottom = ref(null)
const contentEl = ref(null)
const statusText = ref('INITIALIZING SYSTEMS')

onMounted(() => {
  const tl = gsap.timeline({
    onComplete: () => {
      isFinished.value = true
      emit('complete')
    },
  })

  // 1. Counter ticker animation
  const counterObj = { val: 0 }
  tl.to(counterObj, {
    val: 100,
    duration: 1.3,
    ease: 'power2.inOut',
    onUpdate: () => {
      counter.value = Math.floor(counterObj.val)
      if (counter.value > 30 && counter.value < 70) {
        statusText.value = 'LOADING REPOSITORIES'
      } else if (counter.value >= 70) {
        statusText.value = 'READY // SYSTEM ONLINE'
      }
    },
  })

  // 2. Fade out text content
  tl.to(contentEl.value, {
    opacity: 0,
    y: -20,
    duration: 0.35,
    ease: 'power3.in',
  })

  // 3. Cinematic Curtain Split opening
  tl.to(
    curtainTop.value,
    {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
    },
    '-=0.1'
  )
  tl.to(
    curtainBottom.value,
    {
      yPercent: 100,
      duration: 0.85,
      ease: 'power4.inOut',
    },
    '<'
  )
})
</script>

<template>
  <div
    v-if="!isFinished"
    ref="preloaderEl"
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
  >
    <!-- Top Curtain -->
    <div
      ref="curtainTop"
      class="absolute top-0 inset-x-0 h-1/2 bg-[#090a0c] border-b border-white/10"
    ></div>

    <!-- Bottom Curtain -->
    <div
      ref="curtainBottom"
      class="absolute bottom-0 inset-x-0 h-1/2 bg-[#090a0c] border-t border-white/10"
    ></div>

    <!-- Central Minimalist Counter & Index Content -->
    <div
      ref="contentEl"
      class="relative z-20 flex flex-col items-center gap-6 font-mono text-xs uppercase"
    >
      <!-- Signal Indicator -->
      <div class="flex items-center gap-3 tracking-[0.25em] text-silver">
        <span class="size-2 rounded-full bg-signal animate-pulse"></span>
        <span>GAVIN NAUFAL // ARCHIVE 2026</span>
      </div>

      <!-- Large Monospace Counter -->
      <div class="font-display text-7xl font-extrabold tracking-tighter text-chalk sm:text-8xl">
        <span>{{ String(counter).padStart(2, '0') }}</span>
        <span class="text-signal text-4xl sm:text-5xl">%</span>
      </div>

      <!-- Live Loading Status Bar -->
      <div class="flex items-center gap-4 text-dim">
        <div class="h-[1px] w-12 bg-white/20"></div>
        <span class="tracking-widest text-[11px] text-chalk font-semibold">{{ statusText }}</span>
        <div class="h-[1px] w-12 bg-white/20"></div>
      </div>
    </div>
  </div>
</template>
