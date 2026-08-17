<script setup>
// Contact Chapter: Signal / Final Resting State
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Large Architectural Full-Width Horizon & Meridian Crosshair Lines -->
    <div class="absolute inset-0 flex items-center justify-center opacity-35 dark:opacity-45">
      <div class="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-hairline-strong to-transparent"></div>
      <div class="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-hairline-strong to-transparent"></div>
    </div>

    <!-- Massive Central Signal Radar Array (Spans 40% of Section - Right Column Background) -->
    <div class="contact-signal-array absolute top-1/2 right-[8%] sm:right-[15%] -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] opacity-75 dark:opacity-85 pointer-events-none">
      <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Static Precision Concentric Blueprint Rings -->
        <circle cx="210" cy="210" r="180" stroke="var(--hairline)" stroke-width="0.8" stroke-dasharray="4 6" />
        <circle cx="210" cy="210" r="120" stroke="var(--hairline-strong)" stroke-width="1" />
        <circle cx="210" cy="210" r="60" stroke="var(--hairline)" stroke-width="0.8" />
        
        <!-- Cardinal Reference Crosshair -->
        <line x1="210" y1="190" x2="210" y2="230" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <line x1="190" y1="210" x2="230" y2="210" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <circle cx="210" cy="210" r="4" fill="var(--signal)" />

        <!-- Gentle Expanding Signal Ripple Pulse (6.8s Cycle) -->
        <circle cx="210" cy="210" r="60" stroke="var(--signal)" stroke-width="1" class="contact-pulse-ring-1" />
        <circle cx="210" cy="210" r="120" stroke="var(--signal)" stroke-width="0.8" class="contact-pulse-ring-2" />

        <!-- Technical Terminal Readout -->
        <text x="210" y="245" text-anchor="middle" class="font-mono text-[8px] fill-dim tracking-[0.25em] opacity-80">
          SYS // TERMINAL.06 [ RESTING ]
        </text>
      </svg>
    </div>

    <!-- Terminal Status Tag in Bottom Margin -->
    <div class="absolute bottom-6 left-8 font-mono text-[9px] text-dim tracking-widest opacity-50 hidden sm:block">
      <span>[ 06 // TERMINAL STATE ]</span>
      <span class="ml-4 text-signal">PULSE // 0.15Hz</span>
    </div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Resting State Signal Dynamics */
.contact-pulse-ring-1 {
  animation: pulse-signal-expand 6.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  transform-origin: 210px 210px;
  will-change: transform, opacity;
}

.contact-pulse-ring-2 {
  animation: pulse-signal-expand 6.8s cubic-bezier(0.16, 1, 0.3, 1) infinite 1.8s;
  transform-origin: 210px 210px;
  will-change: transform, opacity;
}

@keyframes pulse-signal-expand {
  0% { transform: scale(0.6); opacity: 0.8; }
  65%, 100% { transform: scale(1.4); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .contact-pulse-ring-1,
  .contact-pulse-ring-2 {
    animation: none !important;
    transform: none !important;
  }
}
</style>
