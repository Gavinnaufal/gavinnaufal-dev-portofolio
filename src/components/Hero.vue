<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "@/data/portfolio.json";
import HeroMotionGraphics from "./HeroMotionGraphics.vue";

const props = defineProps({
  lenis: {
    type: Object,
    default: null,
  },
});

const { hero, profile } = portfolioData;
const card3d = ref(null);
const isHovered = ref(false);
let gsapCtx = null;

const scrollToSection = (id) => {
  const target = document.querySelector(id);
  if (!target) return;
  if (props.lenis) {
    props.lenis.scrollTo(target, { offset: -80, duration: 1.1 });
  } else {
    const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const handleMouseEnter = () => {
  isHovered.value = true;
  if (
    !card3d.value ||
    window.innerWidth < 1024 ||
    !window.matchMedia("(pointer: fine)").matches
  )
    return;

  // Smoothly animate to neutral upright position
  gsap.to(card3d.value, {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1.02,
    z: 20,
    duration: 0.35,
    ease: "power2.out",
    overwrite: "auto",
  });
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (
    !card3d.value ||
    window.innerWidth < 1024 ||
    !window.matchMedia("(pointer: fine)").matches
  )
    return;

  const heroSection = document.getElementById("home");
  if (!heroSection) return;

  const rect = heroSection.getBoundingClientRect();
  const progress = Math.max(
    0,
    Math.min(1, -rect.top / (rect.height || window.innerHeight)),
  );

  const maxRotX = 10;
  const maxRotY = 12;

  const targetRotX = gsap.utils.interpolate(maxRotX, -maxRotX, progress);
  const targetRotY = gsap.utils.interpolate(-maxRotY, maxRotY * 0.7, progress);
  const targetScale = gsap.utils.interpolate(0.98, 1.02, progress);

  gsap.to(card3d.value, {
    rotateX: targetRotX,
    rotateY: targetRotY,
    scale: targetScale,
    z: 0,
    duration: 0.45,
    ease: "power2.out",
    overwrite: "auto",
  });
};

onMounted(() => {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (
    card3d.value &&
    window.innerWidth >= 1024 &&
    isFinePointer &&
    !isReducedMotion
  ) {
    gsapCtx = gsap.context(() => {
      const maxRotX = 10;
      const maxRotY = 12;

      gsap.fromTo(
        card3d.value,
        {
          rotateX: maxRotX,
          rotateY: -maxRotY,
          rotateZ: -1.5,
          scale: 0.98,
        },
        {
          rotateX: -maxRotX,
          rotateY: maxRotY * 0.7,
          rotateZ: 1.5,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
            onUpdate: (self) => {
              if (!isHovered.value && card3d.value) {
                const p = self.progress;
                const rx = gsap.utils.interpolate(maxRotX, -maxRotX, p);
                const ry = gsap.utils.interpolate(-maxRotY, maxRotY * 0.7, p);
                const s = gsap.utils.interpolate(0.98, 1.02, p);
                gsap.set(card3d.value, { rotateX: rx, rotateY: ry, scale: s });
              }
            },
          },
        },
      );
    });
  }
});

onBeforeUnmount(() => {
  if (gsapCtx) gsapCtx.revert();
});
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-[85vh] items-center overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28"
  >
    <!-- Visual Motion Graphics Environment Layer -->
    <HeroMotionGraphics />

    <div class="editorial-shell relative z-10 w-full">
      <div
        class="grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-14 w-full"
      >
        <!-- Left / Content Area (7 Cols) -->
        <div class="space-y-4 sm:space-y-6 lg:col-span-7 min-w-0">
          <!-- Step 01: Role Eyebrow -->

          <!-- Step 02 & 03: Name & Headline -->
          <div class="space-y-2 sm:space-y-3">
            <h1
              class="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold uppercase tracking-tight text-chalk leading-[1.05] break-words"
              data-hero-name
            >
              {{ hero.name }}
            </h1>
            <p
              class="font-display text-lg sm:text-2xl md:text-3xl font-bold text-silver leading-snug break-words"
              data-hero-headline
            >
              {{ hero.headline }}
            </p>
          </div>

          <!-- Step 04: Bio Narrative -->
          <p
            class="max-w-xl text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-dim"
            data-hero-statement
          >
            {{ hero.statement }}
          </p>

          <!-- Step 05: Action Buttons -->
          <div
            class="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
            data-hero-cta
          >
            <a
              :href="hero.buttons.primary.href"
              :aria-label="`Scroll to ${hero.buttons.primary.label} section`"
              class="btn-editorial-primary group justify-center sm:justify-between py-3 sm:py-4 px-5 sm:px-6 focus-visible:ring-2 focus-visible:ring-signal focus:outline-none"
              @click.prevent="scrollToSection(hero.buttons.primary.href)"
            >
              <span>{{ hero.buttons.primary.label }}</span>
              <span class="arrow-reveal font-mono text-sm">↓</span>
            </a>
            <a
              :href="hero.buttons.secondary.href"
              :aria-label="`Scroll to ${hero.buttons.secondary.label} section`"
              class="btn-editorial-secondary group justify-center sm:justify-between py-3 sm:py-4 px-5 sm:px-6 focus-visible:ring-2 focus-visible:ring-signal focus:outline-none"
              @click.prevent="scrollToSection(hero.buttons.secondary.href)"
            >
              <span>{{ hero.buttons.secondary.label }}</span>
              <span class="arrow-reveal font-mono text-sm">↗</span>
            </a>
          </div>
        </div>

        <!-- Step 06: Right / 3D Spatial Portrait Viewport (5 Cols) -->
        <div
          class="lg:col-span-5 [perspective:1200px] w-full"
          data-hero-portrait
        >
          <div
            ref="card3d"
            class="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-none cursor-pointer border border-hairline-strong bg-surface p-2 sm:p-2.5 shadow-2xl transition-shadow duration-300 hover:border-signal/70 hover:shadow-[0_25px_60px_rgba(255,59,0,0.15)] [transform-style:preserve-3d] will-change-transform"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <div
              class="relative aspect-[4/5] w-full overflow-hidden bg-surface-elevated [transform-style:preserve-3d]"
            >
              <img
                src="@/assets/images/gavin_gtg.jpg"
                :alt="profile.name"
                class="h-full w-full object-cover grayscale contrast-115 transition-all duration-500 hover:grayscale-0 [transform:translateZ(8px)]"
                loading="eager"
              />

              <div
                class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-tr from-transparent via-white/10 to-transparent [transform:translateZ(16px)]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
