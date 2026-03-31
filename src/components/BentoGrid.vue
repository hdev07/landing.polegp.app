<template>
  <section id="features" ref="sectionRef" class="relative py-24 lg:py-32 carbon-texture overflow-hidden">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <!-- Section label — left-aligned, minimal -->
      <div ref="labelRef" class="opacity-0 mb-12">
        <span class="font-heading text-[10px] tracking-[0.4em] uppercase text-white/20">Lo que incluye</span>
      </div>

      <!-- Bento Grid — intentionally asymmetric -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px] lg:auto-rows-[200px]">

        <!-- CELL 1: 12 Predictions — LARGE (2x2) -->
        <div
          ref="c1" class="opacity-0 col-span-2 row-span-2 group relative rounded-2xl overflow-hidden
          bg-gradient-to-br from-f1-red/[0.08] via-carbon-mid to-carbon-mid border border-white/[0.05]
          p-8 flex flex-col justify-between hover:border-f1-red/20 transition-colors duration-500"
        >
          <div>
            <span class="font-heading text-[10px] tracking-[0.2em] uppercase text-f1-red/60">Core</span>
            <h3 class="font-heading font-bold text-xl lg:text-2xl text-white mt-2 leading-tight">12 tipos de<br>predicción</h3>
          </div>
          <p class="text-white/25 text-sm leading-relaxed max-w-xs">
            Podio, pole, vuelta rápida, safety car, DNFs, remontada, driver of the day. Cada carrera, 12 formas de brillar.
          </p>
          <!-- Decorative: large faded number -->
          <span class="absolute -right-4 -bottom-6 font-heading font-black text-[12rem] text-white/[0.02] leading-none select-none pointer-events-none">12</span>
        </div>

        <!-- CELL 2: Joker — TALL (1x2) -->
        <div
          ref="c2" class="opacity-0 row-span-2 group relative rounded-2xl overflow-hidden
          bg-carbon-mid/60 border border-white/[0.05] p-6 flex flex-col justify-between
          hover:border-gold/20 transition-colors duration-500"
        >
          <div>
            <span class="text-3xl">🃏</span>
            <h3 class="font-heading font-bold text-base text-white mt-4">Sistema Joker</h3>
          </div>
          <p class="text-white/20 text-xs leading-relaxed">
            Una apuesta x2 por carrera. Elige piloto + evento. Si aciertas, doblas puntos. Estrategia pura.
          </p>
          <div class="mt-4 flex items-center gap-2">
            <span class="text-[9px] font-heading tracking-wider bg-gold/10 text-gold/60 border border-gold/15 px-2 py-1 rounded-full">x2 BONUS</span>
          </div>
        </div>

        <!-- CELL 3: Leaderboards — WIDE (1x1) -->
        <div
          ref="c3" class="opacity-0 group relative rounded-2xl overflow-hidden
          bg-carbon-mid/40 border border-white/[0.05] p-6 flex flex-col justify-between
          hover:border-white/10 transition-colors duration-500"
        >
          <span class="font-heading font-bold text-sm text-white">Rankings en vivo</span>
          <div class="flex items-end gap-1 mt-auto">
            <div class="w-4 bg-white/10 rounded-sm" style="height: 24px" />
            <div class="w-4 bg-white/15 rounded-sm" style="height: 36px" />
            <div class="w-4 bg-f1-red/30 rounded-sm" style="height: 52px" />
            <div class="w-4 bg-white/10 rounded-sm" style="height: 20px" />
            <div class="w-4 bg-white/[0.06] rounded-sm" style="height: 14px" />
          </div>
        </div>

        <!-- CELL 4: Groups — simple -->
        <div
          ref="c4" class="opacity-0 group relative rounded-2xl overflow-hidden
          bg-carbon-mid/40 border border-white/[0.05] p-6
          hover:border-white/10 transition-colors duration-500"
        >
          <span class="font-heading font-bold text-sm text-white">Grupos privados</span>
          <p class="text-white/15 text-xs mt-2 leading-relaxed">Crea ligas con amigos. Tu propio ranking.</p>
          <div class="mt-auto pt-4 flex -space-x-2">
            <div v-for="i in 4" :key="i" class="w-7 h-7 rounded-full border-2 border-carbon-mid bg-carbon-surface flex items-center justify-center">
              <span class="text-[10px] text-white/30">{{ ['H','M','J','L'][i-1] }}</span>
            </div>
            <div class="w-7 h-7 rounded-full border-2 border-carbon-mid bg-white/[0.04] flex items-center justify-center">
              <span class="text-[9px] text-white/20">+12</span>
            </div>
          </div>
        </div>

        <!-- CELL 5: Tournaments — WIDE (2x1) -->
        <div
          ref="c5" class="opacity-0 col-span-2 group relative rounded-2xl overflow-hidden
          bg-gradient-to-r from-carbon-mid/60 to-carbon-mid/30 border border-white/[0.05]
          p-6 flex items-center gap-6 hover:border-sector-purple/20 transition-colors duration-500"
        >
          <div class="shrink-0">
            <span class="text-3xl">🏅</span>
          </div>
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h3 class="font-heading font-bold text-sm text-white">Torneos con premios reales</h3>
              <span class="text-[8px] font-heading tracking-wider bg-sector-purple/10 text-sector-purple/60 border border-sector-purple/15 px-2 py-0.5 rounded-full">PREMIUM</span>
            </div>
            <p class="text-white/20 text-xs leading-relaxed">Entry fee → prize pool → los mejores ganan. Multi-carrera, eliminatorias, head-to-head.</p>
          </div>
        </div>

        <!-- CELL 6: Catch-up -->
        <div
          ref="c6" class="opacity-0 group relative rounded-2xl overflow-hidden
          bg-carbon-mid/40 border border-white/[0.05] p-6 flex flex-col justify-between
          hover:border-sector-green/20 transition-colors duration-500"
        >
          <span class="font-heading font-bold text-sm text-white">Catch-up</span>
          <p class="text-white/15 text-xs leading-relaxed">Multiplicadores que premian la remontada. Nadie queda fuera.</p>
          <span class="text-sector-green/50 text-xs font-heading mt-2">x1.5 → x2 → x3</span>
        </div>

        <!-- CELL 7: PWA -->
        <div
          ref="c7" class="opacity-0 group relative rounded-2xl overflow-hidden
          bg-carbon-mid/40 border border-white/[0.05] p-6 flex flex-col justify-between
          hover:border-speed-blue/20 transition-colors duration-500"
        >
          <span class="font-heading font-bold text-sm text-white">PWA</span>
          <p class="text-white/15 text-xs leading-relaxed">Instala desde el browser. Push notifications. Sin App Store.</p>
          <span class="text-speed-blue/40 text-xs font-heading mt-2">📱 Nativa</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const c1 = ref<HTMLElement>()
const c2 = ref<HTMLElement>()
const c3 = ref<HTMLElement>()
const c4 = ref<HTMLElement>()
const c5 = ref<HTMLElement>()
const c6 = ref<HTMLElement>()
const c7 = ref<HTMLElement>()

onMounted(() => {
  const cells = [c1, c2, c3, c4, c5, c6, c7]

  gsap.to(labelRef.value, {
    opacity: 1, duration: 0.5,
    scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' }
  })

  cells.forEach((cell, i) => {
    if (!cell.value) return
    gsap.set(cell.value, { y: 25 })
    gsap.to(cell.value, {
      opacity: 1, y: 0,
      duration: 0.6,
      delay: i * 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: cell.value, start: 'top 88%' }
    })
  })
})
</script>
