<script setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import portfolioData from '@/data/portfolio.json'

const { skills } = portfolioData
const activeCategory = ref('ALL')

const categories = computed(() => {
  const cats = ['ALL']
  skills.items.forEach((item) => {
    if (item.category && !cats.includes(item.category)) {
      cats.push(item.category)
    }
  })
  return cats
})

const filteredSkills = computed(() => {
  if (activeCategory.value === 'ALL') {
    return skills.items
  }
  return skills.items.filter((item) => item.category === activeCategory.value)
})
</script>

<template>
  <section id="skills" class="border-b border-hairline py-16 sm:py-24 lg:py-32">
    <div class="editorial-shell">
      <!-- Section Header -->
      <div class="mb-12 sm:mb-14 grid items-end justify-between gap-6 sm:gap-8 lg:grid-cols-12">
        <div class="space-y-3 sm:space-y-4 lg:col-span-8" data-reveal-heading>
          <p class="font-mono text-xs uppercase tracking-widest text-signal">
            // {{ skills.eyebrow }}
          </p>

          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-chalk">
            {{ skills.title }}
          </h2>
        </div>

        <div class="space-y-3 sm:space-y-4 lg:col-span-4" data-reveal-item>
          <p class="text-sm sm:text-base font-normal leading-relaxed text-silver">
            {{ skills.description }}
          </p>

          <!-- Category Switcher -->
          <div class="flex flex-wrap gap-1.5 sm:gap-2 pt-2 font-mono text-xs">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="border px-3 py-1 sm:px-3.5 sm:py-1.5 uppercase tracking-wider text-[11px] sm:text-xs transition-all duration-200 focus:outline-none"
              :class="activeCategory === cat ? 'border-signal bg-signal text-white font-bold' : 'border-hairline bg-surface text-silver hover:border-chalk hover:text-chalk'"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Tabular Technical Matrix -->
      <div class="border border-hairline bg-surface font-mono overflow-hidden" data-reveal-item>
        <!-- Table Header -->
        <div class="hidden grid-cols-12 border-b border-hairline bg-[#090a0c] px-4 sm:px-6 py-3.5 text-xs uppercase tracking-widest text-dim md:grid">
          <div class="col-span-1">#</div>
          <div class="col-span-4">TECHNOLOGY</div>
          <div class="col-span-3">CATEGORY</div>
          <div class="col-span-4">FOCUS AREA</div>
        </div>

        <!-- Table Rows -->
        <div class="divide-y divide-hairline">
          <div
            v-for="(skill, index) in filteredSkills"
            :key="skill.name"
            class="group flex flex-col gap-2 p-3.5 sm:grid sm:grid-cols-12 sm:items-center sm:gap-0 sm:px-6 sm:py-4 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-elevated"
          >
            <!-- Index -->
            <div class="text-[11px] sm:text-xs text-dim group-hover:text-signal sm:col-span-1">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <!-- Skill Name & Icon -->
            <div class="flex items-center gap-3 sm:gap-3.5 sm:col-span-4">
              <span class="flex size-7 shrink-0 items-center justify-center border border-hairline bg-[#090a0c] text-base text-chalk transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <Icon v-if="skill.icon" :icon="skill.icon" class="size-4" />
                <span v-else class="text-[10px] font-bold">{{ skill.name.slice(0, 2).toUpperCase() }}</span>
              </span>
              <span class="font-sans text-base sm:text-lg font-bold text-chalk transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-signal break-words">
                {{ skill.name }}
              </span>
            </div>

            <!-- Domain / Category -->
            <div class="text-xs uppercase tracking-wider text-silver sm:col-span-3">
              <span class="inline-block border border-hairline px-2 py-0.5 text-[11px] sm:text-xs text-dim group-hover:border-signal/50 group-hover:text-chalk">
                {{ skill.category || 'TECH' }}
              </span>
            </div>

            <!-- Competency / Focus -->
            <div class="text-xs tracking-normal text-dim group-hover:text-silver sm:col-span-4">
              {{ skill.level || 'Production Ready' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
