<script setup>
import portfolioData from '@/data/portfolio.json'

const { education } = portfolioData
</script>

<template>
  <section id="education" class="border-b border-hairline py-16 sm:py-24 lg:py-32">
    <div class="editorial-shell">
      <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16 w-full">
        <!-- Kolom Kiri: Header / Context (Static normal flow, responsive) -->
        <div class="lg:col-span-5 flex flex-col gap-3 sm:gap-4" data-reveal-heading>
          <span class="font-mono text-xs text-signal tracking-widest uppercase block">
            04 // {{ education.eyebrow }}
          </span>
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-chalk leading-tight m-0 p-0">
            {{ education.title }}
          </h2>
          <p class="text-sm sm:text-base leading-relaxed text-silver mt-1 max-w-md">
            {{ education.description }}
          </p>
        </div>

        <!-- Kolom Kanan: Timeline / Konten Akademik -->
        <div class="lg:col-span-7 flex flex-col w-full">
          <div class="relative border-l border-hairline-strong pl-6 sm:pl-8 lg:pl-10 space-y-12 sm:space-y-16">
            <article
              v-for="item in education.items"
              :key="item.title"
              class="group relative space-y-4"
              data-reveal-item
            >
              <!-- Timeline Dot Marker (Mathematically centered on border line) -->
              <span
                class="absolute -left-[7px] top-1.5 size-3 rounded-full border border-[#090a0c] bg-surface-muted ring-4 ring-[#090a0c] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-signal"
                :class="item.active ? 'bg-signal' : 'bg-surface-muted'"
              ></span>

              <!-- Period Badge -->
              <div class="flex items-center font-mono text-xs">
                <span class="border border-hairline bg-surface px-2.5 py-1 text-chalk font-semibold uppercase tracking-wider">
                  {{ item.period }}
                </span>
              </div>

              <!-- Institution & Degree -->
              <div class="space-y-1">
                <h3 class="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-chalk transition-colors group-hover:text-signal break-words">
                  {{ item.title }}
                </h3>
                <p class="font-mono text-xs sm:text-sm uppercase tracking-widest text-dim">
                  {{ item.subtitle }}
                </p>
              </div>

              <!-- Detailed Points -->
              <ul class="space-y-2.5 pt-1 font-sans text-xs sm:text-sm lg:text-base text-silver">
                <li
                  v-for="point in item.items"
                  :key="point"
                  class="flex items-start gap-3 leading-relaxed"
                >
                  <span class="mt-2 size-1.5 shrink-0 bg-signal"></span>
                  <span class="min-w-0 flex-1">{{ point }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
