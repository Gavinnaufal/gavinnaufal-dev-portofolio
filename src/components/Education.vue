<script setup>
const educations = [
  // {
  //   title: "Institut Teknologi Sepuluh Nopember (SOON)",
  //   subtitle: "Teknik Informatika",
  //   period: "2027 — 2031",
  //   active: true,
  //   items: [
  //     "Mempelajari web development, database, UI/UX, dan software development.",
  //     "Membuat berbagai project website menggunakan HTML, CSS, JavaScript, Vue.js, Laravel, dan MySQL.",
  //     "Mengembangkan kemampuan problem solving dan kerja sama dalam project sekolah.",
  //     "Fokus membangun website yang responsive, modern, dan mudah digunakan.",
  //   ],
  // },
  {
    title: "SMK Negeri 7 Batam",
    subtitle: "Sekolah Menengah Kejuruan - Rekayasa Perangkat Lunak",
    period: "2024 — Sekarang",
    active: false,
    items: [
      "Mempelajari web development, database, UI/UX, dan software development.",
      "Membuat berbagai project website menggunakan HTML, CSS, JavaScript, Vue.js, Laravel, dan MySQL.",
      "Mengembangkan kemampuan problem solving dan kerja sama dalam project sekolah.",
      "Fokus membangun website yang responsive, modern, dan mudah digunakan.",
    ],
  },
  {
    title: "SMP Negeri 6 Batam",
    subtitle: "Sekolah Menengah Pertama",
    period: "2021 — 2024",
    active: false,
    items: [
      "Membangun dasar akademik dan minat dalam teknologi.",
      "Aktif mengikuti pembelajaran dan kegiatan sekolah.",
      "Mengembangkan kemampuan komunikasi, disiplin, dan teamwork.",
    ],
  },
];
</script>

<template>
  <section id="education" class="bg-white">
    <div class="section-shell">
      <div class="mb-16 max-w-3xl" data-reveal>
        <p class="eyebrow bg-white">EDUCATION</p>
        <h2
          class="section-title"
        >
          My <strong class="bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">Education</strong> Journey
        </h2>
        <p
          class="section-copy mt-5 max-w-2xl"
        >
          Pendidikan yang membentuk saya menjadi seorang Programmer.
        </p>
      </div>

      <div class="relative max-w-5xl">
        <div
          class="absolute bottom-3 left-[11px] top-3 w-px bg-line"
          aria-hidden="true"
        ></div>

        <div class="space-y-14 sm:space-y-16">
          <article
            v-for="(education, index) in educations"
            :key="education.title"
            class="group relative grid grid-cols-[24px_minmax(0,1fr)] gap-4 min-[420px]:gap-6 sm:gap-8"
            data-reveal
            :data-delay="index + 1"
          >
            <div class="relative z-10 pt-2">
              <span
                class="block size-6 rounded-full bg-white transition duration-500 group-hover:scale-110"
                :class="
                  education.active
                    ? 'border-2 border-ink bg-ink'
                    : 'border-2 border-slate-300 group-hover:border-slate-500'
                "
                aria-hidden="true"
              ></span>
            </div>

            <div
              class="border-b border-line/80 pb-12 transition duration-300 group-hover:border-slate-300"
            >
              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <h3
                    class="text-[1.65rem] font-black uppercase leading-tight text-ink transition duration-300 group-hover:text-slate-700 min-[420px]:text-2xl sm:text-3xl"
                  >
                    {{ education.title }}
                  </h3>
                  <p
                    class="mt-2 text-sm font-bold uppercase leading-relaxed tracking-[0.08em] text-muted sm:tracking-[0.16em]"
                  >
                    {{ education.subtitle }}
                  </p>
                </div>

                <p
                  class="shrink-0 text-sm font-bold uppercase leading-relaxed tracking-[0.08em] text-muted sm:pt-2 sm:text-right sm:tracking-[0.14em]"
                >
                  {{ education.period }}
                </p>
              </div>

              <ul class="mt-7 space-y-3">
                <li
                  v-for="item in education.items"
                  :key="item"
                  class="flex gap-3 text-base font-medium leading-relaxed text-muted"
                >
                  <span
                    class="mt-2 size-1.5 shrink-0 rounded-full bg-slate-300"
                    aria-hidden="true"
                  ></span>
                  <span
                    class="transition duration-300 group-hover:text-slate-600"
                    >{{ item }}</span
                  >
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
