<script setup>
import { projects } from '../data/portfolio'
</script>

<template>
  <section id="projects" class="bg-white">
    <div class="section-shell">
      <div class="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div data-reveal>
          <p class="eyebrow">Projects</p>
          <h2 class="max-w-4xl text-4xl font-black uppercase leading-tight text-ink sm:text-5xl lg:text-6xl">
            Selected <strong class="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">work</strong> with <strong class="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">premium</strong> detail.
          </h2>
        </div>
        <p class="max-w-md text-base font-medium leading-relaxed text-muted" data-reveal data-delay="1">
          Beberapa project yang ditampilkan adalah project dengan kualitas premium dan sesuai dengan kebutuhannya!
        </p>
      </div>

      <div class="grid gap-5 lg:grid-cols-6">
        <article
          v-for="(project, index) in projects"
          :key="project.name"
          class="premium-card group overflow-hidden"
          :class="project.featured ? 'lg:col-span-6 xl:grid xl:grid-cols-[1.08fr_0.92fr]' : 'lg:col-span-3'"
          data-reveal
          :data-delay="index + 1"
        >
          <div
            class="relative min-h-72 overflow-hidden bg-gradient-to-br p-5"
            :class="[project.tone, project.featured ? 'xl:min-h-[420px]' : '']"
          >
            <div class="absolute inset-5 rounded-2xl border border-white/80 bg-white/40"></div>
            <div class="relative h-full min-h-64 overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition duration-700 group-hover:scale-[1.025]">
              <img
                :src="project.image"
                :alt="`Preview ${project.name}`"
                class="h-full min-h-64 w-full object-cover"
                loading="lazy"
              >
            </div>
          </div>

          <div class="flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              <div class="mb-4 flex flex-wrap items-center gap-2">
                <span class="rounded-full border border-line bg-soft px-3 py-1 text-xs font-bold uppercase text-muted">
                  {{ project.featured ? 'Featured' : 'Project' }}
                </span>
                <span class="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase text-muted">
                  Web
                </span>
              </div>
              <h3 class="text-2xl font-black uppercase leading-tight text-ink sm:text-3xl">
                {{ project.name }}
              </h3>
              <p class="mt-4 text-base font-medium leading-relaxed text-muted">
                {{ project.description }}
              </p>
            </div>

            <div>
              <div class="mb-6 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex flex-col gap-3 sm:flex-row">
                <a :href="project.liveUrl" target="_blank" rel="noreferrer" class="button-primary min-h-11 px-5">
                  Live Preview
                </a>
                <a :href="project.githubUrl" target="_blank" rel="noreferrer" class="button-secondary min-h-11 px-5">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
