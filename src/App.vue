<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader.vue'
import AtmosphereBackground from './components/AtmosphereBackground.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
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

const onPreloaderComplete = () => {
  isPreloaderActive.value = false
  if (lenis) {
    lenis.start()
  }

  // Cinematic Hero Reveal Sequence after preloader curtain opens
  gsap.fromTo(
    '#home [data-reveal-item]',
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      clearProps: 'transform',
      onComplete: () => {
        ScrollTrigger.refresh()
      },
    }
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
  // 1. Initialize Lenis with enhanced kinetic inertia configuration
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
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

  // 3. GSAP Animations Context
  gsapCtx = gsap.context(() => {
    // Section Heading reveals (with clearProps so layout is 100% natural after reveal)
    gsap.utils.toArray('[data-reveal-heading]').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
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

    // Content Item Staggered entrance
    gsap.utils.toArray('main section:not(#home) [data-reveal-item]').forEach((el) => {
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
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Magnetic pull on interactive action buttons
    const magneticEls = document.querySelectorAll('.btn-editorial-primary, .btn-editorial-secondary, [data-magnetic]')
    magneticEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(el, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        })
      })
    })
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
  if (gsapCtx) gsapCtx.revert()
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
})
</script>

<template>
  <div class="relative min-h-screen bg-[#090a0c] font-sans text-chalk selection:bg-signal selection:text-white">
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
      class="fixed bottom-6 right-6 z-40 border border-hairline-strong bg-surface-elevated px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-chalk shadow-2xl transition-colors hover:border-signal hover:bg-signal hover:text-white focus:outline-none"
      :class="showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'"
      @click="scrollToTop"
    >
      <span>TOP ↑</span>
    </button>
  </div>
</template>
