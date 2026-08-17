<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const rootRef = ref(null)
const mouseOffsetX = ref(0)
const mouseOffsetY = ref(0)
let mouseMoveHandler = null

onMounted(() => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isFinePointer = window.matchMedia('(pointer: fine)').matches

  if (isFinePointer && !isReducedMotion) {
    mouseMoveHandler = (e) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      // Subtle localized parallax (max ±8px displacement)
      mouseOffsetX.value = ((e.clientX - centerX) / centerX) * 8
      mouseOffsetY.value = ((e.clientY - centerY) / centerY) * 8
    }
    window.addEventListener('mousemove', mouseMoveHandler, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (mouseMoveHandler) {
    window.removeEventListener('mousemove', mouseMoveHandler)
  }
})
</script>

<template>
  <div
    ref="rootRef"
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
    :style="{
      transform: `translate3d(${mouseOffsetX}px, ${mouseOffsetY}px, 0)`,
      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    }"
  >
    <!-- ACTOR 01: Large Architectural Orbit (SYS // ORB.380) -->
    <!-- Positioned in the upper-right quadrant spanning behind portrait & top negative space -->
    <div class="actor-orbit absolute -top-12 -right-8 sm:-top-16 sm:right-4 md:right-12 lg:right-16 w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] opacity-85 dark:opacity-90">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Outer Segmented Calibrated Orbit Ring -->
        <g class="orbit-rotate-slow">
          <circle
            cx="200"
            cy="200"
            r="175"
            stroke="var(--hairline-strong)"
            stroke-width="1.2"
            stroke-dasharray="14 18 160 18 24 18 80 18"
          />
          <!-- 4 Cardinal Datum Ticks -->
          <line x1="200" y1="18" x2="200" y2="32" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <line x1="200" y1="368" x2="200" y2="382" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <line x1="18" y1="200" x2="32" y2="200" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <line x1="368" y1="200" x2="382" y2="200" stroke="var(--hairline-strong)" stroke-width="1.5" />
        </g>

        <!-- Inner Concentric Technical Reference Arc -->
        <g class="orbit-rotate-reverse">
          <circle
            cx="200"
            cy="200"
            r="135"
            stroke="var(--hairline)"
            stroke-width="0.9"
            stroke-dasharray="6 10"
          />
          <!-- Minor Angular Measurement Ticks -->
          <line x1="200" y1="60" x2="200" y2="70" stroke="var(--hairline)" stroke-width="1" />
          <line x1="200" y1="330" x2="200" y2="340" stroke="var(--hairline)" stroke-width="1" />
          <line x1="60" y1="200" x2="70" y2="200" stroke="var(--hairline)" stroke-width="1" />
          <line x1="330" y1="200" x2="340" y2="200" stroke="var(--hairline)" stroke-width="1" />
        </g>

        <!-- Center Structural Crosshair -->
        <line x1="200" y1="180" x2="200" y2="220" stroke="var(--hairline-strong)" stroke-width="1" />
        <line x1="180" y1="200" x2="220" y2="200" stroke="var(--hairline-strong)" stroke-width="1" />
        <circle cx="200" cy="200" r="2.5" fill="var(--chalk)" />

        <!-- Continuous Orbiting Satellite Indicator (14.2s Full Orbit) -->
        <g class="orbit-satellite-carrier">
          <circle cx="200" cy="25" r="3" fill="var(--chalk)" />
          <circle cx="200" cy="25" r="6" stroke="var(--signal)" stroke-width="1" opacity="0.85" />
          <line x1="200" y1="18" x2="200" y2="32" stroke="var(--signal)" stroke-width="1" />
        </g>

        <!-- Technical Readout Tag -->
        <text x="200" y="245" text-anchor="middle" class="font-mono text-[9px] fill-dim tracking-[0.25em] opacity-70">
          SYS // ORB.380
        </text>
      </svg>
    </div>

    <!-- ACTOR 02: Large Geometric Diamond Construction (GEO // DIA.120) -->
    <!-- Anchors lower-right negative space below 3D portrait card -->
    <div class="actor-diamond absolute bottom-[6%] right-[6%] sm:right-[12%] lg:right-[15%] w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] opacity-80 dark:opacity-85 hidden md:block">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Floating + Rotating Outer Diamond Frame (8.8s Cycle) -->
        <g class="diamond-frame-group">
          <!-- Outer 80px Diamond Frame -->
          <rect
            x="20"
            y="20"
            width="80"
            height="80"
            transform="rotate(45 60 60)"
            fill="none"
            stroke="var(--hairline-strong)"
            stroke-width="1.4"
          />
          <!-- 4 Corner Precision Brackets -->
          <circle cx="60" cy="3" r="1.8" fill="var(--chalk)" />
          <circle cx="60" cy="117" r="1.8" fill="var(--chalk)" />
          <circle cx="3" cy="60" r="1.8" fill="var(--chalk)" />
          <circle cx="117" cy="60" r="1.8" fill="var(--chalk)" />

          <!-- Nested Inner Counter-Rotating Square -->
          <rect
            x="42"
            y="42"
            width="36"
            height="36"
            fill="none"
            stroke="var(--hairline)"
            stroke-width="1"
            class="diamond-inner-spin"
          />
        </g>

        <!-- Center Structural Crosshair & Focal Core -->
        <line x1="60" y1="48" x2="60" y2="72" stroke="var(--hairline-strong)" stroke-width="1" />
        <line x1="48" y1="60" x2="72" y2="60" stroke="var(--hairline-strong)" stroke-width="1" />
        <circle cx="60" cy="60" r="2.5" fill="var(--signal)" />
      </svg>
    </div>

    <!-- ACTOR 03: Prominent Signal Orange Focal Node (NODE // SIG.01) -->
    <!-- Positioned near center-right intersection without blocking text -->
    <div class="actor-signal absolute top-[18%] left-[58%] sm:left-[54%] lg:left-[52%] w-[50px] h-[50px] opacity-90 hidden lg:block">
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Floating Motion Container (4.4s Cycle) -->
        <g class="signal-drift-group">
          <!-- Structural Precision Crosshair -->
          <line x1="25" y1="6" x2="25" y2="44" stroke="var(--hairline-strong)" stroke-width="1" />
          <line x1="6" y1="25" x2="44" y2="25" stroke="var(--hairline-strong)" stroke-width="1" />
          
          <!-- Concentric Expanding Pulse Rings -->
          <circle cx="25" cy="25" r="12" stroke="var(--signal)" stroke-width="0.8" class="signal-ring-pulse" />
          <circle cx="25" cy="25" r="6" stroke="var(--signal)" stroke-width="0.8" opacity="0.6" />
          
          <!-- Core Active Signal Orange Indicator -->
          <circle cx="25" cy="25" r="3.2" fill="var(--signal)" class="signal-core-breathe" />
        </g>
      </svg>
    </div>

    <!-- ACTOR 04: Secondary Spatial Arc (ARC // RAD.240) -->
    <!-- Positioned in bottom-left margin below CTA buttons -->
    <div class="actor-arc absolute -bottom-10 -left-10 sm:-bottom-12 sm:left-2 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] opacity-65 dark:opacity-70 hidden sm:block">
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full arc-drift-slow">
        <!-- Sweeping Architectural Quarter-Circle Arc (r=190) -->
        <path
          d="M 190 240 A 190 190 0 0 0 0 50"
          stroke="var(--hairline-strong)"
          stroke-width="1.2"
          stroke-dasharray="6 8 80 8 16 8"
        />
        <!-- Secondary Concentric Arc -->
        <path
          d="M 150 240 A 150 150 0 0 0 0 90"
          stroke="var(--hairline)"
          stroke-width="0.8"
          stroke-dasharray="4 6"
        />
        <!-- Radial Measurement Ticks -->
        <line x1="190" y1="240" x2="175" y2="240" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <line x1="134" y1="105" x2="124" y2="97" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <line x1="0" y1="50" x2="0" y2="65" stroke="var(--hairline-strong)" stroke-width="1.2" />
        
        <!-- Arc Indicator Dot -->
        <circle cx="134" cy="105" r="2" fill="var(--chalk)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Hardware Off-Thread Keyframe Animations */

/* 1. Large Orbit Continuous Rotation (14.2s) & Reverse Compass (24.6s) */
.orbit-rotate-slow {
  transform-origin: 200px 200px;
  animation: orbit-spin 38.4s linear infinite;
  will-change: transform;
}

.orbit-rotate-reverse {
  transform-origin: 200px 200px;
  animation: orbit-spin 24.6s linear infinite reverse;
  will-change: transform;
}

.orbit-satellite-carrier {
  transform-origin: 200px 200px;
  animation: orbit-spin 14.2s linear infinite;
  will-change: transform;
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 2. Large Geometric Diamond Rotation & Floating (8.8s Cycle) */
.diamond-frame-group {
  transform-origin: 60px 60px;
  animation: diamond-float 8.8s ease-in-out infinite, diamond-stepped-rotate 17.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  will-change: transform;
}

.diamond-inner-spin {
  transform-origin: 60px 60px;
  animation: orbit-spin 12.4s linear infinite reverse;
  will-change: transform;
}

@keyframes diamond-float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-16px) translateX(6px); }
}

@keyframes diamond-stepped-rotate {
  0% { transform: rotate(0deg); }
  40%, 50% { transform: rotate(90deg); }
  90%, 100% { transform: rotate(180deg); }
}

/* 3. Prominent Signal Orange Node Pulse & Drift (4.4s Cycle) */
.signal-drift-group {
  animation: signal-drift 4.4s ease-in-out infinite;
  will-change: transform;
}

.signal-core-breathe {
  animation: signal-breathe 4.4s ease-in-out infinite;
  transform-origin: 25px 25px;
  will-change: transform, opacity;
}

.signal-ring-pulse {
  animation: signal-ring-expand 4.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  transform-origin: 25px 25px;
  will-change: transform, opacity;
}

@keyframes signal-drift {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-10px) translateX(6px); }
}

@keyframes signal-breathe {
  0%, 100% { transform: scale(0.85); opacity: 0.55; }
  50% { transform: scale(1.25); opacity: 1; }
}

@keyframes signal-ring-expand {
  0% { transform: scale(0.6); opacity: 0.8; }
  60%, 100% { transform: scale(1.6); opacity: 0; }
}

/* 4. Secondary Spatial Arc Sway (16.8s Cycle) */
.arc-drift-slow {
  transform-origin: bottom left;
  animation: arc-sway 16.8s ease-in-out infinite;
  will-change: transform;
}

@keyframes arc-sway {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.04) rotate(-3deg); }
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  .orbit-rotate-slow,
  .orbit-rotate-reverse,
  .orbit-satellite-carrier,
  .diamond-frame-group,
  .diamond-inner-spin,
  .signal-drift-group,
  .signal-core-breathe,
  .signal-ring-pulse,
  .arc-drift-slow {
    animation: none !important;
    transform: none !important;
  }
}
</style>
