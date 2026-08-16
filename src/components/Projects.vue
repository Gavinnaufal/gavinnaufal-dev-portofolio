<script setup>
import portfolioData from '@/data/portfolio.json'

const { projects } = portfolioData
</script>

<template>
  <section id="projects" class="border-b border-hairline py-16 sm:py-24 lg:py-32">
    <div class="editorial-shell">
      <!-- Section Header -->
      <div class="mb-14 sm:mb-16 flex flex-col justify-between gap-6 border-b border-hairline pb-8 sm:pb-10 lg:flex-row lg:items-end">
        <div class="space-y-3 sm:space-y-4" data-reveal-heading>
          <p class="font-mono text-xs uppercase tracking-widest text-signal">
            03 // {{ projects.eyebrow }}
          </p>

          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-chalk">
            {{ projects.title }}
          </h2>
        </div>

        <p class="max-w-md text-sm sm:text-base leading-relaxed text-silver" data-reveal-item>
          {{ projects.description }}
        </p>
      </div>

      <!-- Featured Case Studies Showcase -->
      <div class="space-y-16 sm:space-y-24">
        <article
          v-for="(project, index) in projects.items"
          :key="project.name"
          class="project-row group grid items-center gap-6 sm:gap-8 border-b border-hairline pb-12 sm:pb-16 lg:grid-cols-12 lg:gap-12"
          data-reveal-item
        >
          <!-- Media Column (7 Cols on LG) -->
          <component
            :is="project.liveUrl ? 'a' : 'div'"
            :href="project.liveUrl || undefined"
            :target="project.liveUrl ? '_blank' : undefined"
            :rel="project.liveUrl ? 'noopener noreferrer' : undefined"
            :data-cursor="project.liveUrl ? 'view' : undefined"
            :aria-label="project.liveUrl ? `Open ${project.name} live preview in new tab` : undefined"
            class="relative block overflow-hidden border border-hairline-strong bg-surface transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-signal/70 lg:col-span-7 w-full focus-visible:ring-2 focus-visible:ring-signal focus:outline-none"
            :class="[
              index % 2 === 1 ? 'lg:order-2' : 'lg:order-1',
              project.liveUrl ? 'cursor-pointer' : 'cursor-default'
            ]"
          >
            <!-- Top Bar inside frame -->
            <div class="flex items-center justify-between border-b border-hairline bg-[#090a0c]/90 px-3.5 sm:px-4 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-silver">
              <div class="flex items-center gap-2">
                <span class="text-signal font-bold">[{{ String(index + 1).padStart(2, '0') }}]</span>
                <span class="text-chalk font-semibold truncate">{{ project.category }}</span>
              </div>
              <span class="text-dim shrink-0">{{ project.year }}</span>
            </div>

            <!-- Image Viewport with Smooth Hover Zoom -->
            <div class="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
              <img
                :src="project.image"
                :alt="`Preview of ${project.name}`"
                class="h-full w-full object-cover grayscale contrast-110 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </component>

          <!-- Narrative & Specs Column (5 Cols on LG) -->
          <div
            class="space-y-4 sm:space-y-5 lg:col-span-5 w-full min-w-0"
            :class="index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'"
          >
            <div class="space-y-1.5 sm:space-y-2">
              <span class="font-mono text-xs uppercase tracking-widest text-signal">
                PROJECT // {{ String(index + 1).padStart(2, '0') }}
              </span>
              <h3 class="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-chalk transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-signal break-words">
                {{ project.name }}
              </h3>
              <p v-if="project.subtitle" class="font-mono text-xs uppercase tracking-wider text-dim">
                {{ project.subtitle }}
              </p>
            </div>

            <p class="text-sm sm:text-base leading-relaxed text-silver">
              {{ project.description }}
            </p>

            <!-- Tech Stack Tags -->
            <div class="space-y-2 pt-1 sm:pt-2">
              <span class="block font-mono text-[10px] uppercase tracking-widest text-dim">// TECH STACK</span>
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  class="border border-hairline bg-surface px-2 sm:px-2.5 py-1 font-mono text-[11px] sm:text-xs text-chalk transition-colors duration-200 hover:border-signal/40"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Direct Action Buttons -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Open ${project.name} live preview in new tab`"
                class="btn-editorial-primary text-xs py-2.5 sm:py-3 px-4 sm:px-6"
              >
                <span>Live Preview</span>
                <span class="arrow-reveal font-mono">↗</span>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Open ${project.name} source code on GitHub in new tab`"
                class="btn-editorial-secondary text-xs py-2.5 sm:py-3 px-4 sm:px-6"
              >
                <span>GitHub Code</span>
                <span class="arrow-reveal font-mono">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Tabular Directory Table at Bottom -->
      <div class="mt-14 sm:mt-16 space-y-4" data-reveal-item>
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// ALL PROJECTS DIRECTORY</p>
        <div class="border border-hairline bg-surface font-mono text-xs overflow-hidden">
          <div class="hidden grid-cols-12 border-b border-hairline bg-[#090a0c] px-4 sm:px-6 py-3 uppercase tracking-widest text-dim sm:grid">
            <div class="col-span-1">NO.</div>
            <div class="col-span-5">TITLE</div>
            <div class="col-span-3">CATEGORY</div>
            <div class="col-span-3 text-right">LINKS</div>
          </div>
          <div class="divide-y divide-hairline">
            <div
              v-for="(item, idx) in projects.items"
              :key="item.name"
              class="group flex flex-col gap-2 p-4 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-elevated sm:grid sm:grid-cols-12 sm:items-center sm:gap-0 sm:px-6"
            >
              <div class="text-dim group-hover:text-signal sm:col-span-1">
                {{ String(idx + 1).padStart(2, '0') }}
              </div>
              <div class="font-sans font-bold text-chalk group-hover:text-signal text-sm sm:text-base sm:col-span-5 break-words">
                {{ item.name }}
              </div>
              <div class="uppercase text-dim text-[11px] sm:text-xs sm:col-span-3">
                {{ item.category }}
              </div>
              <div class="flex items-center gap-4 pt-1 sm:pt-0 sm:col-span-3 sm:justify-end">
                <a
                  v-if="item.liveUrl"
                  :href="item.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`Open ${item.name} live preview in new tab`"
                  class="text-chalk underline decoration-hairline transition-colors duration-200 hover:text-signal hover:decoration-signal text-xs"
                >
                  LIVE ↗
                </a>
                <a
                  v-if="item.githubUrl"
                  :href="item.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`Open ${item.name} GitHub repository in new tab`"
                  class="text-dim transition-colors duration-200 hover:text-chalk text-xs"
                >
                  CODE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
