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
const statusText = ref('SYSTEM INITIALIZING')

onMounted(() => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isReducedMotion) {
    isFinished.value = true
    emit('complete')
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isFinished.value = true
      emit('complete')
    },
  })

  // 1. Initial content entrance (crisp, immediate)
  tl.fromTo(
    contentEl.value,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
  )

  // 2. Counter ticker animation (1.05s natural acceleration-deceleration curve)
  const counterObj = { val: 0 }
  tl.to(
    counterObj,
    {
      val: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.value = Math.floor(counterObj.val)
        if (counter.value < 45) {
          statusText.value = 'SYSTEM INITIALIZING'
        } else if (counter.value >= 45 && counter.value < 85) {
          statusText.value = 'LOADING ARCHIVE'
        } else {
          statusText.value = 'SYSTEM ONLINE'
        }
      },
    },
    '-=0.1'
  )

  // 3. Decisive confirmation hold (100ms) followed by text fade out
  tl.to(contentEl.value, {
    opacity: 0,
    y: -12,
    duration: 0.28,
    ease: 'power3.in',
  }, '+=0.1')

  // 4. Cinematic Heavy Curtain Split (0.8s, power4.inOut)
  tl.to(
    curtainTop.value,
    {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    },
    '-=0.06'
  )
  tl.to(
    curtainBottom.value,
    {
      yPercent: 100,
      duration: 0.8,
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
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-auto bg-[#090a0c]"
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
