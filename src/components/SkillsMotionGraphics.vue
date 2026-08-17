<script setup>
// Skills Chapter: Technical Blueprint Field
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Giant Technical Blueprint Drafting Axes & Gridlines (Spans 40% of section) -->
    <div class="absolute inset-0 opacity-[0.07] dark:opacity-[0.09]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-dense-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <!-- Calibrated Drafting Box -->
            <rect width="120" height="120" fill="none" stroke="var(--chalk)" stroke-width="0.7" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="var(--hairline)" stroke-width="0.5" stroke-dasharray="2 4" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="var(--hairline)" stroke-width="0.5" stroke-dasharray="2 4" />
            <!-- Corner Precision Tick Marks -->
            <line x1="0" y1="0" x2="8" y2="8" stroke="var(--chalk)" stroke-width="0.8" />
            <line x1="120" y1="0" x2="112" y2="8" stroke="var(--chalk)" stroke-width="0.8" />
            <line x1="0" y1="120" x2="8" y2="112" stroke="var(--chalk)" stroke-width="0.8" />
            <line x1="120" y1="120" x2="112" y2="112" stroke="var(--chalk)" stroke-width="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-dense-grid)" />
      </svg>
    </div>

    <!-- Active Large-Scale Blueprint Scanning Beam (7.6s Cycle) -->
    <div class="skills-blueprint-beam absolute inset-y-0 w-32 sm:w-56 bg-gradient-to-r from-transparent via-signal/15 to-transparent pointer-events-none z-0"></div>

    <!-- Architectural Blueprint Coordinate Readouts in Negative Space -->
    <div class="absolute top-8 right-6 sm:right-12 flex flex-col items-end opacity-50 dark:opacity-60 font-mono text-[9px] text-dim tracking-widest space-y-1 hidden sm:flex">
      <span>[ MATRIX // SPEC.02 ]</span>
      <span>SCALE // 1:1.00</span>
      <span class="text-signal">STATUS // ACTIVE_INSPECT</span>
    </div>

    <!-- Isometric Construction Guidelines (Slow Drift) -->
    <div class="skills-iso-lines absolute -bottom-16 -left-16 w-[450px] h-[450px] opacity-60 dark:opacity-70 hidden md:block">
      <svg viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <line x1="0" y1="450" x2="450" y2="0" stroke="var(--hairline-strong)" stroke-width="1.2" stroke-dasharray="8 8" />
        <line x1="0" y1="300" x2="300" y2="0" stroke="var(--hairline)" stroke-width="0.8" />
        <line x1="150" y1="450" x2="450" y2="150" stroke="var(--hairline)" stroke-width="0.8" />
        <circle cx="225" cy="225" r="4" fill="var(--signal)" />
        <circle cx="225" cy="225" r="16" stroke="var(--signal)" stroke-width="0.8" stroke-dasharray="2 4" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* High-Performance Blueprint Scanning & Drift */
.skills-blueprint-beam {
  animation: blueprint-scan 7.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  will-change: transform;
}

.skills-iso-lines {
  animation: iso-drift 18.2s ease-in-out infinite;
  will-change: transform;
}

@keyframes blueprint-scan {
  0% { transform: translateX(-150%); opacity: 0; }
  15% { opacity: 0.8; }
  85% { opacity: 0.8; }
  100% { transform: translateX(120vw); opacity: 0; }
}

@keyframes iso-drift {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .skills-blueprint-beam,
  .skills-iso-lines {
    animation: none !important;
    display: none;
  }
}
</style>
