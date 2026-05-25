<template>
  <section
    id="home"
    class="relative flex min-h-dvh items-center overflow-hidden pt-28 sm:pt-32"
  >
    <div
      class="absolute inset-x-6 top-28 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
    ></div>
    <div
      class="absolute right-4 top-24 hidden h-52 w-52 rounded-2xl border border-line bg-white/50 blur-2xl lg:block"
    ></div>
    <div
      class="absolute bottom-10 left-4 hidden h-48 w-72 rounded-2xl border border-line bg-mist/70 blur-2xl lg:block"
    ></div>

    <div
      class="section-shell grid items-center gap-10 py-8 sm:gap-12 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
    >
      <div class="relative z-10">
        <p class="eyebrow" data-reveal>Portfolio</p>
        <h1
          class="text-reveal max-w-5xl text-[clamp(2.9rem,16vw,5.25rem)] font-black uppercase leading-none text-ink sm:text-7xl lg:text-8xl"
          aria-label="GAVIN NAUFAL KARNEDI"
        >
          <span>Simple,</span>
          <span class="block">Modern,</span>
          <span class="block">Impactful.</span>
        </h1>

        <div
          class="mt-7 flex flex-wrap items-center gap-3"
          data-reveal
          data-delay="1"
        >
          <span
            class="rounded-full border border-line bg-white/80 px-4 py-2 text-sm font-bold uppercase leading-none text-ink shadow-sm backdrop-blur"
          >
            Web Developer
          </span>
        </div>

        <div
          class="mt-9 flex flex-col gap-3 min-[480px]:flex-row"
          data-reveal
          data-delay="2"
        >
          <a href="#projects" class="button-primary">View Projects</a>
          <a href="#contact" class="button-secondary">Contact Me</a>
        </div>
      </div>

      <div
        class="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none"
        data-reveal
        data-delay="2"
      >
        <div
          class="absolute -left-3 top-10 h-20 w-20 rounded-2xl border border-line bg-white/60 shadow-soft backdrop-blur float-soft sm:-left-5 sm:top-12 sm:h-24 sm:w-24"
        ></div>
        <div
          class="absolute -right-2 bottom-12 h-20 w-20 rounded-2xl border border-line bg-mist/80 shadow-soft backdrop-blur float-soft-delayed sm:-right-3 sm:bottom-16 sm:h-28 sm:w-28"
        ></div>

        <div
          class="premium-card relative rotate-[4deg] overflow-hidden p-3 animate-float sm:rotate-[10deg] sm:p-4"
        >
          <div
            class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-soft via-white to-mist"
          >
            <img
              src="@/assets/images/gavin_gtg.jpg"
              alt="Gavin Naufal Karnedi"
              class="size-full object-cover"
            />

            <div
              class="absolute bottom-4 left-4 right-4 rounded-2xl border border-line bg-white/85 p-3 shadow-soft backdrop-blur sm:bottom-8 sm:left-8 sm:right-8"
            >
              <p
                class="text-center text-xl font-black uppercase leading-none text-ink sm:text-2xl"
              >
                Gavin Naufal Karnedi
              </p>
            </div>
          </div>
        </div>

        <!-- <div class="absolute -bottom-5 left-8 right-8 rounded-2xl border border-line bg-white/90 p-4 shadow-soft backdrop-blur">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase text-muted">Focus</p>
              <p class="mt-1 text-sm font-bold text-ink">Responsive websites and UI systems</p>
            </div>
            <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-bold text-white">26</span>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>
