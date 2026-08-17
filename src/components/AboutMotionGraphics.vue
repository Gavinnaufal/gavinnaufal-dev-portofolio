<script setup>
// About Chapter: Editorial Typographic Field
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Background Large Typographic Watermark Drift (22.4s Cycle) -->
    <div class="about-watermark-wrap absolute top-[10%] -left-12 sm:left-4 md:left-12 w-[180%] sm:w-[140%] opacity-[0.065] dark:opacity-[0.085]">
      <svg viewBox="0 0 1200 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <!-- Giant Outlined Architectural Typography -->
        <text
          x="0"
          y="180"
          class="font-display text-[160px] sm:text-[200px] font-black uppercase tracking-tighter fill-none"
          stroke="var(--chalk)"
          stroke-width="1.8"
        >
          PROFILE // ARCHIVE
        </text>
      </svg>
    </div>

    <!-- Secondary Counter-Drifting Editorial Text Line (18.6s Cycle) -->
    <div class="about-watermark-sub absolute bottom-[8%] -right-16 sm:right-4 w-[160%] sm:w-[120%] opacity-[0.045] dark:opacity-[0.065]">
      <svg viewBox="0 0 1000 160" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <text
          x="1000"
          y="120"
          text-anchor="end"
          class="font-mono text-[90px] sm:text-[110px] font-extrabold uppercase tracking-tight fill-none"
          stroke="var(--chalk)"
          stroke-width="1.4"
        >
          ENGINEERING // PHILOSOPHY
        </text>
      </svg>
    </div>

    <!-- Editorial Margin Alignment Rules & Registration Ticks -->
    <div class="absolute inset-0 flex justify-between px-4 sm:px-8 opacity-40 dark:opacity-50">
      <!-- Left Column Datum Line -->
      <div class="relative h-full w-[1px] bg-gradient-to-b from-transparent via-hairline-strong to-transparent">
        <div class="about-tick-left absolute top-[30%] -left-1.5 size-3 font-mono text-[8px] text-signal font-bold">+</div>
        <div class="about-tick-left absolute top-[70%] -left-1.5 size-3 font-mono text-[8px] text-dim font-bold">+</div>
      </div>
      <!-- Right Column Datum Line -->
      <div class="relative h-full w-[1px] bg-gradient-to-b from-transparent via-hairline-strong to-transparent hidden md:block">
        <div class="about-tick-right absolute top-[45%] -right-1.5 size-3 font-mono text-[8px] text-signal font-bold">+</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Typographic Kinetic Drift */
.about-watermark-wrap {
  animation: about-drift-x 22.4s ease-in-out infinite;
  will-change: transform;
}

.about-watermark-sub {
  animation: about-drift-x-reverse 18.6s ease-in-out infinite;
  will-change: transform;
}

@keyframes about-drift-x {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(-40px); }
}

@keyframes about-drift-x-reverse {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(35px); }
}

@media (prefers-reduced-motion: reduce) {
  .about-watermark-wrap,
  .about-watermark-sub {
    animation: none !important;
    transform: none !important;
  }
}
</style>
