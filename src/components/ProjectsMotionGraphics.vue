<script setup>
// Projects Chapter: Media Framing System
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Massive Section Framing Corner Brackets (96px Double Lines) -->
    <!-- Top-Left Framing Construct -->
    <div class="projects-frame-top-left absolute top-6 left-4 sm:left-8 w-24 h-24 opacity-60 dark:opacity-75">
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <path d="M 0 48 L 0 0 L 48 0" stroke="var(--hairline-strong)" stroke-width="1.5" />
        <path d="M 6 48 L 6 6 L 48 6" stroke="var(--hairline)" stroke-width="0.8" stroke-dasharray="2 4" />
        <circle cx="0" cy="0" r="2.5" fill="var(--signal)" />
        <text x="12" y="24" class="font-mono text-[8px] fill-dim tracking-widest opacity-80">[ 03 // FRAME.L ]</text>
      </svg>
    </div>

    <!-- Top-Right Framing Construct -->
    <div class="projects-frame-top-right absolute top-6 right-4 sm:right-8 w-24 h-24 opacity-60 dark:opacity-75">
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <path d="M 96 48 L 96 0 L 48 0" stroke="var(--hairline-strong)" stroke-width="1.5" />
        <path d="M 90 48 L 90 6 L 48 6" stroke="var(--hairline)" stroke-width="0.8" stroke-dasharray="2 4" />
        <circle cx="96" cy="0" r="2.5" fill="var(--signal)" />
        <text x="84" y="24" text-anchor="end" class="font-mono text-[8px] fill-dim tracking-widest opacity-80">[ 03 // FRAME.R ]</text>
      </svg>
    </div>

    <!-- Left & Right Lateral Metric Margin Rulers (Traveling Highlight Indicator) -->
    <div class="absolute inset-y-12 left-2 sm:left-4 w-6 opacity-40 dark:opacity-50 hidden md:block">
      <svg width="24" height="100%" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
        <line x1="12" y1="0" x2="12" y2="100%" stroke="var(--hairline-strong)" stroke-width="1" />
        <!-- Calibrated Metric Ticks -->
        <line x1="4" y1="100" x2="12" y2="100" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <line x1="4" y1="300" x2="12" y2="300" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <line x1="4" y1="500" x2="12" y2="500" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <line x1="4" y1="700" x2="12" y2="700" stroke="var(--hairline-strong)" stroke-width="1.2" />
        
        <!-- Traveling Metric Cursor (6.4s Cycle) -->
        <g class="projects-ruler-cursor">
          <circle cx="12" cy="0" r="3" fill="var(--signal)" />
          <line x1="0" y1="0" x2="24" y2="0" stroke="var(--signal)" stroke-width="1.2" />
        </g>
      </svg>
    </div>

    <!-- Large Background Framing Grid Construction (Spans 30% of area) -->
    <div class="absolute inset-x-8 bottom-12 h-40 opacity-[0.06] dark:opacity-[0.08] hidden lg:block">
      <svg viewBox="0 0 1000 160" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <rect x="0" y="0" width="1000" height="160" stroke="var(--chalk)" stroke-width="1" stroke-dasharray="8 8" />
        <line x1="333" y1="0" x2="333" y2="160" stroke="var(--chalk)" stroke-width="1" />
        <line x1="666" y1="0" x2="666" y2="160" stroke="var(--chalk)" stroke-width="1" />
        <circle cx="333" cy="80" r="4" fill="var(--signal)" />
        <circle cx="666" cy="80" r="4" fill="var(--signal)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Margin Framing Dynamics */
.projects-ruler-cursor {
  animation: ruler-travel 6.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  will-change: transform;
}

.projects-frame-top-left {
  animation: frame-shift-tl 12.8s ease-in-out infinite;
  will-change: transform;
}

.projects-frame-top-right {
  animation: frame-shift-tr 12.8s ease-in-out infinite;
  will-change: transform;
}

@keyframes ruler-travel {
  0% { transform: translateY(80px); }
  50% { transform: translateY(680px); }
  100% { transform: translateY(80px); }
}

@keyframes frame-shift-tl {
  0%, 100% { transform: translate(0px, 0px); }
  50% { transform: translate(-4px, -4px); }
}

@keyframes frame-shift-tr {
  0%, 100% { transform: translate(0px, 0px); }
  50% { transform: translate(4px, -4px); }
}

@media (prefers-reduced-motion: reduce) {
  .projects-ruler-cursor,
  .projects-frame-top-left,
  .projects-frame-top-right {
    animation: none !important;
    transform: none !important;
  }
}
</style>
