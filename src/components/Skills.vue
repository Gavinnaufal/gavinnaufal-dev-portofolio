<script setup>
import { Icon } from '@iconify/vue'
import { skills } from '../data/portfolio'

const getInitial = (skill) => skill.name.replace('&', '').split(' ')[0].slice(0, 2).toUpperCase()
</script>

<template>
  <section id="skills" class="bg-soft">
    <div class="section-shell">
      <div class="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div data-reveal>
          <p class="eyebrow bg-white/80">Skills</p>
          <h2 class="max-w-3xl text-4xl font-black uppercase leading-tight text-ink sm:text-5xl lg:text-6xl">
            <strong class="bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">Tools</strong> for <strong class="bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">modern web</strong> execution.
          </h2>
        </div>
        <p class="max-w-md text-base font-medium leading-relaxed text-muted" data-reveal data-delay="1">
          Kombinasi front-end, back-end, database, dan design workflow untuk membangun website yang
          responsive dan siap dikembangkan.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="group rounded-2xl border border-line bg-white/80 p-4 shadow-sm backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-soft"
          data-reveal
          :data-delay="(index % 4) + 1"
        >
          <div class="flex items-center gap-3">
            <span class="grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 text-2xl text-ink transition duration-500 group-hover:scale-105">
              <Icon v-if="skill.icon" :icon="skill.icon" aria-hidden="true" />
              <span v-else class="text-xs font-black">{{ getInitial(skill) }}</span>
            </span>
            <span class="text-sm font-bold leading-tight text-ink sm:text-base">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
