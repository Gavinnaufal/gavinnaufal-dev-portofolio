<script setup>
// Education Chapter: Time / Chronological Time-Dial
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Massive Chronological Time-Dial (Spans 35% of Section in Upper-Right) -->
    <div class="edu-time-dial absolute -top-16 -right-12 sm:right-6 md:right-16 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] opacity-75 dark:opacity-85">
      <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Outer Time-Dial Circumference & Radial Ticks -->
        <g class="edu-dial-outer">
          <circle
            cx="220"
            cy="220"
            r="190"
            stroke="var(--hairline-strong)"
            stroke-width="1.2"
            stroke-dasharray="4 6 40 6 80 6"
          />
          <!-- 12 Radial Hour / Milestone Calibration Ticks -->
          <line x1="220" y1="20" x2="220" y2="40" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <line x1="220" y1="400" x2="220" y2="420" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <line x1="20" y1="220" x2="40" y2="220" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <line x1="400" y1="220" x2="420" y2="220" stroke="var(--hairline-strong)" stroke-width="1.5" />
          <!-- Degree Indices -->
          <text x="220" y="52" text-anchor="middle" class="font-mono text-[7px] fill-dim">00°</text>
          <text x="390" y="223" class="font-mono text-[7px] fill-dim">90°</text>
          <text x="220" y="396" text-anchor="middle" class="font-mono text-[7px] fill-dim">180°</text>
          <text x="50" y="223" class="font-mono text-[7px] fill-dim">270°</text>
        </g>

        <!-- Inner Counter-Rotating Year Dial (2020 - 2026) -->
        <g class="edu-dial-inner">
          <circle
            cx="220"
            cy="220"
            r="140"
            stroke="var(--hairline)"
            stroke-width="0.8"
            stroke-dasharray="2 4"
          />
          <text x="220" y="95" text-anchor="middle" class="font-mono text-[8px] fill-chalk tracking-widest">2026</text>
          <text x="345" y="223" text-anchor="middle" class="font-mono text-[8px] fill-dim tracking-widest">2024</text>
          <text x="220" y="352" text-anchor="middle" class="font-mono text-[8px] fill-dim tracking-widest">2022</text>
          <text x="95" y="223" text-anchor="middle" class="font-mono text-[8px] fill-dim tracking-widest">2020</text>
        </g>

        <!-- Center Chronometer Pivot Crosshair -->
        <line x1="220" y1="205" x2="220" y2="235" stroke="var(--hairline-strong)" stroke-width="1" />
        <line x1="205" y1="220" x2="235" y2="220" stroke="var(--hairline-strong)" stroke-width="1" />
        <circle cx="220" cy="220" r="3" fill="var(--chalk)" />

        <!-- Continuous Sweeping Time-Pointer Needle (16.4s Cycle - Full 360° Rotation) -->
        <g class="edu-time-pointer">
          <line x1="220" y1="220" x2="220" y2="30" stroke="var(--signal)" stroke-width="1.5" />
          <circle cx="220" cy="30" r="4" fill="var(--signal)" />
          <circle cx="220" cy="30" r="8" stroke="var(--signal)" stroke-width="0.8" opacity="0.6" />
        </g>

        <!-- Technical Readout -->
        <text x="220" y="255" text-anchor="middle" class="font-mono text-[8px] fill-dim tracking-[0.2em] opacity-80">
          TEMPORAL // TIMELINE.SYS
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Chronometer Time-Dial Motion */
.edu-time-pointer {
  transform-origin: 220px 220px;
  animation: pointer-sweep 16.4s linear infinite;
  will-change: transform;
}

.edu-dial-outer {
  transform-origin: 220px 220px;
  animation: dial-drift 42.8s linear infinite;
  will-change: transform;
}

.edu-dial-inner {
  transform-origin: 220px 220px;
  animation: dial-drift 32.6s linear infinite reverse;
  will-change: transform;
}

@keyframes pointer-sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes dial-drift {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .edu-time-pointer,
  .edu-dial-outer,
  .edu-dial-inner {
    animation: none !important;
    transform: none !important;
  }
}
</style>
