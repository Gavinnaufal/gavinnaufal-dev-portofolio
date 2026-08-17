<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref(null)
let animationFrameId = null
let resizeHandler = null
let mouseMoveHandler = null
let mouseLeaveHandler = null
let scrollHandler = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d', { alpha: true })

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)
  let dpr = Math.min(window.devicePixelRatio || 1, 2)

  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)

  // Mouse tracking
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 120,
    isActive: false,
  }

  // Scroll tracking & Section Intensity State Machine
  let lastScrollY = window.scrollY
  let scrollVelocity = 0
  let scrollImpulse = 0
  let currentIntensity = 0.60
  let targetIntensity = 0.60

  const sectionIntensities = {
    home: 0.60,
    about: 0.14,
    skills: 0.10,
    projects: 0.38,
    experience: 0.16,
    education: 0.12,
    contact: 0.08,
  }

  const updateSectionIntensity = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el && el.offsetTop <= scrollPos) {
        targetIntensity = sectionIntensities[sections[i]] || 0.25
        break
      }
    }
  }

  scrollHandler = () => {
    const currentScrollY = window.scrollY
    const delta = currentScrollY - lastScrollY
    scrollVelocity = delta
    scrollImpulse = Math.max(-8, Math.min(8, delta * 0.2))
    lastScrollY = currentScrollY
    updateSectionIntensity()
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })

  mouseMoveHandler = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.isActive = true
  }
  window.addEventListener('mousemove', mouseMoveHandler, { passive: true })

  mouseLeaveHandler = () => {
    mouse.isActive = false
    mouse.x = -9999
    mouse.y = -9999
  }
  window.addEventListener('mouseleave', mouseLeaveHandler, { passive: true })

  // Particle Class Definition (Sparse, Tiny, Low-Opacity, Background-Level)
  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.originX = this.x
      this.originY = this.y
      this.size = Math.random() * 0.9 + 0.7 // 0.7px - 1.6px (Tiny & understated)
      this.vx = (Math.random() - 0.5) * 0.25
      this.vy = (Math.random() - 0.5) * 0.25
      this.density = Math.random() * 12 + 4
      this.isSignal = Math.random() < 0.10 // ~10% sparse signal orange accent
      this.baseAlpha = Math.random() * 0.20 + 0.12 // Low opacity
      this.alpha = this.baseAlpha
    }

    update(globalIntensity) {
      // Natural float drift
      this.x += this.vx * globalIntensity
      this.y += this.vy * globalIntensity

      // Apply subtle scroll kinetic impulse
      if (Math.abs(scrollImpulse) > 0.05) {
        this.y -= scrollImpulse * (this.size * 0.2)
      }

      // Mouse repulsion wave physics (subtle)
      if (mouse.isActive) {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.hypot(dx, dy)

        if (distance < mouse.radius && distance > 0) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouse.radius
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density * 0.35
          const directionY = forceDirectionY * force * this.density * 0.35

          this.x -= directionX
          this.y -= directionY
          this.alpha = Math.min(0.65, (this.baseAlpha + force * 0.25) * globalIntensity)
        } else {
          this.alpha += (this.baseAlpha * globalIntensity - this.alpha) * 0.04
        }
      } else {
        this.alpha += (this.baseAlpha * globalIntensity - this.alpha) * 0.04
      }

      // Wrap around viewport edges smoothly
      if (this.x < -20) this.x = width + 20
      if (this.x > width + 20) this.x = -20
      if (this.y < -20) this.y = height + 20
      if (this.y > height + 20) this.y = -20
    }

    draw() {
      const isDark = document.documentElement.classList.contains('dark')
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      if (this.isSignal) {
        ctx.fillStyle = isDark
          ? `rgba(255, 59, 0, ${this.alpha})`
          : `rgba(255, 59, 0, ${this.alpha * 0.65})`
      } else {
        ctx.fillStyle = isDark
          ? `rgba(244, 244, 240, ${this.alpha})`
          : `rgba(26, 28, 35, ${this.alpha * 0.40})`
      }
      ctx.fill()
    }
  }

  // Generate sparse & restrained Particle Count (26 on Desktop, 14 on Mobile)
  const isMobile = width < 768
  const particleCount = isMobile ? 14 : 26
  const particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Draw understated connection lines (only when visually justified, non-distracting)
  const connectParticles = (globalIntensity) => {
    const isDark = document.documentElement.classList.contains('dark')
    const maxDist = isMobile ? 60 : 75
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x
        const dy = particles[a].y - particles[b].y
        const dist = Math.hypot(dx, dy)

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.045 * globalIntensity
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)

          if (particles[a].isSignal || particles[b].isSignal) {
            ctx.strokeStyle = isDark
              ? `rgba(255, 59, 0, ${lineAlpha * 1.1})`
              : `rgba(255, 59, 0, ${lineAlpha * 0.5})`
          } else {
            ctx.strokeStyle = isDark
              ? `rgba(244, 244, 240, ${lineAlpha})`
              : `rgba(26, 28, 35, ${lineAlpha * 0.35})`
          }
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  // If reduced motion, draw once and return
  if (isReducedMotion) {
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw()
    }
    connectParticles(0.2)
    return
  }

  // 60FPS Render Loop with Silky Gradual Intensity Easing
  const render = () => {
    ctx.clearRect(0, 0, width, height)

    // Silky gradual transition between section intensities
    currentIntensity += (targetIntensity - currentIntensity) * 0.025
    scrollImpulse *= 0.88

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(currentIntensity)
      particles[i].draw()
    }

    // Connect subtle lines
    connectParticles(currentIntensity)

    animationFrameId = requestAnimationFrame(render)
  }

  render()

  // Handle Window Resize
  resizeHandler = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
  }
  window.addEventListener('resize', resizeHandler, { passive: true })
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
  if (mouseLeaveHandler) window.removeEventListener('mouseleave', mouseLeaveHandler)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas transition-colors duration-300"
    aria-hidden="true"
  >
    <!-- Layer 01 (Deep Background): Asymmetric Offset Ambient Depth Field (Swiss Editorial Balance) -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_18%,var(--hairline-strong),transparent_70%)] opacity-30 dark:opacity-40 pointer-events-none"
    ></div>

    <!-- Layer 02 (Deep Texture): Micro Architectural Grid SVG Background -->
    <svg
      class="absolute inset-0 h-full w-full opacity-[0.022] text-chalk"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="micro-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="currentColor"
            stroke-width="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#micro-grid)" />
    </svg>

    <!-- Layer 03 (Texture): Ultra-Fine Non-Distracting Micro Grain to Prevent Flat Surfaces -->
    <svg
      class="absolute inset-0 h-full w-full opacity-[0.020] dark:opacity-[0.016] mix-blend-overlay pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>

    <!-- Layer 04 (Midground): Lightweight HTML5 Kinetic Particle Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full block"></canvas>

    <!-- Layer 05 (Subtle Margin Structural Framing): Quiet Architectural Calibration Ticks -->
    <div
      class="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 ease-out"
      :style="{ opacity: Math.min(1, Math.max(0.35, currentIntensity * 1.2)) }"
    >
      <!-- Structural Framing Corner Bracket (Left Edge Margin) -->
      <div
        class="ornament-item ornament-float-slow absolute top-[52vh] left-[2vw] hidden sm:block"
        style="--float-dur: 26.2s;"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Structural L-Bracket -->
          <path d="M 1 24 L 1 1 L 24 1" stroke="var(--hairline-strong)" stroke-width="1" />
          <circle cx="1" cy="1" r="1.5" fill="var(--chalk)" />
          <text x="6" y="14" class="font-mono text-[6.5px] fill-dim tracking-widest opacity-50">[ 03 // GRID ]</text>
        </svg>
      </div>

      <!-- Vertical Calibrated Technical Ruler Segment (Right Margin) -->
      <div
        class="ornament-item absolute top-[74vh] right-[3vw] hidden md:block"
      >
        <svg width="24" height="70" viewBox="0 0 24 70" fill="none" xmlns="http://www.w3.org/2000/svg" class="ornament-ruler-fade">
          <!-- Main Vertical Hairline -->
          <line x1="20" y1="0" x2="20" y2="64" stroke="var(--hairline-strong)" stroke-width="0.8" />
          <!-- Calibrated Rulers Ticks -->
          <line x1="12" y1="0" x2="20" y2="0" stroke="var(--hairline-strong)" stroke-width="1" />
          <line x1="15" y1="16" x2="20" y2="16" stroke="var(--hairline)" stroke-width="0.8" />
          <line x1="12" y1="32" x2="20" y2="32" stroke="var(--hairline-strong)" stroke-width="1" />
          <line x1="15" y1="48" x2="20" y2="48" stroke="var(--hairline)" stroke-width="0.8" />
          <line x1="12" y1="64" x2="20" y2="64" stroke="var(--hairline-strong)" stroke-width="1" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ornament-float-slow {
  animation: ornament-float-y var(--float-dur, 26.2s) cubic-bezier(0.45, 0, 0.55, 1) infinite;
  will-change: transform;
}

.ornament-ruler-fade {
  animation: ruler-fade 13.8s ease-in-out infinite;
  will-change: opacity;
}

@keyframes ornament-float-y {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-7px) translateX(3px); }
}

@keyframes ruler-fade {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.75; }
}

@media (prefers-reduced-motion: reduce) {
  .ornament-float-slow,
  .ornament-ruler-fade {
    animation: none !important;
    transform: none !important;
  }
}
</style>
