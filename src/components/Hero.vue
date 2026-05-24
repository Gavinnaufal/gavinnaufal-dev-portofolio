<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden pt-28 sm:pt-32"
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
      class="section-shell grid items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
    >
      <div class="relative z-10">
        <p class="eyebrow" data-reveal>Portfolio</p>
        <h1
          class="text-reveal max-w-5xl text-5xl font-black uppercase leading-none text-ink sm:text-7xl lg:text-8xl"
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
            class="rounded-full border border-line bg-white/80 px-4 py-2 text-sm font-bold uppercase text-ink shadow-sm backdrop-blur"
          >
            Web Developer
          </span>
        </div>

        <div
          class="mt-9 flex flex-col gap-3 sm:flex-row"
          data-reveal
          data-delay="2"
        >
          <a href="#projects" class="button-primary">View Projects</a>
          <a href="#contact" class="button-secondary">Contact Me</a>
        </div>
      </div>

      <div
        class="relative mx-auto w-full max-w-md lg:max-w-none"
        data-reveal
        data-delay="2"
      >
        <div
          class="absolute -left-5 top-12 h-24 w-24 rounded-2xl border border-line bg-white/60 shadow-soft backdrop-blur float-soft"
        ></div>
        <div
          class="absolute -right-3 bottom-16 h-28 w-28 rounded-2xl border border-line bg-mist/80 shadow-soft backdrop-blur float-soft-delayed"
        ></div>

        <div
          class="premium-card relative overflow-hidden p-4 rotate-[10deg] animate-float"
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
              class="absolute bottom-8 left-8 right-8 rounded-2xl border border-line bg-white/80 p-3 shadow-soft backdrop-blur"
            >
              <p
                class="text-center text-2xl font-black uppercase leading-none text-ink"
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
