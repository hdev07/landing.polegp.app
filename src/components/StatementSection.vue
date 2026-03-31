<template>
  <section ref="sectionRef" class="relative py-32 lg:py-44 overflow-hidden">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <!-- Editorial text block — NOT centered, staggered alignment -->
      <div class="max-w-4xl">
        <p class="text-[clamp(1.5rem,4vw,3.2rem)] font-light leading-[1.3] tracking-tight">
          <span ref="l1" class="inline opacity-0 text-white/80">Cada fin de semana,</span>
          <span ref="l2" class="inline opacity-0 text-f1-red font-semibold"> 12 oportunidades</span>
          <span ref="l3" class="inline opacity-0 text-white/80"> de demostrar que sabes más que el resto.</span>
        </p>
      </div>

      <!-- Feature tags — scattered, not a grid -->
      <div ref="tagsRef" class="opacity-0 flex flex-wrap gap-3 mt-14 max-w-3xl">
        <span
          v-for="tag in tags" :key="tag"
          class="px-4 py-2 text-xs font-mono text-white/25 border border-white/[0.06] rounded-full hover:text-white/50 hover:border-white/10 transition-colors cursor-default"
        >{{ tag }}</span>
      </div>

      <!-- Single line statement -->
      <p ref="closerRef" class="opacity-0 mt-16 text-sm text-white/20 tracking-wide max-w-md">
        No es trivia. Es estrategia pura. Cada punto cuenta, cada carrera importa.
      </p>
    </div>

    <!-- Vertical accent line -->
    <div class="absolute top-16 left-6 lg:left-12 w-px h-20 bg-gradient-to-b from-f1-red/30 to-transparent" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement>()
const l1 = ref<HTMLElement>()
const l2 = ref<HTMLElement>()
const l3 = ref<HTMLElement>()
const tagsRef = ref<HTMLElement>()
const closerRef = ref<HTMLElement>()

const tags = [
  'Podio exacto', 'Pole position', 'Vuelta rápida', 'Safety car',
  'DNFs', 'Mayor remontada', 'Driver of the Day', 'Primer crash',
  'Head-to-head', 'Posición constructor', 'Sprint winner', 'Joker x2'
]

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' }
  })

  tl.to(l1.value, { opacity: 1, duration: 0.6 })
    .to(l2.value, { opacity: 1, duration: 0.5 }, '-=0.2')
    .to(l3.value, { opacity: 1, duration: 0.6 }, '-=0.2')
    .to(tagsRef.value, { opacity: 1, y: 0, duration: 0.7 }, '-=0.1')
    .to(closerRef.value, { opacity: 1, duration: 0.6 }, '-=0.3')

  gsap.set(tagsRef.value, { y: 15 })
})
</script>
