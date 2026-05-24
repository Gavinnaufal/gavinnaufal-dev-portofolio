<script setup>
import { stats } from '../data/portfolio'
</script>

<template>
  <section id="about" class="bg-white">
    <div class="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
      <div data-reveal>
        <p class="eyebrow">About</p>
        <h2 class="text-4xl font-black uppercase leading-tight text-ink sm:text-5xl lg:text-6xl">
          Clean <strong class="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">interface</strong>, clear <strong class="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">direction</strong>.
        </h2>
      </div>

      <div class="space-y-8">
        <div class="premium-card p-6 sm:p-8" data-reveal data-delay="1">
          <p class="text-xl font-medium leading-relaxed text-slate-700 sm:text-2xl">
            Saya adalah seorang siswa kelas 11 di SMK Negeri 7 Batam yang memiliki minat besar dalam bidang teknologi, khususnya dalam pengembangan web. Saya sangat antusias untuk terus belajar dan berkembang dalam dunia teknologi, serta berkontribusi pada proyek-proyek yang menantang di masa depan.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="(item, index) in stats"
            :key="item.label"
            class="premium-card p-5"
            data-reveal
            :data-delay="index + 1"
          >
            <p class="text-3xl font-black text-ink">{{ item.value }}</p>
            <p class="mt-2 text-sm font-semibold text-muted">{{ item.label }}</p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2" data-reveal data-delay="2">
          <div class="rounded-2xl border border-line bg-soft p-6">
            <p class="text-sm font-bold uppercase text-muted">Experience highlight</p>
            <p class="mt-3 text-lg font-bold leading-snug text-ink">
              Building structured web flows from UI concept to database-backed implementation.
            </p>
          </div>
          <div class="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <p class="text-sm font-bold uppercase text-muted">Design principle</p>
            <p class="mt-3 text-lg font-bold leading-snug text-ink">
              Minimal visuals, strong hierarchy, and smooth interactions that feel intentional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
