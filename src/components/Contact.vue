<script setup>
import { contacts } from '../data/portfolio'
</script>

<template>
  <section id="contact" class="bg-white">
    <div class="section-shell">
      <div class="premium-card overflow-hidden">
        <div class="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="relative overflow-hidden p-5 text-center min-[420px]:p-6 sm:p-10 sm:text-left lg:p-12" data-reveal>
            <div class="absolute right-8 top-8 h-40 w-40 rounded-2xl border border-line bg-mist/80 blur-2xl"></div>
            <p class="eyebrow relative">Contact</p>
            <h2 class="section-title relative max-w-3xl lg:text-7xl">
              Let's <strong class="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">work</strong> Together
            </h2>
            <p class="section-copy relative mx-auto mt-6 max-w-xl sm:mx-0">
              Siap membangun website modern, responsive, dan clean untuk kebutuhan personal,
              sekolah, atau bisnis kecil.
            </p>
          </div>

          <div class="border-t border-line bg-soft p-4 sm:p-6 lg:border-l lg:border-t-0" data-reveal data-delay="1">
            <div class="grid gap-3">
              <a
                v-for="contact in contacts"
                :key="contact.label"
                :href="contact.href"
                target="_blank"
                rel="noreferrer"
                class="group flex min-h-20 flex-col items-stretch justify-between gap-4 rounded-2xl border border-line bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft min-[480px]:flex-row min-[480px]:items-center min-[480px]:text-left"
              >
                <span class="min-w-0">
                  <span class="block text-sm font-bold uppercase leading-snug text-muted">{{ contact.label }}</span>
                  <span class="mt-1 block break-all text-lg font-bold leading-snug text-ink sm:text-base">{{ contact.value }}</span>
                </span>
                <span class="grid min-h-11 w-full shrink-0 place-items-center rounded-2xl bg-soft px-4 text-base font-black text-ink transition group-hover:bg-ink group-hover:text-white min-[480px]:size-11 min-[480px]:w-auto sm:size-10 sm:text-sm">
                  Go
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
