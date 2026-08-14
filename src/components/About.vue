<script setup>
import portfolioData from '@/data/portfolio.json'

const { about } = portfolioData
const paragraphs = about.paragraphs || [about.summary]
</script>

<template>
  <section id="about" class="border-b border-hairline py-16 sm:py-24 lg:py-32">
    <div class="editorial-shell">
      <!-- Section Header -->
      <div class="mb-12 sm:mb-16 grid items-end justify-between gap-6 sm:gap-8 border-b border-hairline pb-8 sm:pb-12 lg:grid-cols-12">
        <div class="space-y-3 sm:space-y-4 lg:col-span-7" data-reveal-heading>
          <p class="font-mono text-xs uppercase tracking-widest text-signal">
            // {{ about.eyebrow }}
          </p>

          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-chalk break-words">
            {{ about.title }}
          </h2>
        </div>

        <div class="space-y-3 lg:col-span-5" data-reveal-item>
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            class="text-sm sm:text-base font-normal leading-relaxed text-silver"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- Main Content Area: Core Highlights Matrix & Engineering Principles -->
      <div class="space-y-12 sm:space-y-14">
        <!-- Matriks Statistik Tabular -->
        <div class="space-y-3 sm:space-y-4" data-reveal-item>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// CORE HIGHLIGHTS</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-hairline border-y border-hairline font-mono">
            <div
              v-for="stat in about.stats"
              :key="stat.label"
              class="p-4 sm:p-6 transition-colors duration-300 hover:bg-surface"
            >
              <p class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-chalk">
                {{ stat.value }}
              </p>
              <p class="mt-1.5 sm:mt-2 text-xs font-bold uppercase tracking-widest text-chalk">
                {{ stat.label }}
              </p>
              <p v-if="stat.sub" class="mt-1 text-[10px] sm:text-[11px] tracking-normal text-dim">
                {{ stat.sub }}
              </p>
            </div>
          </div>
        </div>

        <!-- Prinsip / Highlights -->
        <div class="space-y-3 sm:space-y-4" data-reveal-item>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// PRINCIPLES</p>
          <div class="divide-y divide-hairline border-y border-hairline">
            <div
              v-for="(item, index) in about.highlights"
              :key="item.title"
              class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 py-4 sm:py-6 transition-colors duration-300 hover:bg-surface/60 sm:items-start"
            >
              <div class="sm:col-span-4">
                <span class="font-mono text-xs uppercase tracking-widest text-signal">
                  0{{ index + 1 }} //
                </span>
                <h3 class="mt-1 font-display text-base sm:text-lg font-bold uppercase tracking-tight text-chalk">
                  {{ item.title }}
                </h3>
              </div>
              <div class="sm:col-span-8">
                <p class="text-sm sm:text-base leading-relaxed text-silver">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
