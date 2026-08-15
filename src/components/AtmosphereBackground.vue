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
  let currentIntensity = 0.85
  let targetIntensity = 0.85

  const sectionIntensities = {
    home: 0.85,
    about: 0.35,
    skills: 0.20,
    projects: 0.70,
    education: 0.30,
    contact: 0.18,
  }

  const updateSectionIntensity = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact']
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el && el.offsetTop <= scrollPos) {
        targetIntensity = sectionIntensities[sections[i]] || 0.4
        break
      }
    }
  }

  scrollHandler = () => {
    const currentScrollY = window.scrollY
    const delta = currentScrollY - lastScrollY
    scrollVelocity = delta
    scrollImpulse = Math.max(-12, Math.min(12, delta * 0.3))
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

  // Particle Class Definition
  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.originX = this.x
      this.originY = this.y
      this.size = Math.random() * 1.6 + 1.0 // 1.0px - 2.6px
      this.vx = (Math.random() - 0.5) * 0.35
      this.vy = (Math.random() - 0.5) * 0.35
      this.density = Math.random() * 16 + 6
      this.isSignal = Math.random() < 0.16 // ~16% signal orange accent
      this.baseAlpha = Math.random() * 0.35 + 0.2
      this.alpha = this.baseAlpha
    }

    update(globalIntensity) {
      // Natural float drift
      this.x += this.vx * globalIntensity
      this.y += this.vy * globalIntensity

      // Apply scroll kinetic impulse
      if (Math.abs(scrollImpulse) > 0.05) {
        this.y -= scrollImpulse * (this.size * 0.3)
      }

      // Mouse repulsion wave physics
      if (mouse.isActive) {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.hypot(dx, dy)

        if (distance < mouse.radius && distance > 0) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouse.radius
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density * 0.5
          const directionY = forceDirectionY * force * this.density * 0.5

          this.x -= directionX
          this.y -= directionY
          this.alpha = Math.min(0.85, (this.baseAlpha + force * 0.35) * globalIntensity)
        } else {
          this.alpha += (this.baseAlpha * globalIntensity - this.alpha) * 0.05
        }
      } else {
        this.alpha += (this.baseAlpha * globalIntensity - this.alpha) * 0.05
      }

      // Wrap around viewport edges smoothly
      if (this.x < -20) this.x = width + 20
      if (this.x > width + 20) this.x = -20
      if (this.y < -20) this.y = height + 20
      if (this.y > height + 20) this.y = -20
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      if (this.isSignal) {
        ctx.fillStyle = `rgba(255, 59, 0, ${this.alpha})`
      } else {
        ctx.fillStyle = `rgba(244, 244, 240, ${this.alpha})`
      }
      ctx.fill()
    }
  }

  // Generate restrained Particle Count (48 on Desktop, 22 on Mobile)
  const isMobile = width < 768
  const particleCount = isMobile ? 22 : 48
  const particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Draw constellation connection lines
  const connectParticles = (globalIntensity) => {
    const maxDist = isMobile ? 85 : 110
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x
        const dy = particles[a].y - particles[b].y
        const dist = Math.hypot(dx, dy)

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.11 * globalIntensity
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)

          if (particles[a].isSignal || particles[b].isSignal) {
            ctx.strokeStyle = `rgba(255, 59, 0, ${lineAlpha * 1.2})`
          } else {
            ctx.strokeStyle = `rgba(244, 244, 240, ${lineAlpha})`
          }
          ctx.lineWidth = 0.65
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
    connectParticles(0.4)
    return
  }

  // 60FPS Render Loop
  const render = () => {
    ctx.clearRect(0, 0, width, height)

    // Smooth intensity interpolation
    currentIntensity += (targetIntensity - currentIntensity) * 0.04
    scrollImpulse *= 0.90

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(currentIntensity)
      particles[i].draw()
    }

    // Connect constellation
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
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#090a0c]"
    aria-hidden="true"
  >
    <!-- Micro Architectural Grid SVG Background -->
    <svg
      class="absolute inset-0 h-full w-full opacity-[0.035]"
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
            stroke="#ffffff"
            stroke-width="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#micro-grid)" />
    </svg>

    <!-- Super Interactive HTML5 Particle Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full block"></canvas>
  </div>
</template>
