<script setup>
import portfolioData from '@/data/portfolio.json'

const { contact } = portfolioData
</script>

<template>
  <section id="contact" class="border-b border-hairline py-16 sm:py-24 lg:py-32">
    <div class="editorial-shell">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start w-full">
        <!-- Left 6 Columns: Statement & Status -->
        <div class="space-y-4 sm:space-y-6 lg:col-span-6 min-w-0" data-reveal-heading>
          <span class="font-mono text-xs text-signal tracking-widest uppercase block">
            05 // {{ contact.eyebrow }}
          </span>

          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-chalk break-words">
            {{ contact.heading }}
          </h2>

          <p class="text-sm sm:text-base lg:text-lg leading-relaxed text-silver">
            {{ contact.description }}
          </p>

          <!-- Status Indicator Box -->
          <div class="border border-hairline bg-surface p-4 sm:p-5 font-mono text-xs">
            <div class="flex items-center gap-2.5">
              <span class="size-2 rounded-full bg-signal animate-pulse"></span>
              <span class="text-chalk font-semibold uppercase tracking-wider">Status Ketersediaan</span>
            </div>
            <p class="mt-2 text-silver">
              {{ contact.status }}
            </p>
          </div>
        </div>

        <!-- Right 6 Columns: Tabular Channel Directory -->
        <div class="space-y-4 lg:col-span-6 w-full min-w-0" data-reveal-item>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// KANAL KOMUNIKASI</p>

          <div class="divide-y divide-hairline border-y border-hairline font-mono">
            <a
              v-for="item in contact.items"
              :key="item.label"
              :href="item.href"
              target="_blank"
              rel="noreferrer"
              class="group flex items-center justify-between p-4 sm:p-5 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-elevated gap-3"
            >
              <div class="space-y-1 min-w-0 flex-1">
                <span class="text-[10px] uppercase tracking-widest text-dim block">// {{ item.label }}</span>
                <p class="font-sans text-base sm:text-lg lg:text-xl font-bold text-chalk transition-colors duration-200 group-hover:text-signal break-all">
                  {{ item.value }}
                </p>
                <p v-if="item.desc" class="text-xs text-silver">
                  {{ item.desc }}
                </p>
              </div>

              <div class="flex size-8 sm:size-9 shrink-0 items-center justify-center border border-hairline bg-surface text-chalk transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                <span class="arrow-reveal text-sm">↗</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
