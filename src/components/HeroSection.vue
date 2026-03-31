<template>
  <!-- F1 Starting Lights Overlay -->
  <transition
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showLights"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-carbon"
    >
      <div class="flex gap-5 sm:gap-8">
        <div
          v-for="i in 5"
          :key="i"
          class="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-150"
          :class="
            litCount >= i
              ? 'bg-f1-red border-f1-red/60 shadow-[0_0_30px_rgba(225,6,0,0.7),0_0_60px_rgba(225,6,0,0.3)]'
              : 'bg-carbon-mid border-white/10'
          "
        />
      </div>
    </div>
  </transition>

  <section
    class="relative min-h-screen flex items-end pb-16 lg:pb-24 overflow-hidden"
  >
    <!-- Subtle ambient glow — off-center, not symmetrical -->
    <div
      class="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-f1-red/[0.04] rounded-full blur-[180px] pointer-events-none"
    />

    <!-- Content -->
    <div class="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-end">
        <!-- LEFT: Main text -->
        <div class="lg:col-span-7 pt-28 lg:pt-0">
          <h1
            ref="h1Ref"
            class="font-heading font-black leading-[0.82] tracking-tighter mb-10"
          >
            <span
              class="block text-[clamp(3rem,10vw,9rem)] text-white hero-line"
              >TÚ</span
            >
            <span
              class="block text-[clamp(3rem,10vw,9rem)] text-white/15 hero-line"
              >SABES</span
            >
            <span
              class="block text-[clamp(3rem,10vw,9rem)] text-white/15 hero-line"
              >QUIÉN</span
            >
            <span
              class="block text-[clamp(3rem,10vw,9rem)] text-f1-red hero-line"
              >GANA.</span
            >
          </h1>

          <p
            ref="subRef"
            class="opacity-0 text-base sm:text-lg text-white/35 max-w-md mb-10 leading-relaxed"
          >
            Predice cada carrera de F1. Compite contra miles de fans. Demuestra
            que lo sabes todo.
          </p>

          <div ref="ctaRef" class="opacity-0 flex items-center gap-6">
            <a
              href="#waitlist"
              class="btn-f1 bg-f1-red text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide red-glow inline-flex items-center gap-3"
            >
              Unirme a la Waitlist
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <span
              class="text-[11px] text-white/15 font-heading tracking-[0.3em] uppercase"
              >Gratis</span
            >
          </div>
        </div>

        <!-- RIGHT: Prediction Board mockup -->
        <div ref="boardRef" class="opacity-0 lg:col-span-5">
          <div
            class="bg-carbon-light/80 border border-white/[0.06] rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            <div
              class="bg-carbon-mid/80 px-5 py-3 border-b border-white/[0.04] flex items-center justify-between"
            >
              <span
                class="font-heading text-[10px] tracking-[0.2em] uppercase text-white/40"
                >Tus Predicciones</span
              >
              <span
                class="text-[10px] text-f1-red/70 font-heading tracking-wider"
                >GP AUSTRALIA</span
              >
            </div>
            <div class="divide-y divide-white/[0.03]">
              <div
                v-for="pred in predictions"
                :key="pred.type"
                class="flex items-center justify-between px-5 py-2.5"
              >
                <div class="flex items-center gap-3">
                  <span class="text-sm">{{ pred.icon }}</span>
                  <span class="text-white/25 text-xs">{{ pred.type }}</span>
                </div>
                <div class="flex items-center gap-2.5">
                  <span class="text-white/70 font-medium text-xs font-mono">{{
                    pred.pick
                  }}</span>
                  <span
                    class="text-[10px] w-4 text-center"
                    :class="pred.hit ? 'text-sector-green' : 'text-white/15'"
                    >{{ pred.hit ? "✓" : "✗" }}</span
                  >
                </div>
              </div>
            </div>
            <div
              class="bg-carbon-mid/40 px-5 py-3 border-t border-white/[0.04] flex items-center justify-between"
            >
              <span
                class="text-white/15 text-[10px] font-heading tracking-wider"
                >PUNTOS</span
              >
              <div class="flex items-center gap-2">
                <span
                  class="font-heading font-bold text-sm text-white tabular-nums"
                  >42</span
                >
                <span class="text-white/10 text-xs">/65</span>
                <span
                  class="text-[8px] bg-gold/10 text-gold/70 border border-gold/15 px-1.5 py-0.5 rounded font-heading tracking-wider"
                  >JOKER x2</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom line -->
    <div
      class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const showLights = ref(true);
const litCount = ref(0);

const badgeRef = ref<HTMLElement>();
const h1Ref = ref<HTMLElement>();
const subRef = ref<HTMLElement>();
const ctaRef = ref<HTMLElement>();
const boardRef = ref<HTMLElement>();

const predictions = [
  { icon: "🏆", type: "Ganador", pick: "VER", hit: true },
  { icon: "🥈", type: "Podio P2", pick: "NOR", hit: true },
  { icon: "🥉", type: "Podio P3", pick: "LEC", hit: false },
  { icon: "⚡", type: "Vuelta Rápida", pick: "NOR", hit: true },
  { icon: "🚩", type: "Safety Car", pick: "SÍ", hit: true },
  { icon: "💥", type: "Primer DNF", pick: "STR", hit: false },
  { icon: "🎯", type: "Pole Position", pick: "VER", hit: true },
  { icon: "⭐", type: "Driver of the Day", pick: "PIA", hit: true },
];

function runLightsSequence() {
  const interval = 420;
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      litCount.value = i;
    }, i * interval);
  }
  // All lights on for a beat, then blackout
  setTimeout(
    () => {
      litCount.value = 0;
      setTimeout(() => {
        showLights.value = false;
        revealContent();
      }, 350);
    },
    5 * interval + 600,
  );
}

function revealContent() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  const lines = h1Ref.value?.querySelectorAll(".hero-line");

  tl.to(badgeRef.value, { opacity: 1, duration: 0.5 });

  if (lines) {
    lines.forEach((line, i) => {
      tl.fromTo(
        line,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.6 },
        `-=0.35`,
      );
    });
  }

  tl.to(subRef.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
    .to(ctaRef.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
    .to(
      boardRef.value,
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    );
}

onMounted(() => {
  // Pre-position board for slide-in
  if (boardRef.value) gsap.set(boardRef.value, { x: 40 });
  if (subRef.value) gsap.set(subRef.value, { y: 20 });
  if (ctaRef.value) gsap.set(ctaRef.value, { y: 20 });

  runLightsSequence();
});
</script>
