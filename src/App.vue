<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader.vue'
import CustomCursor from './components/CustomCursor.vue'
import AtmosphereBackground from './components/AtmosphereBackground.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Experience from './components/Experience.vue'
import Education from './components/Education.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let gsapCtx = null
let tickerCallback = null
const isPreloaderActive = ref(true)
const scrollProgress = ref(0)
const showScrollTop = ref(false)
const magneticHandlers = []

const onPreloaderComplete = () => {
  isPreloaderActive.value = false
  if (lenis) {
    lenis.start()
  }

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isReducedMotion) {
    gsap.set('#home [data-hero-meta], #home [data-hero-name], #home [data-hero-headline], #home [data-hero-statement], #home [data-hero-cta], #home [data-hero-portrait]', {
      opacity: 1,
      y: 0,
      clearProps: 'all',
    })
    ScrollTrigger.refresh()
    return
  }

  // Choreographed Sequential Hero Reveal (Exact Hierarchy: Meta -> Name -> Headline -> Statement -> Portrait -> CTA)
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      ScrollTrigger.refresh()
    },
  })

  tl.fromTo(
    '#home [data-hero-meta]',
    { y: 12, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' }
  )
    .fromTo(
      '#home [data-hero-name]',
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, clearProps: 'transform' },
      '-=0.42'
    )
    .fromTo(
      '#home [data-hero-headline]',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: 'transform' },
      '-=0.48'
    )
    .fromTo(
      '#home [data-hero-statement]',
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, clearProps: 'transform' },
      '-=0.48'
    )
    .fromTo(
      '#home [data-hero-portrait]',
      { y: 16, opacity: 0, scale: 0.99 },
      { y: 0, opacity: 1, scale: 1.0, duration: 0.8, clearProps: 'transform' },
      '-=0.55'
    )
    .fromTo(
      '#home [data-hero-cta]',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform' },
      '-=0.45'
    )
}

const scrollToTop = () => {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  // 1. Initialize Lenis with Heavy Physical Kinetic Mass & Accessibility Compliance
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  lenis = new Lenis({
    duration: isReducedMotion ? 0.01 : (isTouchDevice ? 0.65 : 1.35), // Weighted mass on desktop, responsive touch on mobile
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential deceleration
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !isReducedMotion,
    wheelMultiplier: 0.82, // Tactile mechanical resistance giving solid physical weight
    touchMultiplier: 1.5,  // Direct responsive touch
    infinite: false,
  })

  // Freeze scroll while preloader is active
  if (isPreloaderActive.value) {
    lenis.stop()
  }

  // 2. Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', (e) => {
    ScrollTrigger.update()
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll > 0) {
      scrollProgress.value = (e.scroll / maxScroll) * 100
    }
    showScrollTop.value = e.scroll > 500
  })

  tickerCallback = (time) => {
    if (lenis) {
      lenis.raf(time * 1000)
    }
  }

  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  // 3. GSAP Animations Context (Content Animation Ownership)
  gsapCtx = gsap.context(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isReducedMotion) {
      // Section Heading reveals (clearProps preserves clean natural layout)
      gsap.utils.toArray('[data-reveal-heading]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Content Item Staggered entrance
      gsap.utils.toArray('main section:not(#home) [data-reveal-item]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Magnetic Button interactions on Desktop
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (isFinePointer) {
        document.querySelectorAll('[data-magnetic]').forEach((el) => {
          const onMouseMove = (e) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            gsap.to(el, {
              x: x * 0.18,
              y: y * 0.18,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          const onMouseLeave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.4)',
            })
          }

          el.addEventListener('mousemove', onMouseMove)
          el.addEventListener('mouseleave', onMouseLeave)
          magneticHandlers.push({ el, onMouseMove, onMouseLeave })
        })
      }
    }
  })

  // Recalculate ScrollTrigger positions after Vue DOM render and window load
  nextTick(() => {
    ScrollTrigger.refresh()
  })

  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
  }
  magneticHandlers.forEach(({ el, onMouseMove, onMouseLeave }) => {
    el.removeEventListener('mousemove', onMouseMove)
    el.removeEventListener('mouseleave', onMouseLeave)
  })
  if (gsapCtx) gsapCtx.revert()
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
})
</script>

<template>
  <div class="relative min-h-screen bg-[#090a0c] font-sans text-chalk selection:bg-signal selection:text-white">
    <!-- Subtle Technical Custom Cursor (Pointer-fine devices only) -->
    <CustomCursor />

    <!-- Cinematic Page Preloader -->
    <Preloader @complete="onPreloaderComplete" />

    <!-- Living Atmospheric Particle Canvas Background -->
    <AtmosphereBackground />

    <!-- Top Reading Progress Line (Fluid & Reactive) -->
    <div
      class="fixed top-0 left-0 z-[60] h-[2px] bg-signal transition-all duration-75 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    ></div>

    <!-- Header Navigation with Sound Toggle -->
    <Navbar :lenis="lenis" />

    <!-- Main Sections -->
    <main class="relative z-10 w-full overflow-hidden">
      <Hero :lenis="lenis" />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </main>

    <!-- Footer -->
    <Footer :lenis="lenis" />

    <!-- Floating Back to Top Button with Magnetic Feel -->
    <button
      type="button"
      data-magnetic
      aria-label="Scroll back to top"
      class="fixed bottom-6 right-6 z-40 border border-hairline-strong bg-surface-elevated px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-chalk shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-signal hover:bg-signal hover:text-white focus-visible:ring-2 focus-visible:ring-signal focus:outline-none"
      :class="showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'"
      @click="scrollToTop"
    >
      <span>TOP ↑</span>
    </button>
  </div>
</template>
