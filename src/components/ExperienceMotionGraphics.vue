<script setup>
// Experience Chapter: Technical Document / Archive
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Oversized Archival Dossier Numeric Watermark "01" (Spans 30% of Section) -->
    <div class="exp-watermark absolute top-4 right-6 sm:right-16 w-48 sm:w-80 h-48 sm:h-80 opacity-[0.06] dark:opacity-[0.08] pointer-events-none">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <text
          x="180"
          y="160"
          text-anchor="end"
          class="font-display text-[180px] font-black fill-none"
          stroke="var(--chalk)"
          stroke-width="1.8"
        >
          01
        </text>
      </svg>
    </div>

    <!-- Technical Document Margin Classification Stamp -->
    <div class="absolute top-8 left-8 flex flex-col font-mono text-[9px] text-dim tracking-[0.25em] opacity-45 dark:opacity-55 hidden sm:flex">
      <span>CLASSIFICATION // TECHNICAL_RECORD</span>
      <span>DOSSIER // EXP.2026.SYS</span>
      <span class="text-signal">STATUS // VERIFIED_PRODUCTION</span>
    </div>

    <!-- Document Section Margin Ruler & Section Markers (Full Height) -->
    <div class="absolute inset-y-10 left-3 sm:left-6 w-8 opacity-45 dark:opacity-55 hidden md:block">
      <svg width="32" height="100%" xmlns="http://www.w3.org/2000/svg" class="overflow-visible">
        <line x1="8" y1="0" x2="8" y2="100%" stroke="var(--hairline-strong)" stroke-width="1" />
        
        <!-- Document Paragraph Division Markers -->
        <line x1="0" y1="80" x2="16" y2="80" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <text x="20" y="83" class="font-mono text-[7px] fill-dim tracking-wider">§01</text>
        
        <line x1="0" y1="260" x2="16" y2="260" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <text x="20" y="263" class="font-mono text-[7px] fill-dim tracking-wider">§02</text>
        
        <line x1="0" y1="440" x2="16" y2="440" stroke="var(--hairline-strong)" stroke-width="1.2" />
        <text x="20" y="43" class="font-mono text-[7px] fill-dim tracking-wider">§03</text>

        <!-- Traveling Document Scanner Node (8.4s Cycle) -->
        <g class="exp-ruler-node">
          <circle cx="8" cy="0" r="2.5" fill="var(--signal)" />
          <line x1="0" y1="0" x2="16" y2="0" stroke="var(--signal)" stroke-width="1.2" />
        </g>
      </svg>
    </div>

    <!-- Horizontal Document Registration Baseline -->
    <div class="absolute inset-x-12 bottom-6 h-[1px] bg-gradient-to-r from-transparent via-hairline-strong to-transparent opacity-60"></div>
  </div>
</template>

<style scoped>
/* GPU-Accelerated Archival Movement */
.exp-watermark {
  animation: watermark-subtle-drift 16.4s ease-in-out infinite;
  will-change: transform;
}

.exp-ruler-node {
  animation: doc-node-travel 8.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  will-change: transform;
}

@keyframes watermark-subtle-drift {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(-1deg); }
}

@keyframes doc-node-travel {
  0% { transform: translateY(60px); }
  50% { transform: translateY(460px); }
  100% { transform: translateY(60px); }
}

@media (prefers-reduced-motion: reduce) {
  .exp-watermark,
  .exp-ruler-node {
    animation: none !important;
    transform: none !important;
  }
}
</style>
