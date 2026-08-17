<script setup>
import portfolioData from '@/data/portfolio.json'
import ExperienceMotionGraphics from './ExperienceMotionGraphics.vue'

const { experience } = portfolioData
</script>

<template>
  <section id="experience" class="relative border-b border-hairline py-16 sm:py-24 lg:py-32 overflow-hidden">
    <!-- Chapter 04: Technical Document / Archive Background Graphics -->
    <ExperienceMotionGraphics />

    <div class="editorial-shell relative z-10">
      <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16 w-full">
        <!-- Kolom Kiri: Section Identity & Context -->
        <div class="lg:col-span-5 flex flex-col gap-3 sm:gap-4" data-reveal-heading>
          <span class="font-mono text-xs text-signal tracking-widest uppercase block">
            04 // {{ experience.eyebrow }}
          </span>

          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-chalk leading-[1.05] m-0 p-0 break-words">
            FIELD<br class="hidden sm:inline" /> EXPERIENCE.
          </h2>

          <p class="text-sm sm:text-base leading-relaxed text-silver mt-1 max-w-md">
            {{ experience.description }}
          </p>
        </div>

        <!-- Kolom Kanan: Technical Work Archive Record -->
        <div class="lg:col-span-7 flex flex-col w-full space-y-6 sm:space-y-8" data-reveal-item>
          <!-- Top Metadata Header Bar -->
          <div class="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-3 border-b border-hairline pb-4 font-mono text-xs">
            <span class="tracking-[0.2em] text-dim uppercase">// WORK ARCHIVE — 01</span>
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span class="size-1.5 rounded-full bg-signal"></span>
              <span class="font-semibold uppercase tracking-wider text-chalk whitespace-nowrap">{{ experience.period }}</span>
              <span class="border border-hairline bg-surface px-2 py-0.5 text-[10px] font-bold tracking-widest text-signal uppercase">
                ● {{ experience.status }}
              </span>
            </div>
          </div>

          <!-- Company & Role Block -->
          <div class="space-y-1.5">
            <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">// COMPANY & ROLE</p>
            <h3 class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-chalk break-words">
              {{ experience.company }}
            </h3>
            <p class="font-mono text-xs sm:text-sm uppercase tracking-widest text-silver">
              {{ experience.role }}
            </p>
          </div>

          <!-- Environment / Tooling Metadata -->
          <div class="border-t border-hairline pt-6 sm:pt-7 space-y-3">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// ENVIRONMENT</p>
            <div class="flex flex-wrap gap-2 sm:gap-3 font-mono text-xs">
              <span
                v-for="tool in experience.environment"
                :key="tool"
                class="border border-hairline bg-surface px-3 py-1.5 text-chalk font-medium uppercase tracking-wider"
              >
                {{ tool }}
              </span>
            </div>
          </div>

          <!-- Focus Areas (Factual Work Categories) -->
          <div class="border-t border-hairline pt-6 sm:pt-7 space-y-3 sm:space-y-4">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// FOCUS</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
              <div
                v-for="item in experience.focus"
                :key="item.id"
                class="flex items-center gap-3 border border-hairline bg-surface/40 p-3 sm:p-3.5 transition-colors duration-200 hover:border-hairline-strong hover:bg-surface"
              >
                <span class="text-signal font-bold">{{ item.id }}</span>
                <span class="font-medium uppercase tracking-wider text-chalk">{{ item.label }}</span>
              </div>
            </div>
          </div>

          <!-- Contribution Narrative -->
          <div class="border-t border-hairline pt-6 sm:pt-7 space-y-2.5">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// CONTRIBUTION</p>
            <p class="font-sans text-sm sm:text-base leading-relaxed text-silver">
              {{ experience.contribution }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
