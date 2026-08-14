<script setup>
import portfolioData from '@/data/portfolio.json'

const props = defineProps({
  lenis: {
    type: Object,
    default: null,
  },
})

const { footer, profile } = portfolioData

const scrollToTop = () => {
  if (props.lenis) {
    props.lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="bg-[#090a0c] py-14 text-silver">
    <div class="editorial-shell space-y-10">
      <!-- Main Footer Grid -->
      <div class="grid gap-8 border-b border-hairline pb-10 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
        <!-- Brand -->
        <div class="space-y-2">
          <p class="text-[10px] uppercase tracking-widest text-dim">// PORTFOLIO</p>
          <p class="font-sans text-base font-bold text-chalk">{{ footer.brand }}</p>
          <p class="text-dim">{{ profile.role }}</p>
        </div>

        <!-- Location -->
        <div class="space-y-2">
          <p class="text-[10px] uppercase tracking-widest text-dim">// DOMICILE</p>
          <p class="text-chalk">{{ profile.location }}</p>
          <p class="text-dim">Indonesia</p>
        </div>

        <!-- Stack Note -->
        <div class="space-y-2">
          <p class="text-[10px] uppercase tracking-widest text-dim">// BUILT WITH</p>
          <p class="text-chalk">Vue 3 + GSAP + Lenis</p>
          <p class="text-dim">Tailwind CSS</p>
        </div>

        <!-- Back to Top Button -->
        <div class="space-y-2 sm:text-right">
          <p class="text-[10px] uppercase tracking-widest text-dim">// RETURN</p>
          <button
            type="button"
            class="group inline-flex items-center gap-2 border border-hairline bg-surface px-3.5 py-2 text-xs text-chalk transition-colors hover:border-signal hover:text-signal focus:outline-none"
            @click="scrollToTop"
          >
            <span>BACK TO TOP</span>
            <span class="transition-transform group-hover:-translate-y-0.5">↑</span>
          </button>
        </div>
      </div>

      <!-- Bottom Line -->
      <div class="flex flex-col justify-between gap-3 font-mono text-xs text-dim sm:flex-row sm:items-center">
        <p>{{ footer.copyright }}</p>
        <p>{{ footer.colophon }}</p>
      </div>
    </div>
  </footer>
</template>
