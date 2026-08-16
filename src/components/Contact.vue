<script setup>
import { onBeforeUnmount, ref } from 'vue'
import portfolioData from '@/data/portfolio.json'

const { contact } = portfolioData
const isCopied = ref(false)
let copyTimeout = null

const copyEmail = async () => {
  if (!contact.email) return

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(contact.email)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = contact.email
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    isCopied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      isCopied.value = false
    }, 2200)
  } catch (err) {
    console.error('Failed to copy email to clipboard:', err)
  }
}

onBeforeUnmount(() => {
  if (copyTimeout) clearTimeout(copyTimeout)
})
</script>

<template>
  <section id="contact" class="border-b border-hairline py-16 sm:py-24 lg:py-32">
    <div class="editorial-shell">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start w-full">
        <!-- Left 6 Columns: Statement, Email Copy & Status -->
        <div class="space-y-4 sm:space-y-6 lg:col-span-6 min-w-0" data-reveal-heading>
          <span class="font-mono text-xs text-signal tracking-widest uppercase block">
            06 // {{ contact.eyebrow }}
          </span>

          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-chalk break-words">
            {{ contact.heading }}
          </h2>

          <p class="text-sm sm:text-base lg:text-lg leading-relaxed text-silver">
            {{ contact.description }}
          </p>

          <!-- Email Direct Action & Copy Utility -->
          <div v-if="contact.email" class="border border-hairline bg-surface p-4 sm:p-5 font-mono text-xs space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase tracking-widest text-dim">// DIRECT INQUIRY</span>
              <span class="text-[10px] uppercase tracking-wider text-silver">PRIMARY CONTACT</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <a
                :href="`mailto:${contact.email}`"
                class="font-sans text-base sm:text-lg font-bold text-chalk hover:text-signal transition-colors break-all"
                :aria-label="`Send email to ${contact.email}`"
              >
                {{ contact.email }}
              </a>
              <button
                type="button"
                class="group inline-flex items-center justify-center gap-1.5 border border-hairline-strong bg-surface-elevated px-4 py-2 text-xs font-semibold uppercase tracking-wider text-chalk transition-all duration-200 hover:border-signal hover:bg-signal hover:text-white active:scale-95 shrink-0"
                :aria-label="isCopied ? 'Email address copied to clipboard' : 'Copy email address to clipboard'"
                @click="copyEmail"
              >
                <span v-if="!isCopied" class="inline-flex items-center gap-1">
                  <span>COPY</span>
                </span>
                <span v-else class="inline-flex items-center gap-1 text-signal group-hover:text-white">
                  <span>COPIED</span>
                  <span class="text-xs">✓</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Status Indicator Box -->
          <div class="border border-hairline bg-surface p-4 sm:p-5 font-mono text-xs">
            <div class="flex items-center gap-2.5">
              <span class="size-2 rounded-full bg-signal animate-pulse"></span>
              <span class="text-chalk font-semibold uppercase tracking-wider">Status Ketersediaan</span>
            </div>
            <p class="mt-2 text-silver">
              {{ contact.status }}
            </p>
          </div>
        </div>

        <!-- Right 6 Columns: Tabular Channel Directory -->
        <div class="space-y-4 lg:col-span-6 w-full min-w-0" data-reveal-item>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-dim">// KANAL KOMUNIKASI</p>

          <div class="divide-y divide-hairline border-y border-hairline font-mono">
            <a
              v-for="item in contact.items"
              :key="item.label"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open ${item.label} (${item.value}) in new tab`"
              class="group flex items-center justify-between p-4 sm:p-5 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-elevated gap-3"
            >
              <div class="space-y-1 min-w-0 flex-1">
                <span class="text-[10px] uppercase tracking-widest text-dim block">// {{ item.label }}</span>
                <p class="font-sans text-base sm:text-lg lg:text-xl font-bold text-chalk transition-colors duration-200 group-hover:text-signal break-all">
                  {{ item.value }}
                </p>
                <p v-if="item.desc" class="text-xs text-silver">
                  {{ item.desc }}
                </p>
              </div>

              <div class="flex size-8 sm:size-9 shrink-0 items-center justify-center border border-hairline bg-surface text-chalk transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                <span class="arrow-reveal text-sm">↗</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
